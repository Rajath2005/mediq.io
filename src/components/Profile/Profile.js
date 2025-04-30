import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCalendar } from 'react-icons/fa';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  const fetchProfile = React.useCallback(async () => {
    try {
      setLoading(true);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (profile) {
        setUserProfile(profile);
        setFormData({
          name: profile.full_name || user.user_metadata?.full_name || '',
          email: user.email || '',
          phone: profile.phone || '',
          dateOfBirth: profile.date_of_birth || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updates = {
        id: user.id,
        full_name: formData.name,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth,
        updated_at: new Date()
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;

      // Update user metadata
      await supabase.auth.updateUser({
        data: { full_name: formData.name }
      });

      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2 className="mb-4">My Profile</h2>
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={userProfile?.profile_image || '/images/default-avatar.png'}
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
            <div className="mb-3">
              <label className="form-label">
                <FaPhone className="me-2" />
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <FaCalendar className="me-2" />
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
              />
            </div>
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
                <p>{userProfile?.full_name || 'N/A'}</p>
              </div>
            </div>
            <div className="detail-item">
              <FaEnvelope className="icon" />
              <div>
                <h6>Email</h6>
                <p>{user?.email || 'N/A'}</p>
              </div>
            </div>
            <div className="detail-item">
              <FaPhone className="icon" />
              <div>
                <h6>Phone</h6>
                <p>{userProfile?.phone || 'N/A'}</p>
              </div>
            </div>
            <div className="detail-item">
              <FaCalendar className="icon" />
              <div>
                <h6>Date of Birth</h6>
                <p>{userProfile?.date_of_birth || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
