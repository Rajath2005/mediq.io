import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const fetchUserProfile = async (userId) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (profile) {
        try {
          await supabase.auth.updateUser({
            data: {
              full_name: profile.full_name,
              avatar_url: profile.avatar_url
            }
          });
          setUserProfile(profile);
        } catch (updateError) {
          console.error('Error updating user:', updateError);
        }
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (mounted) {
          const currentUser = session?.user;
          setUser(currentUser || null);
          setIsAuthenticated(!!currentUser);
          
          if (currentUser) {
            await fetchUserProfile(currentUser.id);
          }
        }
      } catch (error) {
        console.error('Error in initializeAuth:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        const currentUser = session?.user;
        setUser(currentUser || null);
        setIsAuthenticated(!!currentUser);
        
        if (currentUser) {
          await fetchUserProfile(currentUser.id);
        } else {
          setUserProfile(null);
        }
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    userProfile,
    loading,
    isAuthenticated,
    signIn: async (email, password) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error && data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
        await fetchUserProfile(data.user.id);
      }
      return { data, error };
    },
    signOut: async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        // Clear all auth state
        setUser(null);
        setUserProfile(null);
        setIsAuthenticated(false);
        
        // Clear any local storage items related to auth
        localStorage.removeItem('supabase.auth.token');
        
        return { error: null };
      } catch (error) {
        console.error('Error signing out:', error);
        return { error };
      }
    },
    signUp: async (email, password) => {
      const { data, error } = await supabase.auth.signUp({ email, password });
      return { data, error };
    },
    updateProfile: fetchUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};