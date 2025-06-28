import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import logo from './images/logo.jpg';
import { FaMoon, FaSun, FaUserShield } from "react-icons/fa";
import UserProfileDropdown from './UserProfileDropdown';
import 'animate.css';
import { useTheme } from '../contexts/ThemeContext';
import Swal from 'sweetalert2';
import { supabase2 } from '../supabaseClient2';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, signOut } = useAuth();
  
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
  }, []); 

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
    try {
      const { data: tableInfo, error: tableError } = await supabase2
        .from('emergency_settings')
        .select('*')
        .limit(1);
      
      if (tableError) {
        console.error('Failed to fetch table structure:', tableError);
        Swal.fire('Database Error', `Failed to retrieve emergency settings: ${tableError.message}`, 'error');
        return;
      }
      
      console.log('Sample row with column names:', tableInfo[0]);
      
      const { data, error } = await supabase2
        .from('emergency_settings')
        .select('*');
      
      if (error) {
        console.error('Failed to fetch emergency settings:', error);
        Swal.fire('Database Error', `Failed to retrieve emergency settings: ${error.message}`, 'error');
        return;
      }
      
      if (!data || data.length === 0) {
        Swal.fire('No Data', 'No emergency settings found in the database.', 'warning');
        return;
      }
      
      const firstRow = data[0];
      
      const hospitalNameColumn = 
        'hospital_name' in firstRow ? 'hospital_name' : 
        'name' in firstRow ? 'name' : 
        'hospital' in firstRow ? 'hospital' : 
        Object.keys(firstRow).find(key => key.includes('hospital') || key.includes('name'));
        
      const phoneNumberColumn = 
        'ambulance_number' in firstRow ? 'ambulance_number' : 
        'phone_number' in firstRow ? 'phone_number' : 
        'contact' in firstRow ? 'contact' : 
        'number' in firstRow ? 'number' : 
        Object.keys(firstRow).find(key => key.includes('phone') || key.includes('number') || key.includes('contact'));
        
      const smsNumberColumn = 
        'sms_number' in firstRow ? 'sms_number' : 
        'sms_contact' in firstRow ? 'sms_contact' : 
        'sms' in firstRow ? 'sms' : 
        phoneNumberColumn;
      
      if (!hospitalNameColumn || !phoneNumberColumn) {
        console.error('Could not determine required column names', firstRow);
        Swal.fire('Configuration Error', 'Could not determine the correct column names in the database.', 'error');
        return;
      }
      
      console.log('Using columns:', { hospitalNameColumn, phoneNumberColumn, smsNumberColumn });
      
      const options = {};
      const mappedData = data.map((item, index) => ({
        ...item,
        id: index.toString(),
        hospitalName: item[hospitalNameColumn],
        phoneNumber: item[phoneNumberColumn],
        smsNumber: item[smsNumberColumn] || item[phoneNumberColumn]
      }));
      
      mappedData.forEach((item) => {
        options[item.id] = `${item.hospitalName} - ${item.phoneNumber}`;
      });
  
      const { value: selectedId } = await Swal.fire({
        title: 'Choose Hospital and Ambulance Number',
        input: 'select',
        inputOptions: options,
        inputPlaceholder: 'Select a hospital',
        showCancelButton: true,
      });
  
      if (selectedId) {
        const selectedEntry = mappedData.find(entry => entry.id === selectedId);
  
        if (!selectedEntry) {
          Swal.fire('Error', 'Selected hospital not found.', 'error');
          return;
        }
  
        const { hospitalName, phoneNumber, smsNumber } = selectedEntry;
  
        window.location.href = `tel:${phoneNumber}`;
  
        const locationLink = `https://maps.google.com?q=${encodeURIComponent(window.location.href)}`;
        const message = `Emergency! Please help. My location is: ${locationLink}`;
        window.open(`sms:${smsNumber}?body=${encodeURIComponent(message)}`);
  
        Swal.fire('Calling...', `You are calling ${hospitalName} - ${phoneNumber}`, 'info');
      }
    } catch (error) {
      console.error('Unexpected error in handleEmergency:', error);
      Swal.fire('Error', `An unexpected error occurred: ${error.message}`, 'error');
    }
  };

  // Custom navigation based on user role
  const getDashboardLink = () => {
    if (isAdmin) {
      return "/admin-dashboard";
    }
    return "/dashboard";
  };

  // Determine login buttons based on authentication state
  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <UserProfileDropdown
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          onLogout={handleLogout}
          dashboardLink={getDashboardLink()}
        />
      );
    } else {
      return (
        <>
          <Link to="/signup" className="btn btn-outline-success mobile-full-width me-2" onClick={() => setIsNavExpanded(false)}>
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-outline-info mobile-full-width me-2" onClick={() => setIsNavExpanded(false)}>
            User Login
          </Link>
          <Link to="/admin-login" className="btn btn-outline-danger mobile-full-width" onClick={() => setIsNavExpanded(false)}>
            <FaUserShield className="me-1" />
            Admin
          </Link>
        </>
      );
    }
  };

  // Determine what services menu items to show based on user role
  const renderServicesMenu = () => {
    const commonItems = (
      <>
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
      </>
    );

    // Only show emergency settings to admins
    if (isAdmin) {
      return (
        <>
          {commonItems}
          <li><hr className="dropdown-divider" /></li>
          <li>
            <Link className="dropdown-item admin-menu-item" to="/emergency-settings" onClick={handleServiceSelection}>
              <FaUserShield className="me-1" /> Emergency Settings
            </Link>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <Link className="dropdown-item admin-menu-item" to="/manage-appointments" onClick={handleServiceSelection}>
              <FaUserShield className="me-1" /> Manage Appointments
            </Link>
          </li>
        </>
      );
    }

    return commonItems;
  };

  return (
    <nav className={`navbar navbar-expand-lg w-100 ${darkMode ? "navbar-dark bg-dark" : "bg-light"}`} style={{ zIndex: 1060 }}>
      <div className="container-fluid px-3">
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={() => setIsNavExpanded(false)}>
          <img src={logo} alt="Logo" className="navbar-logo me-2 animate__animated animate__pulse" style={{ width: '40px', height: '40px' }} />
          <span className="brand-text">MediQ</span>
          {isAdmin && <span className="admin-badge ms-2">Admin</span>}
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
                {renderServicesMenu()}
              </ul>
            </li>
            
            {/* Admin-only navigation items */}
            {isAdmin && (
              <li className="nav-item">
                <Link 
                  className="nav-link admin-nav-link" 
                  to="/admin-dashboard" 
                  onClick={handleServiceSelection}
                >
                  <FaUserShield className="me-1" /> Admin Panel
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <button onClick={handleEmergency} className="btn btn-danger d-none d-lg-block animate__animated animate__pulse animate__infinite animate__slow">
              Emergency Call
            </button>

            {renderAuthButtons()}

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
