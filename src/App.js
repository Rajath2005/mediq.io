import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin"; // Added AdminLogin import
import Signup from "./components/Signup";
import Profile from "./components/Profile/Profile";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard"; // Added AdminDashboard import
import Appointments from "./pages/Appointments";
import Preloader from "./components/Preloader";
import PrivacyPolicy from './pages/PrivacyPolicy';
import AyurvedaMedicals from "./components/Ayurveda_medicals";
import SuggestShopForm from "./components/SuggestShopForm";
import HomeRemediesPage from './pages/HomeRemediesPage';
import SearchPage from './pages/SearchPage';
import NearbyHospitals from "./components/NearbyHospital";
import HospitalList from './pages/booking/HospitalList';
import DoctorList from './pages/booking/DoctorList';
import BookAppointment from './pages/booking/BookAppointment';
import EmergencySettingsPage from './pages/EmergencySettingsPage';
import ManageAppointments from './components/ManageAppointments';
import './App.css';
import CookieConsent from "./components/CookieConsent";

// Protected Route Components
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  return isAuthenticated && isAdmin ? children : <Navigate to="/admin-login" />;
};

const UserRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  // If user is admin, redirect to admin dashboard instead of regular user pages
  if (isAuthenticated && isAdmin) {
    return <Navigate to="/admin-dashboard" />;
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    // Handle initial loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    // Show cookie consent after 10 seconds if no previous preference exists
    const cookieConsentPreference = localStorage.getItem('cookieConsent');
    if (!cookieConsentPreference) {
      const cookieTimer = setTimeout(() => {
        setShowCookieConsent(true);
      }, 10000);
      
      return () => {
        clearTimeout(loadingTimer);
        clearTimeout(cookieTimer);
      };
    }
    
    return () => clearTimeout(loadingTimer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <Routes>
              <Route path="/" element={<><Hero /><ServicesSection /></>} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin-login" element={<AdminLogin />} /> {/* Added admin login route */}
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected User Routes */}
              <Route path="/dashboard" element={<UserRoute><Dashboard /></UserRoute>} />
              <Route path="/profile" element={<UserRoute><Profile /></UserRoute>} />
              <Route path="/appointments" element={<UserRoute><Appointments /></UserRoute>} />
              <Route path="/book-appointment/:hospitalId/:doctorId" element={<UserRoute><BookAppointment /></UserRoute>} />
              
              {/* Protected Admin Routes */}
              <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} /> {/* Added admin dashboard */}
              <Route path="/manage-appointments" element={<AdminRoute><ManageAppointments /></AdminRoute>} />
              <Route path="/emergency-settings" element={<AdminRoute><EmergencySettingsPage /></AdminRoute>} />
              
              {/* Public Routes */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/ayurvedic-shops" element={<AyurvedaMedicals />} />
              <Route path="/suggest-shop" element={<SuggestShopForm />} />
              <Route path="/nearby-hospitals" element={<NearbyHospitals />} />
              <Route path="/home-remedies" element={<HomeRemediesPage />} />
              <Route path="/search-medicines" element={<SearchPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/hospitals" element={<HospitalList />} />
              <Route path="/hospitals/:hospitalId/doctors" element={<DoctorList />} />
            </Routes>
            <Footer />
            {showCookieConsent && <CookieConsent onConsentGiven={() => setShowCookieConsent(false)} />}
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;