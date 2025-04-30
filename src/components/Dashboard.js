import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserProfileDropdown from './UserProfileDropdown';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome to the Dashboard{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}</h2>
        <UserProfileDropdown
          isAuthenticated={isAuthenticated}
          userDetails={{
            name: user?.user_metadata?.full_name || user?.email,
            email: user?.email,
            profileImage: user?.user_metadata?.avatar_url
          }}
        />
      </header>

      <main>
        <p>This is the dashboard content visible only after login.</p>
      </main>
    </div>
  );
};

export default Dashboard;