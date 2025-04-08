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

import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <Router>
          <div>
            <Navbar />

            <Routes>
              <Route 
                path="/" 
                element={
                  <>
                    <Hero />
                    <ServicesSection />
                  </>
                } 
              />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book-appointment" element={<BookAppointment />} /> {/* ✅ New route */}
              <Route path="/search-medicines" element={<SearchPage />} />
            </Routes>

            <Footer />
          </div>
        </Router>
      )}
    </>
  );
};

export default App;
