import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import logo from './images/logo.jpg';
import { FaMoon, FaSun, FaUser } from "react-icons/fa";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <nav className={`navbar navbar-expand-lg w-100 ${darkMode ? "navbar-dark bg-dark" : "bg-light"}`}>
      <div className="container-fluid px-3">
        
        {/* Logo & Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={() => setIsNavExpanded(false)}>
          <img src={logo} alt="Logo" className="navbar-logo me-2" />
          MediQ
        </Link>

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
              <Link className="nav-link" to="/link" onClick={() => setIsNavExpanded(false)}>Link</Link>
            </li>

            {/* Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Dropdown
              </button>
              <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                <li><Link className="dropdown-item" to="/action" onClick={() => setIsNavExpanded(false)}>Action</Link></li>
                <li><Link className="dropdown-item" to="/another-action" onClick={() => setIsNavExpanded(false)}>Another action</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/something-else" onClick={() => setIsNavExpanded(false)}>Something else here</Link></li>
              </ul>
            </li>
          </ul>

          {/* Right-side Buttons */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/signup" className="btn btn-outline-success" onClick={() => setIsNavExpanded(false)}>Sign Up</Link>
            <Link to="/login" className="btn btn-outline-info" onClick={() => setIsNavExpanded(false)}>Log In</Link>

            {/* Dark Mode Toggle */}
            <button className="btn btn-outline-dark" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* User Profile Icon */}
            <button className="btn btn-outline-primary">
              <FaUser />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
