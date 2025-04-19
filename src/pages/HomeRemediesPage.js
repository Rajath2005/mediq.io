import React from 'react';
import '../styles/SearchPage.css';
import 'animate.css';
import { FaLeaf, FaSearchPlus, FaBookMedical } from 'react-icons/fa';
import SearchBar from '../components/SearchBar'; // This includes the fetch + flashcard

const HomeRemediesPage = () => {
  const handleSearch = (term) => {
    console.log("Searched term:", term);
    // You can handle analytics or suggestions here
  };

  return (
    <div className="search-page">
      <div className="search-container animate__animated animate__fadeInUp">
        <h1 className="search-title animate__animated animate__fadeInDown animate__delay-1s">
          Search Home Remedies
        </h1>
        <p className="search-subtitle animate__animated animate__fadeIn animate__delay-2s">
          Discover natural Ayurvedic remedies for common ailments and wellness
        </p>

        {/* Search bar with live remedy result */}
        <div className="search-box-container">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Optional: Ayurvedic Feature Highlights */}
        <div className="features-grid">
          <div className="feature-card animate__animated animate__fadeInUp animate__delay-3s">
            <FaLeaf className="feature-icon" />
            <h3>Natural Healing</h3>
            <p>Explore safe, time-tested herbal remedies.</p>
          </div>
          <div className="feature-card animate__animated animate__fadeInUp animate__delay-4s">
            <FaSearchPlus className="feature-icon" />
            <h3>Quick Search</h3>
            <p>Find remedies by just typing your symptoms.</p>
          </div>
          <div className="feature-card animate__animated animate__fadeInUp animate__delay-5s">
            <FaBookMedical className="feature-icon" />
            <h3>Ancient Wisdom</h3>
            <p>Rooted in centuries-old Ayurvedic texts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRemediesPage;
