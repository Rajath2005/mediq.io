import React from 'react';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import '../styles/SearchPage.css';
import 'animate.css';
import { FaLeaf, FaSearchPlus, FaBookMedical } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();
  
  const handleSearch = (searchTerm) => {
    // You can implement your search logic here
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="search-page">
      <div className="mb-4 animate__animated animate__fadeInUp" style={{ position: 'absolute', left: '20px', top: '80px' }}>
          <button 
            className="btn btn-outline-success" 
            onClick={() => navigate(-1)}
          >
            Back to Home
          </button>
        </div>
      <div className="search-container animate__animated animate__fadeInUp">
        <h1 className="search-title animate__animated animate__fadeInDown animate__delay-1s">
          Discover Ayurvedic Medicines
        </h1>
        <p className="search-subtitle animate__animated animate__fadeIn animate__delay-2s">
          Explore the ancient wisdom of Ayurveda with our comprehensive medicine database
        </p>

        <div className="search-box-container">
          <SearchBar onSearch={handleSearch} />
          <Button
            className="search-button"
            type="submit"
            data-form-btn
            text="Search Medicines"
            onClick={() => handleSearch(document.querySelector('input').value)}
          />
        </div>

        <div className="features-grid">
          <div className="feature-card animate__animated animate__fadeInUp animate__delay-4s">
            <FaLeaf className="feature-icon" />
            <h3>Natural Remedies</h3>
            <p>Access traditional herbal medicines and their benefits</p>
          </div>
          <div className="feature-card animate__animated animate__fadeInUp animate__delay-5s">
            <FaSearchPlus className="feature-icon" />
            <h3>Detailed Information</h3>
            <p>Get comprehensive details about ingredients and uses</p>
          </div>
          <div className="feature-card animate__animated animate__fadeInUp animate__delay-6s">
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
