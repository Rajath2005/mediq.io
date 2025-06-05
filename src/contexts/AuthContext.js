import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserProfile(userData);
        setIsAdmin(userData.isAdmin || false);
        return userData;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await fetchUserProfile(user.uid);
      } else {
        setUser(null);
        setUserProfile(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const profile = await fetchUserProfile(userCredential.user.uid);
      return { user: userCredential.user, profile, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { user: null, profile: null, error };
    }
  };

  const signUp = async (email, password, userData = {}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        ...userData,
        created_at: new Date().toISOString(),
        isAdmin: false
      });

      const profile = await fetchUserProfile(userCredential.user.uid);
      return { user: userCredential.user, profile, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { user: null, profile: null, error };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      return { error: null };
    } catch (error) {
      console.error('Error signing out:', error);
      return { error };
    }
  };
  const value = {
    user,
    userProfile,
    loading,
    isAdmin,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
    updateProfile: fetchUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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