import React, { useState } from "react";
import './Hero.css';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const medicines = ["Ashwagandha", "Brahmi", "Tulsi", "Neem", "Triphala"];

  return (
    <div className="hero-section">
      <div className="hero-container">
        <div className="hero-left">
          <h1 className="hero-title">Your Journey to Natural Wellness Starts Here</h1>
          <p className="hero-description">
            Discover the ancient wisdom of Ayurveda combined with modern science. 
            Find the perfect natural remedies for your well-being.
          </p>
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search for Ayurvedic medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
          </div>
          <div className="button-container">
            <button className="button button-login">Login</button>
            <button className="button button-signup">Sign Up</button>
          </div>
        </div>
        
        <div className="hero-right">
          <img 
            src="/path-to-your-image.jpg" 
            alt="Ayurvedic Medicines" 
            className="hero-image"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
