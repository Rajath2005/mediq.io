import React, { useState } from 'react';
import { FaBell, FaLock, FaLanguage, FaMoon } from 'react-icons/fa';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en',
    twoFactorAuth: false
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="settings-container">
      <h2 className="mb-4">Settings</h2>
      <div className="settings-section">
        <div className="setting-card">
          <div className="setting-header">
            <FaBell className="icon" />
            <h5>Notifications</h5>
          </div>
          <div className="setting-content">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={settings.notifications}
                onChange={() => handleToggle('notifications')}
              />
              <label className="form-check-label">
                Enable Notifications
              </label>
            </div>
          </div>
        </div>

        <div className="setting-card">
          <div className="setting-header">
            <FaLock className="icon" />
            <h5>Security</h5>
          </div>
          <div className="setting-content">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={() => handleToggle('twoFactorAuth')}
              />
              <label className="form-check-label">
                Two-Factor Authentication
              </label>
            </div>
          </div>
        </div>
        
        {/* Add more settings cards */}
      </div>
    </div>
  );
};

export default Settings;
