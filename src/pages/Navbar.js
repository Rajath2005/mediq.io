import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import logo from './images/logo.jpg';
import { FaMoon, FaSun } from "react-icons/fa";
import UserProfileDropdown from './UserProfileDropdown';
import 'animate.css';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();
  
  // Close dropdown and nav menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (!event.target.closest('.navbar')) {
        setIsNavExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  useEffect(() => {
    setIsNavExpanded(false);
    setIsDropdownOpen(false);
  }, [window.location.pathname]);

  const handleServiceSelection = () => {
    setIsDropdownOpen(false);
    setIsNavExpanded(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEmergency = async () => {
    console.log('Emergency button clicked');
    
    try {
      // First, check if user is authenticated
      const currentUser = auth.currentUser;
      console.log('Current user:', currentUser);
      
      if (!currentUser) {
        await Swal.fire({
          title: 'Authentication Required',
          text: 'Please log in to access emergency contacts.',
          icon: 'warning',
          confirmButtonText: 'Go to Login',
          showCancelButton: true,
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login');
          }
        });
        return;
      }

      // Shows loading state
      Swal.fire({
        title: 'Loading Emergency Contacts...',
        text: 'Please wait while we fetch your emergency contacts.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      console.log('Attempting to fetch from Firebase...');
      console.log('Database instance:', db);
      
      // Test basic Firebase connection first..
      try {
        const testRef = collection(db, 'emergency_settings');
        console.log('Collection reference created:', testRef);
        
        const snapshot = await getDocs(testRef);
        console.log('Firebase query successful');
        console.log('Snapshot:', snapshot);
        console.log('Snapshot size:', snapshot.size);
        console.log('Snapshot empty:', snapshot.empty);
        
        Swal.close();

        if (snapshot.empty) {
          console.log('No documents found in emergency_settings collection');
          await Swal.fire({
            title: 'No Emergency Contacts',
            text: 'No emergency contacts have been configured yet. Would you like to add some?',
            icon: 'info',
            confirmButtonText: 'Add Contacts',
            showCancelButton: true,
            cancelButtonText: 'Cancel'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/emergency-settings');
            }
          });
          return;
        }

        // Process the documents
        const emergencyContacts = [];
        let hasValidContacts = false;

        snapshot.forEach((doc) => {
          console.log('Document ID:', doc.id);
          console.log('Document data:', doc.data());
          
          const data = doc.data();
          const entries = data.entries || [];
          const smsNumber = data.sms_number || '';

          entries.forEach((entry) => {
            if (entry.hospitalName && entry.ambulanceNumber) {
              hasValidContacts = true;
              emergencyContacts.push({
                hospitalName: entry.hospitalName,
                ambulanceNumber: entry.ambulanceNumber,
                smsNumber: smsNumber
              });
            }
          });
        });

        console.log('Emergency contacts found:', emergencyContacts);
        console.log('Has valid contacts:', hasValidContacts);

        if (hasValidContacts) {
          // Build HTML for displaying contacts
          let contactsHtml = '';
          const uniqueContacts = new Set();

          emergencyContacts.forEach((contact) => {
            const contactKey = `${contact.hospitalName}-${contact.ambulanceNumber}`;
            if (!uniqueContacts.has(contactKey)) {
              uniqueContacts.add(contactKey);
              contactsHtml += `
                <div style="text-align: left; margin-bottom: 15px; padding: 12px; border-left: 4px solid #dc3545; background-color: #f8f9fa; border-radius: 4px;">
                  <div style="font-weight: bold; color: #dc3545; margin-bottom: 5px;">
                    🏥 ${contact.hospitalName}
                  </div>
                  <div style="color: #333; font-size: 14px;">
                    📞 <strong>Ambulance:</strong> <a href="tel:${contact.ambulanceNumber}" style="color: #dc3545; text-decoration: none;">${contact.ambulanceNumber}</a>
                  </div>
                </div>
              `;
            }
          });

          // Add SMS numbers if available
          const smsNumbers = [...new Set(emergencyContacts.map(c => c.smsNumber).filter(n => n))];
          if (smsNumbers.length > 0) {
            contactsHtml += `
              <div style="margin-top: 20px; padding: 12px; border-left: 4px solid #007bff; background-color: #e7f3ff; border-radius: 4px;">
                <div style="font-weight: bold; color: #007bff; margin-bottom: 5px;">
                  📱 SMS Alert Numbers
                </div>
                ${smsNumbers.map(num => `
                  <div style="color: #333; font-size: 14px; margin-bottom: 3px;">
                    <a href="sms:${num}" style="color: #007bff; text-decoration: none;">${num}</a>
                  </div>
                `).join('')}
              </div>
            `;
          }

          await Swal.fire({
            title: '🚨 Emergency Contacts',
            html: `
              <div style="text-align: center; margin-bottom: 20px;">
                <p style="color: #dc3545; font-weight: bold; margin-bottom: 10px;">
                  Call immediately in case of emergency!
                </p>
                <p style="color: #666; font-size: 12px;">
                  Tap phone numbers to call directly
                </p>
              </div>
              <div style="max-height: 400px; overflow-y: auto;">
                ${contactsHtml}
              </div>
            `,
            icon: 'info',
            confirmButtonText: 'Got it!',
            confirmButtonColor: '#dc3545',
            width: '500px'
          });

        } else {
          await Swal.fire({
            title: 'No Valid Contacts',
            text: 'Emergency settings exist but no valid contacts were found. Please update your emergency settings.',
            icon: 'warning',
            confirmButtonText: 'Update Settings',
            showCancelButton: true,
            cancelButtonText: 'Cancel'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/emergency-settings');
            }
          });
        }

      } catch (firestoreError) {
        console.error('Firestore operation failed:', firestoreError);
        console.error('Error code:', firestoreError.code);
        console.error('Error message:', firestoreError.message);
        
        Swal.close();
        
        let errorMessage = 'Unable to access emergency contacts. ';
        
        if (firestoreError.code === 'permission-denied') {
          errorMessage += 'Access denied. Please check your permissions or contact support.';
        } else if (firestoreError.code === 'unavailable') {
          errorMessage += 'Database service is temporarily unavailable.';
        } else if (firestoreError.message.includes('CORS')) {
          errorMessage += 'Connection blocked by browser security. Please check your Firebase configuration.';
        } else {
          errorMessage += `Error: ${firestoreError.message}`;
        }

        await Swal.fire({
          title: 'Database Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Retry',
          showCancelButton: true,
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            handleEmergency();
          }
        });
      }

    } catch (generalError) {
      console.error('General error in handleEmergency:', generalError);
      Swal.close();
      
      await Swal.fire({
        title: 'Unexpected Error',
        text: `Something went wrong: ${generalError.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg w-100 ${darkMode ? "navbar-dark bg-dark" : "bg-light"}`} style={{ zIndex: 1060 }}>
      <div className="container-fluid px-3">
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={() => setIsNavExpanded(false)}>
          <img src={logo} alt="Logo" className="navbar-logo me-2 animate__animated animate__pulse" style={{ width: '40px', height: '40px' }} />
          <span className="brand-text">MediQ</span>
        </Link>

        <button className="btn btn-danger d-lg-none me-2" onClick={handleEmergency}>
          Emergency
        </button>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsNavExpanded(!isNavExpanded)}
          aria-controls="navbarSupportedContent"
          aria-expanded={isNavExpanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavExpanded ? 'show animate__animated animate__fadeIn' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleServiceSelection}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={handleServiceSelection}>About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={handleServiceSelection}>Contact Us</Link>
            </li>

            <li className="nav-item dropdown" ref={dropdownRef}>
              <button
                className="nav-link dropdown-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                type="button"
                aria-expanded={isDropdownOpen}
              >
                Services
              </button>
              <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                <li>
                  <Link className="dropdown-item" to="/search-medicines" onClick={handleServiceSelection}>
                    Search Ayurvedic Medicines
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/home-remedies" onClick={handleServiceSelection}>
                    Search Home Remedies
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/hospitals" onClick={handleServiceSelection}>
                    Book Appointment
                    </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/ayurvedic-shops" onClick={handleServiceSelection}>
                    Ayurvedic Medical Shops
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/nearby-hospitals" onClick={handleServiceSelection}>
                    Nearby Hospitals
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/emergency-settings" onClick={handleServiceSelection}>
                    Emergency Settings
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <button onClick={handleEmergency} className="btn btn-danger d-none d-lg-block animate__animated animate__pulse animate__infinite animate__slow">
              Emergency Call
            </button>

            {!isAuthenticated ? (
              <>
                <Link to="/signup" className="btn btn-outline-success mobile-full-width" onClick={() => setIsNavExpanded(false)}>Sign Up</Link>
                <Link to="/login" className="btn btn-outline-info mobile-full-width" onClick={() => setIsNavExpanded(false)}>Log In</Link>
              </>
            ) : (
              <UserProfileDropdown
                isAuthenticated={isAuthenticated}
              />
            )}

            <button className="btn btn-outline-dark mobile-icon-btn" onClick={toggleDarkMode}>
              {darkMode ? <FaSun className="animate__animated animate__rotateIn" /> : <FaMoon className="animate__animated animate__rotateIn" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;