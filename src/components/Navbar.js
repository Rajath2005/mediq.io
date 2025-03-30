import React, { useState, useEffect } from "react";
import './Navbar.css';
import logo from './images/logo.jpg';
import { FaMoon, FaSun, FaUser } from "react-icons/fa"; // Import icons

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "bg-light"}`}>
      <div className="container-fluid">
        
        {/* Logo & Brand */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} alt="Logo" className="navbar-logo me-2" />
          Navbar
        </a>

        {/* Navbar Toggler Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>

          {/* Right-side Buttons */}
          <div className="d-flex align-items-center gap-3">
            {/* Sign In Button */}
            <button className="btn btn-outline-success">Sign In</button>

            {/* Log In Button */}
            <button className="btn btn-outline-info">Log In</button>

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
