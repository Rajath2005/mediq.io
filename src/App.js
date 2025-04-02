import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './pages/About';
import './App.css';
import ServicesSection from './components/ServicesSection';
import ServicesPage from './pages/ServicesPage';
import Consultation from './pages/Consultation';
import Diagnosis from './pages/Diagnosis';
import Treatment from './pages/Treatment';
import Emergency from './pages/Emergency';
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ServicesSection />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/consultation" element={<Consultation />} />
          <Route path="/services/diagnosis" element={<Diagnosis />} />
          <Route path="/services/treatment" element={<Treatment />} />
          <Route path="/services/emergency" element={<Emergency />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
