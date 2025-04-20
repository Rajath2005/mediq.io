import React, { useState, useEffect } from 'react';
import '../styles/SearchPage.css';
import 'animate.css';
import { FaLeaf, FaSearchPlus, FaBookMedical } from 'react-icons/fa';

const HomeRemediesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [remedies, setRemedies] = useState([]);
  const [results, setResults] = useState([]);

  // Fetch data from GitHub remedies.json
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/sanath00007/ayurveda-api/main/remedies.json')
      .then(res => res.json())
      .then(data => setRemedies(data))
      .catch(err => {
        console.error('Error fetching remedies:', err);
        setResults([{ error: 'Error fetching data.' }]);
      });
  }, []);

  // Normalize string
  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, " ").trim();

  // Search logic on input
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    const search = normalize(searchTerm);
    const match = remedies.find(item =>
      normalize(item.condition).includes(search)
    );

    if (match) {
      setResults([match]);
    } else {
      setResults([{ error: 'No remedy found.' }]);
    }
  }, [searchTerm, remedies]);

  return (
    <div className="search-page">
      <div className="search-container animate__animated animate__fadeInUp">
        <h1 className="search-title animate__animated animate__fadeInDown animate__delay-1s">
          Search Home Remedies
        </h1>
        <p className="search-subtitle animate__animated animate__fadeIn animate__delay-2s">
          Discover natural Ayurvedic remedies for common ailments and wellness
        </p>

        {/* Search input */}
        <div className="search-box-container">
          <input
            type="text"
            placeholder="Search by condition, e.g. headache"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Result */}
        {results.length > 0 && (
          <div className="results-container">
            {results.map((item, index) => (
              <div key={index} className="flashcard">
                {item.error ? (
                  <p>{item.error}</p>
                ) : (
                  <>
                    <h3>{item.condition}</h3>
                    <p className="remedy-description"><strong>Remedy:</strong> {item.remedy}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Ayurvedic highlights */}
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
