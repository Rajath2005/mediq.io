import React, { useState } from "react";
import './Hero.css';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const medicines = ["Ashwagandha", "Brahmi", "Tulsi", "Neem", "Triphala"]; // Example data

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hero-section">
      <div className="hero-container">
        {/* Left Column */}
        <div>
          <h1>Welcome to Mediq</h1>
          <p>
            Discover the best Ayurvedic medicines for your health and wellness.
          </p>
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search for Ayurvedic medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
            {searchTerm && (
              <ul className="search-results">
                {filteredMedicines.map((medicine, index) => (
                  <li
                    key={index}
                    onClick={() => setSearchTerm(medicine)}
                  >
                    {medicine}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="button-container">
          <button className="button button-login">Login</button>
          <button className="button button-signup">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
