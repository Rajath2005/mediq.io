// Profile.js (Read-only, Firebase version)
import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import '../../firebase'; // Ensure firebase is initialized
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState({ name: '', photoURL: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({
          name: user.displayName || 'No Name',
          photoURL: user.photoURL || 'https://via.placeholder.com/150',
        });
      } else {
        setUserData({ name: 'No Name', photoURL: 'https://via.placeholder.com/150' });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 profile-container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <img
                  src={userData.photoURL}
                  alt="Profile"
                  className="rounded-circle profile-image"
                />
              </div>
              <div className="profile-details">
                <div className="mb-3 p-3 bg-light rounded detail-item">
                  <div className="d-flex align-items-center justify-content-center">
                    <FaUser className="me-2 text-primary icon" />
                    <div>
                      <h6 className="mb-0">Full Name</h6>
                      <p className="mb-0">{userData.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;