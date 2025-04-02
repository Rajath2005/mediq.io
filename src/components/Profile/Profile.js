import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCalendar } from 'react-icons/fa';

const Profile = ({ userDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userDetails?.name || '',
    email: userDetails?.email || '',
    phone: userDetails?.phone || '',
    dateOfBirth: userDetails?.dateOfBirth || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2 className="mb-4">My Profile</h2>
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={userDetails?.profileImage || '/images/default-avatar.png'}
            alt="Profile"
            className="profile-image"
          />
          {!isEditing && (
            <button 
              className="btn btn-primary edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                <FaUser className="me-2" />
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            {/* Add more form fields */}
            <div className="button-group">
              <button type="submit" className="btn btn-primary">Save</button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <div className="detail-item">
              <FaUser className="icon" />
              <div>
                <h6>Full Name</h6>
                <p>{userDetails?.name}</p>
              </div>
            </div>
            <div className="detail-item">
              <FaEnvelope className="icon" />
              <div>
                <h6>Email</h6>
                <p>{userDetails?.email}</p>
              </div>
            </div>
            {/* Add more details */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
