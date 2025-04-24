import React, { useState } from 'react';
import { FaBell, FaLock, FaLanguage, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [settings, setSettings] = useState({
    notifications: true,
    language: 'en',
    twoFactorAuth: false
  });

  const handleToggle = (setting) => {
    if (setting === 'darkMode') {
      toggleDarkMode();
      return;
    }
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
            <FaMoon className="icon" />
            <h5>Dark Mode</h5>
          </div>
          <div className="setting-content">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={darkMode}
                onChange={() => handleToggle('darkMode')}
              />
              <label className="form-check-label">
                Enable Dark Mode
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

        <div className="setting-card">
          <div className="setting-header">
            <FaLanguage className="icon" />
            <h5>Language</h5>
          </div>
          <div className="setting-content">
            <select 
              className="form-select" 
              value={settings.language}
              onChange={(e) => setSettings(prev => ({...prev, language: e.target.value}))}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="kn">Kannada</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
