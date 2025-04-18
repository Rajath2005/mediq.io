import React, { useState, useEffect, useRef } from "react"; // Add useRef import
import { Link } from "react-router-dom";
import './Navbar.css';
import logo from './images/logo.jpg';
import { FaMoon, FaSun } from "react-icons/fa";
import UserProfileDropdown from './UserProfileDropdown';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Simulate login for testing
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    profileImage: null,
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Add click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserDetails(null);
  };

  // Add handler to close dropdown
  const handleDropdownItemClick = () => {
    setIsDropdownOpen(false);
    setIsNavExpanded(false);
  };

  return (
    <nav className={`navbar navbar-expand-lg w-100 ${darkMode ? "navbar-dark bg-dark" : "bg-light"}`}>
      <div className="container-fluid px-3">

        {/* Logo & Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={() => setIsNavExpanded(false)}>
          <img src={logo} alt="Logo" className="navbar-logo me-2" />
          MediQ
        </Link>

        {/* Mobile Emergency Button */}
        <a
          href="tel:+911234567890"
          className="btn btn-danger d-lg-none me-2"
        >
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
        <div className={`collapse navbar-collapse ${isNavExpanded ? 'show' : ''}`} id="navbarSupportedContent">
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
                aria-expanded={isDropdownOpen}
              >
                Services
              </button>
              <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                <li>
                  <Link 
                    className="dropdown-item" 
                    to="/search-medicines" 
                    onClick={handleDropdownItemClick}
                  >
                    Search Ayurvedic Medicines
                  </Link>
                </li>
                <li>
                  <Link 
                    className="dropdown-item" 
                    to="/hospitals" 
                    onClick={handleDropdownItemClick}
                  >
                    Book Appointment
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link 
                    className="dropdown-item" 
                    to="/something-else" 
                    onClick={handleDropdownItemClick}
                  >
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {/* Right-side Buttons */}
          <div className="d-flex align-items-center gap-3">
            {/* Desktop Emergency Call Button */}
            <a
              href="tel:+911234567890"
              className="btn btn-danger d-none d-lg-block"
            >
              Emergency Call
            </a>

            {!isAuthenticated ? (
              <>
                <Link to="/signup" className="btn btn-outline-success" onClick={() => setIsNavExpanded(false)}>Sign Up</Link>
                <Link to="/login" className="btn btn-outline-info" onClick={() => setIsNavExpanded(false)}>Log In</Link>
              </>
            ) : (
              <UserProfileDropdown
                isAuthenticated={isAuthenticated}
                userDetails={userDetails}
                onLogout={handleLogout}
              />
            )}

            {/* Dark Mode Toggle */}
            <button className="btn btn-outline-dark" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
