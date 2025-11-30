import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './UserProfileDropdown.css';

// Helper function to get initials from name or email
const getInitials = (name, email) => {
  if (name && name !== email) {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
  return email ? email.substring(0, 2).toUpperCase() : 'U';
};

// Helper function to generate color based on email
const getAvatarColor = (email) => {
  if (!email) return '#3FA34D';
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = ['#3FA34D', '#2d6a4f', '#52b788', '#4299e1', '#9f7aea', '#ed8936', '#f56565', '#48bb78', '#38b2ac', '#667eea'];
  return colors[Math.abs(hash) % colors.length];
};

// Avatar Component
const Avatar = ({ src, name, email, size = 48, className = '' }) => {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(name, email);
  const bgColor = getAvatarColor(email);

  if (src && !imageError) {
    return <img src={src} alt="Profile" className={className} onError={() => setImageError(true)} />;
  }

  return (
    <div className={`initials-avatar ${className}`} style={{ width: `${size}px`, height: `${size}px`, backgroundColor: bgColor, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: `${size * 0.4}px`, borderRadius: '50%', border: '3px solid white', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      {initials}
    </div>
  );
};

const UserProfileDropdown = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const dropdownButtonRef = useRef(null);
  const user = auth.currentUser;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.bootstrap) {
      new window.bootstrap.Dropdown(dropdownButtonRef.current);
    }
  }, []);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const tokenResult = await user.getIdTokenResult();
          setIsAdmin(tokenResult.claims.admin === true);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      }
    };

    checkAdminStatus();
  }, [user]);

  if (!isAuthenticated || !user) return null;
  const displayName = user.displayName || user.email;
  const avatarUrl = user.photoURL;
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out. Please try again.');
    }
  };

  return (
    <div className="dropdown">
      <button
        ref={dropdownButtonRef}
        className="btn btn-outline-primary dropdown-toggle d-flex align-items-center"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar src={avatarUrl} name={displayName} email={user.email} size={24} className="rounded-circle me-2" />
        <span>{displayName}</span>
      </button>

      <ul className={`dropdown-menu dropdown-menu-end ${isOpen ? 'show' : ''}`}>
        <li>
          <div className="user-profile-header">
            <div className="user-avatar-wrapper">
              <Avatar src={avatarUrl} name={displayName} email={user.email} size={48} className="user-avatar" />
            </div>
            <div className="user-info">
              <div className="user-name">{displayName}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
        </li>

        {isAdmin && (
          <>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <Link to="/manage-appointments" className="dropdown-item">
                Manage Appointments
              </Link>
            </li>
            <li>
              <Link to="/emergency-settings" className="dropdown-item">
                Emergency Settings
              </Link>
            </li>
          </>
        )}

        <li><hr className="dropdown-divider" /></li>
        <li>
          <button
            type="button"
            className="dropdown-item sign-out-btn"
            onClick={handleLogout}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="me-2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserProfileDropdown;
