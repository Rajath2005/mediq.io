import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaCode, FaBook, FaServer } from 'react-icons/fa';
import './Footer.css';
import logo from './images/logo.jpg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-col footer-brand">
            <Link to="/" className="footer-logo-wrapper">
              <img src={logo} alt="AyuDost Logo" className="footer-logo" />
              <span className="footer-brand-name">AyuDost</span>
            </Link>
            <p className="footer-desc">
              Bridging ancient Ayurvedic wisdom with modern AI technology for a healthier, balanced life.
            </p>
            <div className="footer-socials">
              <a href="https://github.com/Rajath2005/mediq.io" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="#" className="social-icon-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon-link" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" className="social-icon-link" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-col">
            <h3>Our Services</h3>
            <ul className="footer-links">
              <li><Link to="/search-medicines">Ayurvedic Medicines</Link></li>
              <li><Link to="/home-remedies">Home Remedies</Link></li>
              <li><Link to="/nearby-hospitals">Find Hospitals</Link></li>
              <li><Link to="/ayurvedic-shops">Medical Shops</Link></li>
              <li><Link to="/emergency-settings">Emergency Settings</Link></li>
              <li><Link to="/chatbot">AI Chatbot</Link></li>
              <li><a href="https://ayudost-chatbot.onrender.com/drishti-upload" target="_blank" rel="noopener noreferrer">Image Detection</a></li>
            </ul>
          </div>

          {/* Column 4: Developers (Restored Content) */}
          <div className="footer-col">
            <h3>Developers</h3>
            <ul className="footer-links">
              <li>
                <a href="https://github.com/Binary-Explorers" target="_blank" rel="noopener noreferrer">
                  <FaGithub style={{ marginRight: '8px' }} /> Main Org
                </a>
              </li>
              <li>
                <a href="https://github.com/Rajath2005/mediq.io" target="_blank" rel="noopener noreferrer">
                  <FaCode style={{ marginRight: '8px' }} /> Project Repo
                </a>
              </li>
              <li>
                <a href="https://github.com/Rajath2005/mediq.io/blob/main/README.md" target="_blank" rel="noopener noreferrer">
                  <FaBook style={{ marginRight: '8px' }} /> README
                </a>
              </li>
              <li>
                <a href="https://github.com/Sanath00007/ayurveda-api" target="_blank" rel="noopener noreferrer">
                  <FaServer style={{ marginRight: '8px' }} /> API Sub-Repo
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} AyuDost. All rights reserved. | Built by❤️{' '}
            <a
              href="https://github.com/Binary-Explorers"
              target="_blank"
              rel="noopener noreferrer"
              className="brand-link"
            >
              Binary Explorers
            </a>
          </div>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
