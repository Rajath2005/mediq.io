import React, { useState, useEffect } from "react";
import './Hero.css';
import 'animate.css';
import heroImage from './images/hero.jpeg';
import { Link } from "react-router-dom";
import Button from '../components/Button';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [remedies, setRemedies] = useState([]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch remedies on mount
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Sanath00007/ayurveda-api/main/ayur-med.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); // Debug log
        setRemedies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching remedies:", err);
        setResult("Error fetching data.");
        setLoading(false);
      });
  }, []);

  // Search logic
  useEffect(() => {
    if (!searchTerm.trim() || !remedies.length) {
      setResult("");
      return;
    }

    try {
      const matches = remedies.filter((item) => {
        if (!item || typeof item !== 'object') return false;
        
        return (
          (item.name_of_medicine && 
            item.name_of_medicine.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.main_indications && 
            item.main_indications.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });

      if (matches.length > 0) {
        const resultText = matches.map(match => (
          `<div class="search-results-card">
            <div class="medicine-name">${match.name_of_medicine || 'N/A'}</div>
            <div class="medicine-details">
              <strong>Indications:</strong> ${match.main_indications || 'N/A'}<br>
              <strong>Dose:</strong> ${match.dose || 'N/A'}<br>
              <strong>Class:</strong> ${match.class || 'N/A'}<br>
              <strong>Reference:</strong> ${match.reference_text || 'N/A'}<br>
              <strong>Pack Size:</strong> ${match.dispensing_pack_size || 'N/A'}
            </div>
          </div>`
        )).join('');
        setResult(resultText);
      } else {
        setResult("No medicines found.");
      }
    } catch (error) {
      console.error("Search error:", error);
      setResult("Error processing search.");
    }
  }, [searchTerm, remedies]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
              onChange={handleInputChange}
              className="search-bar"
            />
            {loading ? (
              <div className="search-results">Loading medicines...</div>
            ) : (
              result && (
                <div 
                  className="search-results animate__animated animate__fadeIn"
                  dangerouslySetInnerHTML={{ __html: result }}
                />
              )
            )}
          </div>
          <div className="button-container d-flex gap-4 mt-4 animate__animated animate__fadeInUp animate__delay-2s">
            <Link to="/login">
              <Button
                className="contact-submit-button"
                type="button"
                data-form-btn
                text="Login"
              />
            </Link>
            <Link to="/signup">
              <Button
                className="contact-submit-button"
                type="button"
                data-form-btn
                text="Signup"
              />
            </Link>
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
