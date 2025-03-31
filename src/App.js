import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import './App.css';
import ServicesSection from './components/ServicesSection';

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <ServicesSection />
      <Footer />
    </div>
  );
};

export default App;
