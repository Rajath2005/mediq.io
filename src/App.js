import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile/Profile"; // Updated import path
import Dashboard from "./components/Dashboard"; // Added Dashboard import
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
import './App.css';
import CookieConsent from "./components/CookieConsent"; // Updated import path

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
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/ayurvedic-shops" element={<AyurvedaMedicals />} />
              <Route path="/suggest-shop" element={<SuggestShopForm />} />
              <Route path="/nearby-hospitals" element={<NearbyHospitals />} />
              <Route path="/home-remedies" element={<HomeRemediesPage />} />
              <Route path="/search-medicines" element={<SearchPage />} />
              <Route path="/emergency-settings" element={<EmergencySettingsPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/hospitals" element={<HospitalList />} />
              <Route path="/hospitals/:hospitalId/doctors" element={<DoctorList />} />
              <Route path="/book-appointment/:hospitalId/:doctorId" element={<BookAppointment />} />
            </Routes>
            <Footer />
            {/* Display cookie consent based on showCookieConsent state */}
            {showCookieConsent && <CookieConsent onConsentGiven={() => setShowCookieConsent(false)} />}
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;