import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import logo from './images/logo.jpg';
import { FaMoon, FaSun, FaUserShield } from "react-icons/fa";
import UserProfileDropdown from './UserProfileDropdown';
import 'animate.css';
import { useTheme } from '../contexts/ThemeContext';
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

  const handleEmergency = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/emergency-settings');
    }
  };

  const getDashboardLink = () => {
    if (isAdmin) {
      return "/admin-dashboard";
    }
    return "/dashboard";
  };

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
