import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './UserProfileDropdown.css';

const UserProfileDropdown = ({ isAuthenticated, onLogout }) => {
  const { user, userProfile } = useAuth();

  if (!isAuthenticated || !user) return null;

  const displayName = userProfile?.full_name || user.user_metadata?.full_name || user.email;
  const avatarUrl = userProfile?.avatar_url || user.user_metadata?.avatar_url;

  return (
    <div className="dropdown">
      <button 
        className="dropdown-toggle btn btn-outline-primary"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img 
          src={avatarUrl || '/images/default-avatar.png'}
          alt="Profile"
          className="profile-image me-2"
          style={{ width: '24px', height: '24px', borderRadius: '50%' }}
        />
        {displayName}
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li className="dropdown-item-text">
          <div className="d-flex align-items-center px-3 py-2">
            <img 
              src={avatarUrl || '/images/default-avatar.png'}
              alt="Profile"
              className="me-2"
              style={{ width: '32px', height: '32px', borderRadius: '50%' }}
            />
            <div>
              <div className="fw-bold">{displayName}</div>
              <small className="text-muted">{user.email}</small>
            </div>
          </div>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <Link className="dropdown-item" to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/appointments">
            My Appointments
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/settings">
            Settings
          </Link>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <button className="dropdown-item text-danger" onClick={onLogout}>
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserProfileDropdown;
