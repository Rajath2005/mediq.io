import React, { useState, useEffect } from 'react';
import './SearchPage.css';
import 'animate.css';
import { FaLeaf, FaSearch, FaImage, FaExclamationTriangle, FaFire, FaSun, FaMoon, FaPrescriptionBottleAlt, FaBookOpen, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from "../hooks/useDocumentTitle";


const SearchPage = () => {
  useDocumentTitle('Find Ayurvedic Medicines - Natural Healing | MediQ');

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [remedies, setRemedies] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // Update the image base URL to point to the correct GitHub repository raw path
  const imageBaseUrl = "https://raw.githubusercontent.com/Sanath00007/ayurveda-api/main/";

  // Define supported image extensions
  const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

  // Fetch remedies from GitHub
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    setDataError(null);

    fetch("https://raw.githubusercontent.com/Sanath00007/ayurveda-api/refs/heads/main/ayur-med-updated.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRemedies(data);
          setIsLoading(false);
        } else {
          setDataError("Received data is not in the expected format (array).");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching remedies:", err);
        setDataError("Error fetching data: " + err.message);
        setIsLoading(false);
      });
  };

  // Modified getImageUrl function to handle API image paths correctly
  const getImageUrl = (medicine) => {
    if (!medicine) return null;

    if (medicine.images && medicine.images.trim() !== '') {
      return `${imageBaseUrl}${medicine.images}`;
    }

    const formattedName = medicine.name_of_medicine?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/\/{2,}/g, '/');

    if (!formattedName) return null;

    const possibleUrls = IMAGE_EXTENSIONS.map(ext =>
      `${imageBaseUrl}images/${formattedName}.${ext}`
    );

    return possibleUrls[0];
  };

  const handleImageError = (medicineName) => {
    setImageErrors(prev => ({ ...prev, [medicineName]: true }));
  };

  const normalize = (str) => {
    if (!str) return "";
    return str.toLowerCase().replace(/\s+/g, " ").trim();
  };

  const findSimilarMedicines = (searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) return [];

    const normalizedSearch = normalize(searchTerm);

    const similar = remedies
      .filter(item => {
        const name = normalize(item.name_of_medicine);
        const synonyms = normalize(item.synonyms);
        return name.includes(normalizedSearch.substring(0, 3)) ||
          normalizedSearch.includes(name.substring(0, 3)) ||
          synonyms.includes(normalizedSearch.substring(0, 3));
      })
      .map(item => item.name_of_medicine)
      .slice(0, 5);

    return [...new Set(similar)];
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setResults([]);
      setRecommendations([]);
      return;
    }

    if (remedies.length === 0) {
      if (isLoading) {
        setResults([{ error: "Data is still loading. Please wait." }]);
      } else {
        setResults([{ error: "No data available. Try refreshing the page." }]);
      }
      return;
    }

    const lowerSearch = normalize(searchTerm);

    const matches = remedies.filter((item) => {
      const medicineName = normalize(item.name_of_medicine);
      const synonyms = normalize(item.synonyms);
      const indications = normalize(item.main_indications);
      const sanskritIndications = normalize(item.main_indications_sanskrit);

      return medicineName.includes(lowerSearch) ||
        synonyms.includes(lowerSearch) ||
        indications.includes(lowerSearch) ||
        sanskritIndications.includes(lowerSearch);
    });

    if (matches.length === 0) {
      const similarMedicines = findSimilarMedicines(searchTerm);
      setRecommendations(similarMedicines);
    } else {
      setRecommendations([]);
    }

    setImageErrors({});
    setResults(matches.length > 0 ? matches : [{ error: "No remedy found for '" + searchTerm + "'." }]);
  };

  const handleRecommendationClick = (medicine) => {
    setSearchTerm(medicine);
    const matches = remedies.filter((item) => {
      return normalize(item.name_of_medicine) === normalize(medicine);
    });
    setImageErrors({});
    setResults(matches);
    setRecommendations([]);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 2) {
      const similarMedicines = findSimilarMedicines(value);
      setRecommendations(similarMedicines);
    } else {
      setRecommendations([]);
    }
  };

  const handleRetry = () => {
    fetchData();
  };

  return (
    <div className="search-page">
      <div className="search-nav-header animate__animated animate__fadeInDown">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <h1 className="page-brand">Ayurvedic Medicine Database</h1>
      </div>

      <div className="search-container animate__animated animate__fadeInUp">
        <div className="search-hero">
          <h2 className="search-heading">
            <span className="highlight-text">Ayurvedic Medicines</span>
          </h2>
          <p className="search-subheading">
            Search through our extensive collection of authentic Ayurvedic formulations
          </p>

          <div className={`search-input-wrapper ${searchFocus ? 'focused' : ''}`}>
            <FaSearch className="search-icon-input" />
            <input
              type="text"
              placeholder="Search for medicines (e.g. Aravindasava, Amritarishta)..."
              className="main-search-input"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              className="main-search-btn"
              onClick={handleSearch}
              disabled={isLoading}
            >
              Search
            </button>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="recommendations-wrapper animate__animated animate__fadeIn">
              <span className="rec-label">Suggestions:</span>
              <div className="rec-tags">
                {recommendations.map((medicine, index) => (
                  <button
                    key={index}
                    className="rec-tag"
                    onClick={() => handleRecommendationClick(medicine)}
                  >
                    {medicine}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {isLoading && (
          <div className="status-message loading">
            <div className="loader"></div>
            <span>Loading database...</span>
          </div>
        )}

        {dataError && (
          <div className="status-message error">
            <FaExclamationTriangle />
            <span>{dataError}</span>
            <button onClick={handleRetry} className="retry-link">Retry</button>
          </div>
        )}

        {/* Results Grid */}
        <div className="results-grid">
          {results.map((item, index) => (
            <div
              key={index}
              className={`medicine-result-card animate__animated ${item.error ? 'animate__shakeX' : 'animate__fadeInUp'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.error ? (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3>No matches found</h3>
                  <p>{item.error}</p>
                </div>
              ) : (
                <>
                  <div className="card-visual">
                    {!imageErrors[item.name_of_medicine] ? (
                      <img
                        src={getImageUrl(item)}
                        alt={item.name_of_medicine}
                        className="medicine-img-cover"
                        onError={() => handleImageError(item.name_of_medicine)}
                      />
                    ) : (
                      <div className="medicine-img-fallback">
                        <FaImage />
                        <span>No Image</span>
                      </div>
                    )}
                    <div className="card-badges-overlay">
                      <span className="badge-pill class-badge">Class {item.class || "A"}</span>
                      <span className="badge-pill form-badge">{item.form || "Medicine"}</span>
                    </div>
                  </div>

                  <div className="card-info">
                    <div className="card-header">
                      <h3 className="med-title">{item.name_of_medicine}</h3>
                      {item.synonyms && <p className="med-subtitle">{item.synonyms}</p>}
                    </div>

                    <div className="card-body-content">
                      <div className="info-section indications">
                        <h4 className="info-label"><FaCheckCircle className="icon-sm" /> Indications</h4>
                        <p className="info-val primary">{item.main_indications}</p>
                        {item.main_indications_sanskrit && (
                          <p className="info-val sanskrit">{item.main_indications_sanskrit}</p>
                        )}
                      </div>

                      <div className="props-grid">
                        <div className="prop-box">
                          <FaFire className="prop-icon virya" />
                          <span className="prop-name">Virya</span>
                          <span className="prop-val">{item.virya || "-"}</span>
                        </div>
                        <div className="prop-box">
                          <FaSun className="prop-icon vipaka" />
                          <span className="prop-name">Vipaka</span>
                          <span className="prop-val">{item.vipaka || "-"}</span>
                        </div>
                        <div className="prop-box">
                          <FaMoon className="prop-icon dosha" />
                          <span className="prop-name">Dosha</span>
                          <span className="prop-val">{item.dosha_action || "-"}</span>
                        </div>
                      </div>

                      <div className="info-section ingredients">
                        <h4 className="info-label"><FaLeaf className="icon-sm" /> Key Ingredients</h4>
                        <div className="tags-cloud">
                          {item.key_ingredients && item.key_ingredients.slice(0, 5).map((ing, i) => (
                            <span key={i} className="tag-pill">{ing}</span>
                          ))}
                          {item.key_ingredients && item.key_ingredients.length > 5 && (
                            <span className="tag-pill more">+{item.key_ingredients.length - 5} more</span>
                          )}
                        </div>
                      </div>

                      <div className="info-row-dual">
                        <div className="info-col">
                          <h4 className="info-label"><FaPrescriptionBottleAlt className="icon-sm" /> Standard Dosage</h4>
                          <p className="info-val">{item.dose || "As directed"}</p>
                        </div>
                        <div className="info-col">
                          <h4 className="info-label"><FaBookOpen className="icon-sm" /> Reference</h4>
                          <p className="info-val small">{item.classical_reference || item.reference_text || "Classical Text"}</p>
                        </div>
                      </div>

                      {/* Expandable details could go here, but keeping it clean for now */}
                      <div className="card-footer-note">
                        <FaExclamationTriangle className="warning-icon" />
                        <div className="disclaimer-text">
                          <p className="admin-advice">{item.administration_advice}</p>
                          <p className="medical-disclaimer">
                            <strong>Disclaimer:</strong> Dosage mentioned is for adults. Consult a physician for children, pregnancy, or specific conditions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
