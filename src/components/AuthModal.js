import React from 'react';
import { Link } from 'react-router-dom';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, message = "Please log in to continue" }) => {
  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>&times;</button>
        <div className="auth-modal-body">
          <h2>Authentication Required</h2>
          <p>{message}</p>
          <div className="auth-modal-buttons">
            <Link to="/login" className="btn btn-primary" onClick={onClose}>
              Log In
            </Link>
            <Link to="/signup" className="btn btn-outline-primary" onClick={onClose}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;