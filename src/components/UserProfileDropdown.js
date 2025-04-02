import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaSignOutAlt, FaUserMd } from 'react-icons/fa';
import './UserProfileDropdown.css';

// Using direct path from public folder
const defaultAvatarUrl = process.env.PUBLIC_URL + '/images/default-avatar.png';

const UserProfileDropdown = ({ isAuthenticated, userDetails, onLogout }) => {
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="dropdown">
      <button
        className="btn btn-link dropdown-toggle d-flex align-items-center gap-2"
        type="button"
        id="userDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src={userDetails?.profileImage || defaultAvatarUrl}
          alt="Profile"
          className="rounded-circle"
          width="32"
          height="32"
        />
        <span className="d-none d-md-inline">{userDetails?.name || 'User'}</span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
        <li className="dropdown-item-text">
          <div className="d-flex align-items-center gap-2 p-2">
            <img
              src={userDetails?.profileImage || defaultAvatarUrl}
              alt="Profile"
              className="rounded-circle"
              width="48"
              height="48"
            />
            <div>
              <div className="fw-bold">{userDetails?.name || 'User'}</div>
              <div className="small text-muted">{userDetails?.email}</div>
            </div>
          </div>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li><Link className="dropdown-item" to="/profile"><FaUser className="me-2" />My Profile</Link></li>
        <li><Link className="dropdown-item" to="/appointments"><FaUserMd className="me-2" />My Appointments</Link></li>
        <li><Link className="dropdown-item" to="/settings"><FaCog className="me-2" />Settings</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><button className="dropdown-item" onClick={onLogout}><FaSignOutAlt className="me-2" />Logout</button></li>
      </ul>
    </div>
  );
};

export default UserProfileDropdown;
