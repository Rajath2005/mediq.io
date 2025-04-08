import React, { useState } from "react";
import './Hero.css';
import 'animate.css';
import heroImage from './images/hero.jpeg';
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="hero-section">
      <div className="hero-container">
        <div className="hero-left">
          <h1 className="hero-title animate__animated animate__fadeInDown">
            Your Journey to Natural Wellness Starts Here
          </h1>
          <p className="hero-description animate__animated animate__fadeInUp animate__delay-1s">
            Discover the ancient wisdom of Ayurveda combined with modern science. 
            Find the perfect natural remedies for your well-being.
          </p>
          <div className="search-bar-container animate__animated animate__fadeIn animate__delay-1s">
            <input
              type="text"
              placeholder="Search for Ayurvedic medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
          </div>
          <div className="button-container animate__animated animate__fadeInUp animate__delay-2s">
            <Link to="/login" className="button button-login">Login</Link>
            <Link to="/signup" className="button button-signup">Sign Up</Link>
          </div>
        </div>
        
        <div className="hero-right animate__animated animate__fadeInRight animate__delay-1s">
          <img 
            src={heroImage}  
            alt="Ayurvedic Medicines" 
            className="hero-image"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
