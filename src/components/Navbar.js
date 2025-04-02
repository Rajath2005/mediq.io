import React, { useState, useEffect } from "react";
import './Navbar.css';
import logo from './images/logo.jpg';
import { FaMoon, FaSun, FaUser } from "react-icons/fa"; // Import icons
import { Link } from "react-router-dom";
const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <nav className={`navbar navbar-expand-lg w-100 ${darkMode ? "navbar-dark bg-dark" : "bg-light"}`}>
      <div className="container-fluid px-3">
        
        {/* Logo & Brand */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={logo} alt="Logo" className="navbar-logo me-2" />
          MediQ
        </a>

        {/* Navbar Toggler Button */}
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
              <a className="nav-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/link">Link</a>
            </li>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/action">Action</a></li>
                <li><a className="dropdown-item" href="/another-action">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/something-else">Something else here</a></li>
              </ul>
            </li>
          </ul>

          {/* Right-side Buttons */}
          <div className="d-flex align-items-center gap-3">
            {/* Sign In Button */}
            <Link to="/signup" className="btn btn-outline-success">Sign Up</Link>
            <Link to="/login" className="btn btn-outline-info">Log In</Link>

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
