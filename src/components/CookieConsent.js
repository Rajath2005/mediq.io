import React, { useState } from 'react';
import './CookieConsent.css';

const CookieConsent = ({ onConsentGiven }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleConsent = (choice) => {
    setIsExiting(true);

    localStorage.setItem('cookieConsent', choice);

    setTimeout(() => {
      if (onConsentGiven) {
        onConsentGiven();
      }
    }, 500);
  };

  return (
    <div className={`cookie-consent-container ${isExiting ? 'exiting' : ''}`}>
      <div className="cookie-content">
        <div className="cookie-header">
          <span className="cookie-icon">🍪</span>
          <h4 className="cookie-title">We value your privacy</h4>
        </div>

        <p className="cookie-message">
          We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
        </p>

        <div className="cookie-actions">
          <button
            onClick={() => handleConsent('rejected')}
            className="btn-cookie btn-settings"
          >
            Decline
          </button>
          <button
            onClick={() => handleConsent('accepted')}
            className="btn-cookie btn-accept"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export const getCookiePreference = () => {
  return localStorage.getItem('cookieConsent');
};

export default CookieConsent;