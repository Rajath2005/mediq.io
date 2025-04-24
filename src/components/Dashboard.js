import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import UserProfileDropdown from './UserProfileDropdown';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        fetchUserDetails();
      }
    };

    const fetchUserDetails = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Get user metadata
          const metadata = user.user_metadata || {};
          
          // Try to get the name from metadata in order of preference
          let displayName = metadata.full_name;
          if (!displayName) {
            const firstName = metadata.first_name || '';
            const lastName = metadata.last_name || '';
            displayName = `${firstName} ${lastName}`.trim();
          }
          
          // If still no name, try to get it from the profiles table
          if (!displayName) {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('full_name, first_name, last_name')
              .eq('id', user.id)
              .single();
              
            if (profileData) {
              displayName = profileData.full_name || 
                `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim();
            }
          }
          
          // Set user details with proper fallbacks
          setUserDetails({
            name: displayName || user.email.split('@')[0], // Use email username as last resort
            email: user.email,
            profileImage: metadata.avatar_url || null
          });
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        navigate('/login');
      }
    };

    checkSession();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome to the Dashboard{userDetails?.name ? `, ${userDetails.name}` : ''}</h2>
        <UserProfileDropdown
          isAuthenticated={!!userDetails}
          userDetails={userDetails}
          onLogout={handleLogout}
        />
      </header>

      <main>
        <p>This is the dashboard content visible only after login.</p>
      </main>
    </div>
  );
};

export default Dashboard;