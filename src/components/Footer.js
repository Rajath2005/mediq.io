import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';
import logo from './images/logo.jpg';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Logo */}
      <div className="footer-logo">
        <img src={logo} alt="Site Logo" />
      </div>

      {/* Navigation Links */}
      <nav className="footer-nav">
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
        </ul>
      </nav>

      {/* Developer Links */}
      <div className="footer-dev-links d-flex flex-column flex-md-row justify-content-center align-items-center gap-2 mt-3">
        <a href="https://github.com/Binary-Explorers" target="_blank" rel="noopener noreferrer" title="GitHub Profile" className="footer-link d-flex align-items-center px-3 py-2 rounded bg-light shadow-sm">
          <FontAwesomeIcon icon={faGithub} size="lg" className="me-2" /> Main Org
        </a>
        <a href="https://github.com/Rajath2005/mediq.io" target="_blank" rel="noopener noreferrer" className="footer-link d-flex align-items-center px-3 py-2 rounded bg-light shadow-sm">
          <FontAwesomeIcon icon={faGithub} size="sm" className="me-2" /> Project Repo
        </a>
        <a href="https://github.com/Rajath2005/mediq.io/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="footer-link d-flex align-items-center px-3 py-2 rounded bg-light shadow-sm">
          <span className="me-2">📄</span> README
        </a>
        <a href="https://github.com/Sanath00007/ayurveda-api" target="_blank" rel="noopener noreferrer" className="footer-link d-flex align-items-center px-3 py-2 rounded bg-light shadow-sm">
          <FontAwesomeIcon icon={faGithub} size="sm" className="me-2" /> API Sub-Repo
        </a>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <small className="text-muted">
          &copy; {new Date().getFullYear()} AyuDost. All rights reserved. | Built by❤️{' '}
          <a
            href="https://github.com/Binary-Explorers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none text-dark fw-bold"
          >
            Binary Explorers
          </a>
        </small>
      </div>
    </footer>
  );
};

export default Footer;
