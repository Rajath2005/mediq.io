import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useAuthProtection = () => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const requireAuth = useCallback(async (callback) => {
    if (isAuthenticated) {
      return callback();
    }
    setShowAuthModal(true);
    return false;
  }, [isAuthenticated]);

  const closeAuthModal = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  return {
    showAuthModal,
    closeAuthModal,
    requireAuth
  };
};