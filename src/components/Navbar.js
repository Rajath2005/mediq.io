import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import logo from './images/logo.jpg';
import { FaMoon, FaSun } from "react-icons/fa";
import UserProfileDropdown from './UserProfileDropdown';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from "../supabaseClient";
import 'animate.css';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Real authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  // Check auth status on mount
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

  // Close dropdown when clicking outside
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

  return (
    <nav className={`navbar navbar-expand-lg w-100 ${darkMode ? "navbar-dark bg-dark" : "bg-light"}`}>
      <div className="container-fluid px-3">

        {/* Logo & Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={() => setIsNavExpanded(false)}>
          <img src={logo} alt="Logo" className="navbar-logo me-2 animate__animated animate__pulse" />
          MediQ
        </Link>

        {/* Mobile Emergency Button */}
        <a href="tel:+911234567890" className="btn btn-danger d-lg-none me-2 ">
          Emergency
        </a>

        {/* Navbar Toggler */}
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

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isNavExpanded ? 'show animate__animated animate__fadeIn' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/" onClick={() => setIsNavExpanded(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={() => setIsNavExpanded(false)}>About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={() => setIsNavExpanded(false)}>Contact Us</Link>
            </li>

            {/* Dropdown */}
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
              </ul>
            </li>
          </ul>

          {/* Right-side Buttons */}
          <div className="d-flex align-items-center gap-3">
            {/* Desktop Emergency Call Button */}
            <a href="tel:+911234567890" className="btn btn-danger d-none d-lg-block animate__animated animate__pulse animate__infinite animate__slow">
              Emergency Call
            </a>

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
            <button 
              className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'} mobile-icon-btn`} 
              onClick={toggleDarkMode}
            >
              {darkMode ? <FaSun className="animate__animated animate__rotateIn" /> : <FaMoon className="animate__animated animate__rotateIn" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;