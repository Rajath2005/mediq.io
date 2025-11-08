import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "./images/logo.jpg";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import UserProfileDropdown from "./UserProfileDropdown";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { neon } from "@neondatabase/serverless";

const sql = neon(
  "postgresql://emergency_owner:npg_VQbCf3imhr8a@ep-small-shape-a8g2w5tp-pooler.eastus2.azure.neon.tech/emergency?sslmode=require&channel_binding=require"
);

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, isAdmin, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    setIsMobileDropdownOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleServiceSelection = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsMobileMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleEmergency = async () => {
    setIsMobileMenuOpen(false);
    
    Swal.fire({
      title: "Loading Emergency Contacts...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const data = await sql`SELECT * FROM emergency_settings`;
      Swal.close();

      if (!data || data.length === 0) {
        Swal.fire({
          title: "No Emergency Contacts Found",
          text: "Please add emergency contacts in Emergency Settings.",
          icon: "info",
          confirmButtonText: "Add Contacts",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/emergency-settings");
          }
        });
        return;
      }

      let tableHtml = `
        <div style="max-height: 400px; overflow-y: auto;">
          <table style="width:100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #dc3545; color: white;">
                <th style="padding: 10px;">🏥 Hospital</th>
                <th style="padding: 10px;">🚑 Ambulance</th>
                <th style="padding: 10px;">📱 SMS</th>
              </tr>
            </thead>
            <tbody>
      `;

      data.forEach((item) => {
        tableHtml += `
          <tr>
            <td style="padding: 10px; border: 1px solid #ccc;">${item.hospital_name || 'N/A'}</td>
            <td style="padding: 10px; border: 1px solid #ccc;">
              <a href="tel:${item.ambulance_number}" style="color:red; font-weight:bold;">📞 ${item.ambulance_number}</a>
            </td>
            <td style="padding: 10px; border: 1px solid #ccc;">
              <a href="sms:${item.sms_number}" style="color:green; font-weight:bold;">💬 ${item.sms_number}</a>
            </td>
          </tr>
        `;
      });

      tableHtml += `</tbody></table></div>`;

      Swal.fire({
        title: "🚨 Emergency Contacts",
        html: tableHtml,
        icon: "info",
        width: "700px",
        showCancelButton: true,
        confirmButtonText: "Close",
        cancelButtonText: "➕ Add Contact",
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          navigate("/emergency-settings");
        }
      });
    } catch (error) {
      Swal.close();
      console.error("Emergency Fetch Error:", error);
      Swal.fire({
        title: "Error Fetching Emergency Contacts",
        text: "Check your internet or database connection.",
        icon: "error",
        confirmButtonText: "Retry",
      }).then((result) => {
        if (result.isConfirmed) handleEmergency();
      });
    }
  };

  const toggleDesktopDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  return (
    <>
      <nav className={`custom-navbar ${darkMode ? "dark" : "light"}`}>
        <div className="navbar-container">
          {/* Logo and Brand */}
          <Link className="navbar-brand" to="/" onClick={handleServiceSelection}>
            <img src={logo} alt="MediQ Logo" className="navbar-logo" />
            <span className="brand-text">MediQ</span>
            {isAdmin && <span className="admin-badge">Admin</span>}
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <ul className="nav-links">
              <li>
                <Link to="/" onClick={handleServiceSelection}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search-medicines" onClick={handleServiceSelection}>
                  Ayurvedic Medicines
                </Link>
              </li>
              <li>
                <Link to="/home-remedies" onClick={handleServiceSelection}>
                  Home Remedies
                </Link>
              </li>
              <li className="dropdown" ref={dropdownRef}>
                <button 
                  className="dropdown-toggle"
                  onClick={toggleDesktopDropdown}
                  type="button"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  More
                </button>
                <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                  <li>
                    <Link to="/about" onClick={handleServiceSelection}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={handleServiceSelection}>
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/hospitals" onClick={handleServiceSelection}>
                      Book Appointment
                    </Link>
                  </li>
                  <li>
                    <Link to="/ayurvedic-shops" onClick={handleServiceSelection}>
                      Ayurvedic Medical Shops
                    </Link>
                  </li>
                  <li>
                    <Link to="/nearby-hospitals" onClick={handleServiceSelection}>
                      Nearby Hospitals
                    </Link>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <Link to="/emergency-settings" onClick={handleServiceSelection}>
                      🚨 Emergency Settings
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            <div className="nav-actions">
              <button className="btn btn-danger emergency-btn" onClick={handleEmergency}>
                🚨 Emergency Call
              </button>

              {!isAuthenticated ? (
                <>
                  <Link to="/signup" className="btn btn-success" onClick={handleServiceSelection}>
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn btn-info" onClick={handleServiceSelection}>
                    Log In
                  </Link>
                </>
              ) : (
                <UserProfileDropdown
                  isAuthenticated={isAuthenticated}
                  isAdmin={isAdmin}
                  onLogout={handleLogout}
                />
              )}

              <button 
                className="btn btn-icon theme-toggle" 
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="mobile-controls">
            <button className="btn btn-danger btn-sm" onClick={handleEmergency}>
              🚨 Emergency
            </button>
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="brand-text">MediQ Menu</span>
              <button 
                className="close-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            <ul className="mobile-nav-links">
              <li>
                <Link to="/" onClick={handleServiceSelection}>
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link to="/search-medicines" onClick={handleServiceSelection}>
                  🌿 Ayurvedic Medicines
                </Link>
              </li>
              <li>
                <Link to="/home-remedies" onClick={handleServiceSelection}>
                  💊 Home Remedies
                </Link>
              </li>
              
              <li className="mobile-dropdown">
                <button 
                  className="dropdown-toggle"
                  onClick={toggleMobileDropdown}
                  type="button"
                >
                  📋 More {isMobileDropdownOpen ? '▲' : '▼'}
                </button>
                {isMobileDropdownOpen && (
                  <ul className="mobile-dropdown-menu">
                    <li>
                      <Link to="/about" onClick={handleServiceSelection}>
                        ℹ️ About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" onClick={handleServiceSelection}>
                        📞 Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/hospitals" onClick={handleServiceSelection}>
                        🏥 Book Appointment
                      </Link>
                    </li>
                    <li>
                      <Link to="/ayurvedic-shops" onClick={handleServiceSelection}>
                        🏪 Ayurvedic Shops
                      </Link>
                    </li>
                    <li>
                      <Link to="/nearby-hospitals" onClick={handleServiceSelection}>
                        📍 Nearby Hospitals
                      </Link>
                    </li>
                    <li>
                      <Link to="/emergency-settings" onClick={handleServiceSelection}>
                        🚨 Emergency Settings
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>

            <div className="mobile-actions">
              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/signup" 
                    className="btn btn-success btn-block" 
                    onClick={handleServiceSelection}
                  >
                    Sign Up
                  </Link>
                  <Link 
                    to="/login" 
                    className="btn btn-info btn-block" 
                    onClick={handleServiceSelection}
                  >
                    Log In
                  </Link>
                </>
              ) : (
                <div className="mobile-user-section">
                  <UserProfileDropdown
                    isAuthenticated={isAuthenticated}
                    isAdmin={isAdmin}
                    onLogout={handleLogout}
                  />
                </div>
              )}

              <button 
                className="btn btn-block btn-secondary theme-toggle" 
                onClick={toggleDarkMode}
              >
                {darkMode ? (
                  <>
                    <FaSun /> Switch to Light Mode
                  </>
                ) : (
                  <>
                    <FaMoon /> Switch to Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;