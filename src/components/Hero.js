import React, { useState, useEffect } from "react";
import './Hero.css';
import 'animate.css';
import heroImage from './images/hero.jpeg';
import { Link } from "react-router-dom";
import Button from '../components/Button';
import { FaSearch, FaImage } from "react-icons/fa";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [remedies, setRemedies] = useState([]);
  const [results, setResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchFocus, setSearchFocus] = useState(false);
  const [hoveredTag, setHoveredTag] = useState(null);

  // Update imageBaseUrl to point to the correct repository path
  const imageBaseUrl = "https://raw.githubusercontent.com/Sanath00007/ayurveda-api/main/images/";

  // Modified getImageUrl function with better fallback handling
  const getImageUrl = (medicine) => {
    if (!medicine) return null;
    
    // If the medicine object has an image property that includes the full path
    if (medicine.image && medicine.image.startsWith('http')) {
      return medicine.image;
    }
    
    // If the medicine object has an image property without full path
    if (medicine.image) {
      return `${imageBaseUrl}${medicine.image}`;
    }
    
    // Fallback: construct URL from medicine name
    const formattedName = medicine.name_of_medicine?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, ''); // Remove special characters
    
    return `${imageBaseUrl}${formattedName}.jpg`;
  };

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Sanath00007/ayurveda-api/main/ayur-med.json")
      .then((res) => res.json())
      .then((data) => {
        setRemedies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching remedies:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Prefetch and validate images when results change
    results.forEach(item => {
      if (!item.error) {
        const img = new Image();
        img.src = getImageUrl(item);
        img.onerror = () => {
          setImageErrors(prev => ({
            ...prev,
            [item.name_of_medicine]: true
          }));
        };
      }
    });
  }, [results]);

  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, " ").trim() || "";

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setResults([]);
      setRecommendations([]);
      return;
    }

    const term = normalize(searchTerm);
    const matches = remedies.filter((item) =>
      normalize(item.name_of_medicine).includes(term)
    );

    if (matches.length > 0) {
      setResults(matches);
      setRecommendations([]);
      setImageErrors({});
    } else {
      const suggestions = findSimilarMedicines(searchTerm);
      setResults([{ error: `No remedy found for "${searchTerm}".` }]);
      setRecommendations(suggestions);
    }
  };

  const findSimilarMedicines = (term) => {
    const base = normalize(term).substring(0, 3);
    return remedies
      .filter((item) => normalize(item.name_of_medicine).includes(base))
      .map((item) => item.name_of_medicine)
      .filter((v, i, a) => a.indexOf(v) === i) // unique
      .slice(0, 5);
  };

  const handleRecommendationClick = (medicine) => {
    setSearchTerm(medicine);
    const match = remedies.filter((item) =>
      normalize(item.name_of_medicine) === normalize(medicine)
    );
    setResults(match);
    setRecommendations([]);
    setImageErrors({});
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
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                if (value.length >= 2) {
                  setRecommendations(findSimilarMedicines(value));
                } else {
                  setRecommendations([]);
                }
              }}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="search-bar"
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: searchFocus ? '0 0 0 2px rgba(108, 92, 231, 0.2)' : 'none',
                transition: 'all 0.3s ease'
              }}
            />
            <button className="search-button" onClick={handleSearch}>
              <FaSearch /> Search
            </button>

            {/* 💡 Suggestions */}
            {recommendations.length > 0 && (
              <div className="recommendations-container">
                <p className="recommendation-header">Suggestions:</p>
                <div className="recommendation-tags">
                  {recommendations.map((med, index) => (
                    <span
                      key={index}
                      onClick={() => handleRecommendationClick(med)}
                      onMouseEnter={() => setHoveredTag(index)}
                      onMouseLeave={() => setHoveredTag(null)}
                      className="recommendation-tag"
                      style={{
                        backgroundColor:
                          hoveredTag === index ? '#5649c0' : '#6c5ce7',
                        transform: hoveredTag === index ? 'translateY(-2px)' : 'none',
                      }}
                    >
                      {med}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Results */}
          {!loading && results.length > 0 && (
            <div className="search-results animate__animated animate__fadeIn">
              {results.map((item, index) =>
                item.error ? (
                  <p key={index} className="text-danger">{item.error}</p>
                ) : (
                  <div key={index} className="search-results-card">
                    <h3 className="medicine-name">{item.name_of_medicine}</h3>
                    {!imageErrors[item.name_of_medicine] ? (
                      <img
                        src={getImageUrl(item)}
                        alt={item.name_of_medicine}
                        className="medicine-image"
                        onError={(e) => {
                          setImageErrors((prev) => ({
                            ...prev,
                            [item.name_of_medicine]: true
                          }));
                          // Optionally set a fallback image
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="fallback-image">
                        <FaImage size={32} />
                        <span>Image not available</span>
                      </div>
                    )}
                    <p><strong>Indications:</strong> {item.main_indications}</p>
                    <p><strong>Dose:</strong> {item.dose}</p>
                    <p><strong>Pack Size:</strong> {item.dispensing_pack_size}</p>
                    <p><strong>Class:</strong> {item.class}</p>
                    <p><strong>Reference:</strong> {item.reference_text}</p>
                  </div>
                )
              )}
            </div>
          )}

          <div className="button-container d-flex gap-4 mt-4 animate__animated animate__fadeInUp animate__delay-2s">
            <Link to="/login">
              <Button className="contact-submit-button" type="button" text="Login" />
            </Link>
            <Link to="/signup">
              <Button className="contact-submit-button" type="button" text="Signup" />
            </Link>
          </div>
        </div>

        <div className="hero-right animate__animated animate__fadeInRight animate__delay-1s">
          <img src={heroImage} alt="Ayurvedic Medicines" className="hero-image" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
