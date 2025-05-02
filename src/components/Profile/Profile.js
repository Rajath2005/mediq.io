// Improved Profile Component and CSS

// Profile.js
import React, { useState, useEffect, useCallback } from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('full_name, profile_image')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setFormData({
        name: profile?.full_name || user.user_metadata?.full_name || '',
        email: user.email || ''
      });
    } catch (error) {
      console.error('Fetch profile error:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchProfile();
  }, [user, fetchProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updates = {
        id: user.id,
        full_name: formData.name,
        updated_at: new Date()
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;

      await supabase.auth.updateUser({ data: { full_name: formData.name } });
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Update profile error:', error);
    }
  };

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
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="card-title h4 mb-0">My Profile</h2>
                {!isEditing && (
                  <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="text-center mb-4">
                <img
                  src={user.user_metadata?.profile_image || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="rounded-circle profile-image"
                />
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">
                      <FaUser className="me-2" /> Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-details">
                  <div className="mb-3 p-3 bg-light rounded detail-item">
                    <div className="d-flex align-items-center">
                      <FaUser className="me-2 text-primary icon" />
                      <div>
                        <h6 className="mb-0">Full Name</h6>
                        <p className="mb-0">{formData.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-light rounded detail-item">
                    <div className="d-flex align-items-center">
                      <FaEnvelope className="me-2 text-primary icon" />
                      <div>
                        <h6 className="mb-0">Email</h6>
                        <p className="mb-0">{formData.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;