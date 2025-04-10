import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import ServicesPage from './pages/ServicesPage';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./pages/Profile";
import Appointments from "./pages/Appointments";
import BookAppointment from "./pages/BookAppointment";
import Preloader from "./components/Preloader";
import SearchPage from './pages/SearchPage';
import PrivacyPolicy from './pages/PrivacyPolicy';

import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  useEffect(() => {
    // Check privacy policy acceptance
    const hasAcceptedPrivacy = localStorage.getItem('privacyAccepted') === 'true';
    setPrivacyAccepted(hasAcceptedPrivacy);

    // Existing preloader logic
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show Preloader for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  if (!privacyAccepted) {
    return <PrivacyPolicy onAccept={() => {
      localStorage.setItem('privacyAccepted', 'true');
      setPrivacyAccepted(true);
    }} />;
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
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/search-medicines" element={<SearchPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
