import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "./images/logo.jpg";
import { FaMoon, FaSun } from "react-icons/fa";
import UserProfileDropdown from "./UserProfileDropdown";
import "animate.css";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { neon } from "@neondatabase/serverless";

// ✅ Neon DB connection
const sql = neon(
  "postgresql://emergency_owner:npg_VQbCf3imhr8a@ep-small-shape-a8g2w5tp-pooler.eastus2.azure.neon.tech/emergency?sslmode=require&channel_binding=require"
);

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, isAdmin, signOut } = useAuth();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (!event.target.closest(".navbar")) {
        setIsNavExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleServiceSelection = () => {
    setIsDropdownOpen(false);
    setIsNavExpanded(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleEmergency = async () => {
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

      tableHtml += `
            </tbody>
          </table>
        </div>
      `;

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

  return (
    <nav
      className={`navbar navbar-expand-lg w-100 ${
        darkMode ? "navbar-dark bg-dark" : "bg-light"
      }`}
      style={{ zIndex: 1060 }}
    >
      <div className="container-fluid px-3">
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          onClick={() => setIsNavExpanded(false)}
        >
          <img
            src={logo}
            alt="Logo"
            className="navbar-logo me-2 animate__animated animate__pulse"
            style={{ width: "40px", height: "40px" }}
          />
          <span className="brand-text">MediQ</span>
          {isAdmin && <span className="admin-badge ms-2">Admin</span>}
        </Link>

        <button
          className="btn btn-danger d-lg-none me-2"
          onClick={handleEmergency}
        >
          Emergency
        </button>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsNavExpanded(!isNavExpanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            isNavExpanded ? "show animate__animated animate__fadeIn" : ""
          }`}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleServiceSelection}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={handleServiceSelection}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={handleServiceSelection}>
                Contact Us
              </Link>
            </li>

            <li className="nav-item dropdown" ref={dropdownRef}>
              <button
                className="nav-link dropdown-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                type="button"
              >
                Services
              </button>
              <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/search-medicines"
                    onClick={handleServiceSelection}
                  >
                    Search Ayurvedic Medicines
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/home-remedies"
                    onClick={handleServiceSelection}
                  >
                    Search Home Remedies
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/hospitals"
                    onClick={handleServiceSelection}
                  >
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/ayurvedic-shops"
                    onClick={handleServiceSelection}
                  >
                    Ayurvedic Medical Shops
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/nearby-hospitals"
                    onClick={handleServiceSelection}
                  >
                    Nearby Hospitals
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/emergency-settings"
                    onClick={handleServiceSelection}
                  >
                    🚨 Emergency Settings
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <button
              onClick={handleEmergency}
              className="btn btn-danger d-none d-lg-block animate__animated animate__pulse animate__infinite animate__slow"
            >
              Emergency Call
            </button>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/signup"
                  className="btn btn-outline-success"
                  onClick={() => setIsNavExpanded(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="btn btn-outline-info"
                  onClick={() => setIsNavExpanded(false)}
                >
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

            <button className="btn btn-outline-dark" onClick={toggleDarkMode}>
              {darkMode ? (
                <FaSun className="animate__animated animate__rotateIn" />
              ) : (
                <FaMoon className="animate__animated animate__rotateIn" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
