import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutPage'; // Fixed: Changed from './pages/AboutUs' to './pages/AboutPage'
import ServicesPage from './pages/ServicesPage';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./pages/Profile";
import Appointments from "./pages/Appointments";
import Preloader from "./components/Preloader";
import PrivacyPolicy from './pages/PrivacyPolicy';
import Ayurveda_medicals from "./components/Ayurveda_medicals";
import SuggestShopForm from "./components/SuggestShopForm"; // ✅ Suggest Shop Form
// ✅ New Pages
import HomeRemediesPage from './pages/HomeRemediesPage'; 
import SearchPage from './pages/SearchPage'; // ✅ Ayurvedic Medicines search

// Booking pages
import HospitalList from './pages/booking/HospitalList';
import DoctorList from './pages/booking/DoctorList';
import BookAppointment from './pages/booking/BookAppointment';

import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  useEffect(() => {
    const hasAcceptedPrivacy = localStorage.getItem('privacyAccepted') === 'true';
    setPrivacyAccepted(hasAcceptedPrivacy);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  if (!privacyAccepted) {
    return (
      <PrivacyPolicy
        isOpen={true}
        onAccept={() => setPrivacyAccepted(true)}
        onClose={() => {}}
      />
    );
  }

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<><Hero /><ServicesSection /></>} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/contact" element={<Contact />} />
          {/* eslint-disable-next-line react/jsx-pascal-case */}
          <Route path="/ayurvedic-shops" element={<Ayurveda_medicals />} />
          {/* ✅ Remedy & Medicine Search Pages */}
          <Route path="/home-remedies" element={<HomeRemediesPage />} />
          <Route path="/search-medicines" element={<SearchPage />} />
          
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* Booking flow */}
          <Route path="/hospitals" element={<HospitalList />} />
          <Route path="/hospitals/:hospitalId/doctors" element={<DoctorList />} />
          <Route path="/book-appointment/:hospitalId/:doctorId" element={<BookAppointment />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
