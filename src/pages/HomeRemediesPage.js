import React, { useState, useEffect } from 'react';
import './HomeRemediesPage.css';
import useDocumentTitle from "../hooks/useDocumentTitle";

import { 
  FaLeaf, 
  FaSearchPlus, 
  FaBookMedical, 
  FaSearch, 
  FaInfoCircle, 
  FaChevronRight,
  FaHistory,
  FaStar
} from 'react-icons/fa';

const HomeRemediesPage = () => {
  useDocumentTitle('Explore Home Remedies - Safe & Simple Cures | MediQ');

  const [searchTerm, setSearchTerm] = useState('');
  const [remedies, setRemedies] = useState([]);
  const [results, setResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recentSearches, setRecentSearches] = useState([]);

  // Common conditions to recommend if no search term
  const commonConditions = [
    'Headache', 'Common Cold', 'Fever', 'Cough', 'Sore Throat', 
    'Upset Stomach', 'Allergies', 'Insomnia'
  ];

  useEffect(() => {
    setIsLoading(true);
    fetch('https://raw.githubusercontent.com/sanath00007/ayurveda-api/main/remedies.json')
      .then(res => res.json())
      .then(data => {
        setRemedies(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching remedies:', err);
        setResults([{ error: 'Error fetching data. Please try again later.' }]);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      
      // Show recommendations based on common conditions
      const randomRecommendations = [...commonConditions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      
      setRecommendations(
        remedies.filter(item => 
          randomRecommendations.some(condition => 
            item.condition.toLowerCase().includes(condition.toLowerCase())
          )
        )
      );
      return;
    }

    // Find exact or partial matches
    const exactMatch = remedies.find(item =>
      item.condition.toLowerCase() === searchTerm.toLowerCase()
    );
    
    const partialMatches = remedies.filter(item =>
      item.condition.toLowerCase().includes(searchTerm.toLowerCase()) &&
      item.condition.toLowerCase() !== searchTerm.toLowerCase()
    );

    if (exactMatch) {
      setResults([exactMatch]);
      
      // Add to recent searches if not already there
      if (!recentSearches.includes(exactMatch.condition)) {
        const updatedSearches = [exactMatch.condition, ...recentSearches].slice(0, 5);
        setRecentSearches(updatedSearches);
      }
      
      // Find similar remedies for recommendations
      const recommendations = remedies
        .filter(item => 
          item.condition !== exactMatch.condition && 
          (item.remedy.toLowerCase().includes(exactMatch.remedy.split(' ')[0].toLowerCase()) ||
           exactMatch.remedy.toLowerCase().includes(item.remedy.split(' ')[0].toLowerCase()))
        )
        .slice(0, 3);
      
      setRecommendations(recommendations);
    } else if (partialMatches.length > 0) {
      setResults(partialMatches.slice(0, 3));
      setRecommendations([]);
    } else {
      setResults([{ error: 'No remedy found for this condition.' }]);
      
      // Show spelling suggestions or similar conditions
      const suggestions = remedies
        .filter(item => {
          const words = searchTerm.toLowerCase().split(' ');
          return words.some(word => 
            word.length > 3 && 
            item.condition.toLowerCase().includes(word.substring(0, Math.floor(word.length * 0.7)))
          );
        })
        .slice(0, 3);
      
      setRecommendations(suggestions);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, remedies]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRecommendationClick = (condition) => {
    setSearchTerm(condition);
  };

  const handleRecentSearchClick = (condition) => {
    setSearchTerm(condition);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="improved-home-remedies-page">
      <div className="page-header">
        <h1><FaLeaf className="header-icon" /> Natural Home Remedies</h1>
        <p>Discover ancient wisdom for modern wellness</p>
      </div>

      {/* Disclaimer moved to top for visibility */}
      <div className="global-disclaimer">
        <FaInfoCircle className="disclaimer-icon" />
        <div>
          <h3>Medical Disclaimer</h3>
          <p>These remedies are based on traditional practices and should not replace professional medical advice. Always consult a healthcare professional before trying any remedy, especially for serious conditions.</p>
        </div>
      </div>

      <div className="main-content">
        <div className="search-panel">
          <div className="search-container">
            <div className="search-header">
              <h2><FaSearch /> Find a Remedy</h2>
              <p>Search by condition or symptoms</p>
            </div>
            
            <div className="search-input-container">
              <input
                type="text"
                placeholder="E.g., headache, cough, upset stomach..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              {searchTerm && (
                <button className="clear-button" onClick={clearSearch}>
                  ×
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="loading-indicator">
                <div className="spinner"></div>
                <p>Loading remedies...</p>
              </div>
            ) : (
              <>
                {searchTerm.trim() === '' && recentSearches.length > 0 && (
                  <div className="recent-searches">
                    <h3><FaHistory /> Recent Searches</h3>
                    <div className="recent-search-tags">
                      {recentSearches.map((term, index) => (
                        <span 
                          key={index} 
                          className="recent-search-tag"
                          onClick={() => handleRecentSearchClick(term)}
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {results.length > 0 ? (
                  <div className="results">
                    {results.map((item, index) => (
                      <div key={index} className={`result-card ${item.error ? 'error-card' : ''}`}>
                        {item.error ? (
                          <div className="error-message">
                            <FaInfoCircle /> 
                            <p>{item.error}</p>
                          </div>
                        ) : (
                          <>
                            <div className="result-header">
                              <h3>{item.condition}</h3>
                              <span className="category-tag">Ayurvedic</span>
                            </div>
                            <div className="remedy-content">
                              <h4>Remedy</h4>
                              <p>{item.remedy}</p>
                            </div>
                            {item.instructions && (
                              <div className="instructions">
                                <h4>Instructions</h4>
                                <p>{item.instructions}</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : null}

                {recommendations.length > 0 && (
                  <div className="recommendations">
                    <h3>
                      {searchTerm ? 'You might also be interested in' : 'Common remedies'}
                    </h3>
                    <div className="recommendation-cards">
                      {recommendations.map((item, index) => (
                        <div 
                          key={index} 
                          className="recommendation-card"
                          onClick={() => handleRecommendationClick(item.condition)}
                        >
                          <div className="recommendation-header">
                            <FaLeaf className="recommendation-icon" />
                            <h4>{item.condition}</h4>
                          </div>
                          <p className="recommendation-preview">
                            {item.remedy.substring(0, 60)}...
                          </p>
                          <button className="view-more-btn">
                            View Remedy <FaChevronRight />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="top-remedies">
            <h3><FaStar /> Popular Remedies</h3>
            <ul className="top-remedies-list">
              {commonConditions.map((condition, index) => (
                <li key={index} onClick={() => handleRecommendationClick(condition)}>
                  <FaLeaf className="list-icon" /> {condition}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="info-section">
          <div className="features">
            <div className="feature">
              <FaLeaf className="feature-icon" />
              <div>
                <h4>Natural Healing</h4>
                <p>Explore safe, time-tested herbal remedies from ancient medical traditions.</p>
              </div>
            </div>
            
            <div className="feature">
              <FaSearchPlus className="feature-icon" />
              <div>
                <h4>Quick Search</h4>
                <p>Find remedies instantly by typing your symptoms or condition.</p>
              </div>
            </div>
            
            <div className="feature">
              <FaBookMedical className="feature-icon" />
              <div>
                <h4>Ancient Wisdom</h4>
                <p>Access knowledge rooted in centuries-old Ayurvedic texts and practices.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRemediesPage;
