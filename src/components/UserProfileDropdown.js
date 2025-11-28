import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './UserProfileDropdown.css';

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
          // Get the ID token result which contains custom claims
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
              <a
                href="https://ayudost-connect-62435.lovable.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="dropdown-item"
              >
                Book Appointment
              </a>
            </li>
          </>
        )}

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
