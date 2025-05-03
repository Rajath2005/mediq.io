import { useState, useEffect } from 'react';

// CookieConsent Component
const CookieConsent = () => {
  // State to control popup visibility
  const [isVisible, setIsVisible] = useState(false);
  // State to control exit animation
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookiePreference = getCookiePreference();
    
    // If no preference is found, show the popup after a short delay
    if (!cookiePreference) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle user consent choice
  const handleConsent = (choice) => {
    // Start exit animation
    setIsExiting(true);
    
    // Set the user's preference in localStorage
    localStorage.setItem('cookieConsent', choice);
    
    // Hide popup after animation completes
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  // Return nothing if the popup shouldn't be visible
  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg border-t border-gray-200 z-50 transition-all duration-500 transform ${isExiting ? 'translate-y-full' : 'translate-y-0'}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Cookie message */}
          <div className="text-sm md:text-base text-gray-700 flex-grow">
            We use cookies to improve your experience. You can accept or manage your preferences.
          </div>
          
          {/* Buttons container */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            <button 
              onClick={() => handleConsent('accepted')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Accept All
            </button>
            <button 
              onClick={() => handleConsent('rejected')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Reject All
            </button>
            <button 
              onClick={() => handleConsent('customized')}
              className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Customize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Function to check user's cookie consent preference
 * @returns {string|null} 'accepted', 'rejected', 'customized', or null if no preference
 */
export const getCookiePreference = () => {
  return localStorage.getItem('cookieConsent');
};

export default CookieConsent;