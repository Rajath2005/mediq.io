import React from 'react';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import '../styles/SearchPage.css';
import { FaLeaf, FaSearchPlus, FaBookMedical } from 'react-icons/fa';

const SearchPage = () => {
  return (
    <div className="search-page">
      <div className="search-container">
        <h1 className="search-title">Discover Ayurvedic Medicines</h1>
        <p className="search-subtitle">
          Explore the ancient wisdom of Ayurveda with our comprehensive medicine database
        </p>
        
        <div className="search-box-container">
          <SearchBar />
          <Button
            className="search-button"
            type="submit"
            data-form-btn
            text="Search Medicines"
          />
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <FaLeaf className="feature-icon" />
            <h3>Natural Remedies</h3>
            <p>Access traditional herbal medicines and their benefits</p>
          </div>
          <div className="feature-card">
            <FaSearchPlus className="feature-icon" />
            <h3>Detailed Information</h3>
            <p>Get comprehensive details about ingredients and uses</p>
          </div>
          <div className="feature-card">
            <FaBookMedical className="feature-icon" />
            <h3>Expert Insights</h3>
            <p>Learn from authenticated Ayurvedic sources</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
