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
          <h1>Privacy Policy</h1>
          <p>Last updated: May 03, 2025</p>
          <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
          <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>

          <section className="policy-section">
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
              <li><p><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company.</p></li>
              <li><p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself.</p></li>
              <li><p><strong>Website</strong> refers to MediQ, accessible from <a href="https://mediq-health.netlify.app/" rel="external nofollow noopener" target="_blank">https://mediq-health.netlify.app/</a></p></li>
              <li><p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p></li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>Collecting and Using Your Personal Data</h2>
            <h3>Types of Data Collected</h3>
            
            <h4>Personal Data</h4>
            <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
            <ul>
              <li><p>Email address</p></li>
              <li><p>First name and last name</p></li>
              <li><p>Usage Data</p></li>
            </ul>

            <h4>Usage Data</h4>
            <p>Usage Data is collected automatically when using the Service.</p>
            <p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>

            <h4>Tracking Technologies and Cookies</h4>
            <p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</p>
            <ul>
              <li><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent.</li>
              <li><strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons that permit the Company to count users who have visited those pages or opened an email.</li>
            </ul>

            <h3>Use of Your Personal Data</h3>
            <p>The Company may use Personal Data for the following purposes:</p>
            <ul>
              <li><p><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p></li>
              <li><p><strong>To manage Your Account</strong> and provide You with access to different functionalities.</p></li>
              <li><p><strong>To contact You</strong> by email, telephone calls, SMS, or other forms of electronic communication.</p></li>
              <li><p><strong>To provide You</strong> with news, special offers and general information about other goods, services and events.</p></li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>Security of Your Personal Data</h2>
            <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
          </section>

          <section className="policy-section">
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, You can contact us:</p>
            <ul>
              <li><p>By email: mediq2005@gmail.com</p></li>
              <li><p>By visiting this page on our website: <a href="https://mediq-health.netlify.app/#/contact" rel="external nofollow noopener" target="_blank">https://mediq-health.netlify.app/#/contact</a></p></li>
            </ul>
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