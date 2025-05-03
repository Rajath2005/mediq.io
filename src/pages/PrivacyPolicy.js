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
          <div className="policy-sections">
            <h1>Privacy Policy</h1>
            <p>Last updated: May 03, 2025</p>
            <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
            <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank">Privacy Policy Generator</a>.</p>

            <h2>Interpretation and Definitions</h2>
            <h3>Interpretation</h3>
            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>

            <h3>Definitions</h3>
            <p>For the purposes of this Privacy Policy:</p>
            <ul>
              <li><p><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p></li>
              <li><p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p></li>
              <li><p><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to MediQ.</p></li>
              <li><p><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</p></li>
              <li><p><strong>Country</strong> refers to: Karnataka, India</p></li>
              <li><p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p></li>
              <li><p><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p></li>
              <li><p><strong>Service</strong> refers to the Website.</p></li>
              <li><p><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</p></li>
              <li><p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p></li>
              <li><p><strong>Website</strong> refers to MediQ, accessible from <a href="https://mediq-health.netlify.app/" rel="external nofollow noopener" target="_blank">https://mediq-health.netlify.app/</a></p></li>
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