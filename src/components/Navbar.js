import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import logo from './images/logo.jpg';
import { FaMoon, FaSun } from "react-icons/fa";
import UserProfileDropdown from './UserProfileDropdown';
import 'animate.css';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from "../supabaseClient";
import Swal from 'sweetalert2';
import { supabase2 } from '../supabaseClient2';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const metadata = session.user.user_metadata || {};
        const displayName = metadata.full_name || 
          `${metadata.first_name || ''} ${metadata.last_name || ''}`.trim() ||
          session.user.email.split('@')[0];
        
        setIsAuthenticated(true);
        setUserDetails({
          name: displayName,
          email: session.user.email,
          profileImage: metadata.avatar_url
        });
      }
    };
    
    checkAuth();

    // Subscribe to auth changes
    const { subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        const metadata = session.user.user_metadata || {};
        const displayName = metadata.full_name || 
          `${metadata.first_name || ''} ${metadata.last_name || ''}`.trim() ||
          session.user.email.split('@')[0];

        setUserDetails({
          name: displayName,
          email: session.user.email,
          profileImage: metadata.avatar_url
        });
      } else {
        setUserDetails(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUserDetails(null);
  };

  const handleServiceSelection = () => {
    setIsDropdownOpen(false);
    setIsNavExpanded(false);
  };

  const handleEmergency = async () => {
    try {
      // First, let's get the actual column names from your database
      const { data: tableInfo, error: tableError } = await supabase2
        .from('emergency_settings')
        .select('*')
        .limit(1);
      
      if (tableError) {
        console.error('Failed to fetch table structure:', tableError);
        Swal.fire('Database Error', `Failed to retrieve emergency settings: ${tableError.message}`, 'error');
        return;
      }
      
      // Log the first row to see actual column names
      console.log('Sample row with column names:', tableInfo[0]);
      
      // Now fetch all rows with the correct column names
      // Let's assume the correct columns might be 'hospital_name', 'phone_number', and 'sms_contact'
      // or whatever the actual column names are in your database
      const { data, error } = await supabase2
        .from('emergency_settings')
        .select('*'); // Selecting all columns to ensure we get everything
      
      if (error) {
        console.error('Failed to fetch emergency settings:', error);
        Swal.fire('Database Error', `Failed to retrieve emergency settings: ${error.message}`, 'error');
        return;
      }
      
      if (!data || data.length === 0) {
        Swal.fire('No Data', 'No emergency settings found in the database.', 'warning');
        return;
      }
      
      // Extract the first row to determine column names
      const firstRow = data[0];
      
      // Determine which columns to use based on what's available
      // These are common alternatives for the column names
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
        phoneNumberColumn; // Default to the same as phone if no specific SMS column
      
      if (!hospitalNameColumn || !phoneNumberColumn) {
        console.error('Could not determine required column names', firstRow);
        Swal.fire('Configuration Error', 'Could not determine the correct column names in the database.', 'error');
        return;
      }
      
      console.log('Using columns:', { hospitalNameColumn, phoneNumberColumn, smsNumberColumn });
      
      // Create options for the dropdown with index as key to ensure uniqueness
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
  
        // Initiate the call
        window.location.href = `tel:${phoneNumber}`;
  
        // Send SMS with location link
        const locationLink = `https://maps.google.com?q=${encodeURIComponent(window.location.href)}`;
        const message = `Emergency! Please help. My location is: ${locationLink}`;
        window.open(`sms:${smsNumber}?body=${encodeURIComponent(message)}`);
  
        // Display confirmation with hospital name and number
        Swal.fire('Calling...', `You are calling ${hospitalName} - ${phoneNumber}`, 'info');
      }
    } catch (error) {
      console.error('Unexpected error in handleEmergency:', error);
      Swal.fire('Error', `An unexpected error occurred: ${error.message}`, 'error');
    }
  };
  

  return (
    <nav className={`navbar navbar-expand-lg w-100 ${darkMode ? "navbar-dark bg-dark" : "bg-light"}`}>
      <div className="container-fluid px-3">
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={() => setIsNavExpanded(false)}>
          <img src={logo} alt="Logo" className="navbar-logo me-2 animate__animated animate__pulse" />
          MediQ
        </Link>

        {/* Mobile Emergency Button */}
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

        <div className={`collapse navbar-collapse ${isNavExpanded ? 'show animate__animated animate__fadeIn' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/" onClick={handleServiceSelection}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={handleServiceSelection}>About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={handleServiceSelection}>Contact Us</Link>
            </li>

            {/* Services Dropdown */}
            <li className="nav-item dropdown" ref={dropdownRef}>
              <button
                className="nav-link dropdown-toggle"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Services
              </button>
              <ul className={`dropdown-menu ${isDropdownOpen ? "show animate__animated animate__fadeIn" : ""}`}>
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
            {/* Desktop Emergency Call Button */}
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
                userDetails={userDetails}
                onLogout={handleLogout}
              />
            )}

            {/* Dark Mode Toggle */}
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
