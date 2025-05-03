import React, { useState } from 'react';
import './CookieConsent.css'; // We'll create this CSS file

// CookieConsent Component using Bootstrap
const CookieConsent = ({ onConsentGiven }) => {
  // State to control exit animation
  const [isExiting, setIsExiting] = useState(false);

  // Handle user consent choice
  const handleConsent = (choice) => {
    // Start exit animation
    setIsExiting(true);
    
    // Set the user's preference in localStorage
    localStorage.setItem('cookieConsent', choice);
    
    // Hide popup after animation completes
    setTimeout(() => {
      if (onConsentGiven) {
        onConsentGiven();
      }
    }, 500);
  };

  return (
    <div className={`cookie-consent-container ${isExiting ? 'exiting' : ''}`}>
      <div className="container">
        <div className="row align-items-center">
          {/* Cookie message */}
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <p className="cookie-message">
              We use cookies to improve your experience. You can accept or manage your preferences.
            </p>
          </div>
          
          {/* Buttons container */}
          <div className="col-12 col-md-6">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
              <button 
                onClick={() => handleConsent('accepted')}
                className="btn btn-primary"
              >
                Accept All
              </button>
              <button 
                onClick={() => handleConsent('rejected')}
                className="btn btn-light"
              >
                Reject All
              </button>
              <button 
                onClick={() => handleConsent('customized')}
                className="btn btn-outline-secondary"
              >
                Customize
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Function to check user's cookie consent preference
 * @returns {string|null} 'accepted', 'rejected', 'customized', or null if no preference
 */
export const getCookiePreference = () => {
  return localStorage.getItem('cookieConsent');
};

export default CookieConsent;