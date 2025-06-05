import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './UserProfileDropdown.css';

const UserProfileDropdown = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const dropdownButtonRef = useRef(null);
  const user = auth.currentUser;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.bootstrap) {
      new window.bootstrap.Dropdown(dropdownButtonRef.current);
    }
  }, []);

  if (!isAuthenticated || !user) return null;

  const displayName = userProfile?.full_name || user.user_metadata?.full_name || user.email;
  const avatarUrl = userProfile?.avatar_url || user.user_metadata?.avatar_url;
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
        <img 
          src={avatarUrl || '/images/default-avatar.png'} 
          alt="Profile" 
          className="rounded-circle me-2"
          style={{ width: '24px', height: '24px', objectFit: 'cover' }}
        />
        <span>{displayName}</span>
      </button>

      <ul className={`dropdown-menu dropdown-menu-end ${isOpen ? 'show' : ''}`}>
        <li>
          <div className="px-4 py-3">
            <div className="d-flex align-items-center">
              <img 
                src={avatarUrl || '/images/default-avatar.png'} 
                alt="Profile" 
                className="rounded-circle me-2"
                style={{ width: '32px', height: '32px', objectFit: 'cover' }}
              />
              <div>
                <div className="fw-bold">{displayName}</div>
                <small className="text-muted">{user.email}</small>
              </div>
            </div>
          </div>
        </li>
        <li><hr className="dropdown-divider" /></li>
        
        <li>
          <Link to="/profile" className="dropdown-item">
            Profile
          </Link>
        </li>

        {isAdmin ? (
          <>
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
        ) : (
          <>
            <li>
              <Link to="/appointments" className="dropdown-item">
                My Appointments
              </Link>
            </li>
            <li>
              <Link to="/hospitals" className="dropdown-item">
                Book Appointment
              </Link>
            </li>
          </>
        )}
        
        <li>
          <Link to="/settings" className="dropdown-item">
            Settings
          </Link>
        </li>
        
        <li><hr className="dropdown-divider" /></li>
        <li>
          <button 
            type="button"
            className="dropdown-item text-danger" 
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserProfileDropdown;
