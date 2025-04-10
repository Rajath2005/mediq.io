// src/pages/PrivacyPolicy/PrivacyPolicy.js
import React, { useState, useEffect } from 'react';
import './PrivacyPolicy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const PrivacyPolicy = ({ onAccept, isOpen, onClose }) => {
  const [agree, setAgree] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300);
    }
  }, [isOpen]);

  const handleScroll = (e) => {
    const element = e.target;
    const bottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 50;
    if (bottom) {
      setScrolledToBottom(true);
    }
  };

  const handleAccept = (e) => {
    e.preventDefault();
    if (agree && scrolledToBottom) {
      localStorage.setItem('privacyAccepted', 'true');
      if (onAccept) onAccept();
      if (onClose) onClose();
    } else {
      const errorMessage = !scrolledToBottom 
        ? 'Please scroll through the entire Privacy Policy to continue.' 
        : 'Please agree to the Privacy Policy to continue.';
        
      document.getElementById('privacyToast').classList.add('show');
      document.getElementById('privacyToastMessage').innerText = errorMessage;
      setTimeout(() => document.getElementById('privacyToast').classList.remove('show'), 3000);
    }
  };

  if (!visible) return null;

  const overlayClasses = `privacy-policy-overlay ${isOpen ? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut'}`;
  const modalClasses = `privacy-policy-container ${isOpen ? 'animate__animated animate__zoomIn' : 'animate__animated animate__zoomOut'}`;

  return (
    <div className={overlayClasses}>
      <div className={modalClasses}>
        <div className="privacy-policy-header">
          <h1 className="text-primary">MediQ Privacy Policy</h1>
          <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
        </div>
        
        <p className="last-updated text-muted">
          <i className="bi bi-calendar-check me-2"></i>
          <strong>Last Updated: April 9, 2025</strong>
        </p>

        <div className="progress mb-3" style={{ height: '6px' }}>
          <div 
            className="progress-bar bg-success" 
            role="progressbar" 
            style={{ width: scrolledToBottom ? '100%' : '0%' }}
            aria-valuenow={scrolledToBottom ? 100 : 0} 
            aria-valuemin="0" 
            aria-valuemax="100"
          ></div>
        </div>

        <div className="privacy-policy-content scrollable" onScroll={handleScroll}>
          <section className="policy-section">
            <h2>1. Introduction</h2>
            <p>Welcome to MediQ. This Privacy Policy explains how we collect, use, and protect your information.</p>
          </section>

          <section className="policy-section">
            <h2>2. Information We Collect</h2>
            <ul className="info-list">
              <li><i className="bi bi-person me-2"></i>Personal Information</li>
              <li><i className="bi bi-journal-medical me-2"></i>Health Information</li>
              <li><i className="bi bi-globe me-2"></i>Technical Information</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Data Security</h2>
            <div className="alert alert-info">
              <i className="bi bi-shield-lock-fill me-2"></i>
              <p>We implement security measures to protect your information as required by HIPAA.</p>
            </div>
          </section>

          <section className="policy-section">
            <h2>4. Contact Us</h2>
            <div className="contact-info">
              <p><i className="bi bi-envelope me-2"></i>privacy@mediq.io</p>
              <p><i className="bi bi-telephone me-2"></i>(800) 555-1234</p>
            </div>
          </section>
        </div>

        <div className="accept-controls">
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="privacyAgreement" 
              checked={agree} 
              onChange={(e) => setAgree(e.target.checked)} 
            />
            <label className="form-check-label" htmlFor="privacyAgreement">
              I have read and agree to the Privacy Policy
            </label>
          </div>
          
          <div className="action-buttons">
            <button className="btn btn-secondary me-2" onClick={onClose}>Cancel</button>
            <button 
              className={`btn btn-primary ${(!agree || !scrolledToBottom) ? 'disabled' : ''}`}
              onClick={handleAccept} 
              disabled={!agree || !scrolledToBottom}
            >
              Accept & Continue
            </button>
          </div>
        </div>
      </div>

      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
        <div id="privacyToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <i className="bi bi-exclamation-circle-fill me-2 text-danger"></i>
            <strong className="me-auto">Error</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body" id="privacyToastMessage">
            Please scroll through and agree to the Privacy Policy to continue.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;