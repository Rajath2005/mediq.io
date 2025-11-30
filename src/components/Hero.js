import React, { useState, useEffect, useCallback } from "react";
import './Hero.css';
import { motion } from "framer-motion";
import heroImage from './images/hero.jpeg';
import { Link } from "react-router-dom";
import Button from '../components/Button';
import { FaSearch, FaImage, FaLeaf, FaFlask, FaHeart, FaBookMedical, FaExclamationTriangle, FaMortarPestle, FaFire, FaSun, FaMoon, FaCheckCircle, FaPrescriptionBottleAlt, FaBookOpen } from "react-icons/fa";
import { useAuth } from '../contexts/AuthContext';
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Helmet } from 'react-helmet-async';

const HeroSection = () => {
  useDocumentTitle('AyuDost 🌿- Your Digital Healthcare Companion');

  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [remedies, setRemedies] = useState([]);
  const [results, setResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchFocus, setSearchFocus] = useState(false);
  const [hoveredTag, setHoveredTag] = useState(null);


  const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];
  const imageBaseUrl = "https://raw.githubusercontent.com/Sanath00007/ayurveda-api/main/";


  const getImageUrl = (medicine) => {
    if (!medicine) return null;

    let imagePath = null;

    if (medicine.images && medicine.images.trim() !== '') {
      imagePath = medicine.images.trim();
    } else if (medicine.image && medicine.image.trim() !== '') {
      imagePath = medicine.image.trim();
    }

    if (imagePath) {
      // Remove any leading slashes to prevent double slashes
      imagePath = imagePath.replace(/^\/+/, '');
      const fullUrl = `${imageBaseUrl}${imagePath}`;
      return fullUrl;
    }

    const formattedName = medicine.name_of_medicine?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/\/{2,}/g, '/');

    if (!formattedName) return null;

    const possiblePaths = [
      'images',
      'assets/images',
      'public/images',
      'src/images'
    ];

    const possibleUrls = possiblePaths.flatMap(path =>
      IMAGE_EXTENSIONS.map(ext =>
        `${imageBaseUrl}${path}/${formattedName}.${ext}`
      )
    );

    return possibleUrls[0];
  };

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Sanath00007/ayurveda-api/refs/heads/main/ayur-med-updated.json")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Clean the data
          const cleanedData = data.map(item => {
            const cleanedItem = { ...item };
            // Remove newlines and trim spaces from string fields
            Object.keys(cleanedItem).forEach(key => {
              if (typeof cleanedItem[key] === 'string') {
                cleanedItem[key] = cleanedItem[key].replace(/\r?\n|\r/g, ' ').replace(/\s+/g, ' ').trim();
              }
            });
            return cleanedItem;
          });
          setRemedies(cleanedData);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching remedies:", err);
        setLoading(false);
      });
  }, []);

  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, " ").trim() || "";

  const handleSearch = async (e, exactMatch = false) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!searchTerm.trim()) {
      setResults([]);
      setRecommendations([]);
      return;
    }

    setLoading(true);
    setResults([]); // Clear previous results immediately

    try {
      const term = normalize(searchTerm);

      // Local Search
      const matches = remedies.filter((item) => {
        const medicineName = normalize(item.name_of_medicine);
        const synonyms = normalize(item.synonyms);

        if (exactMatch) {
          return medicineName === term;
        }

        const indications = normalize(item.main_indications);
        const medicineClass = normalize(item.class);

        return (
          medicineName.includes(term) ||
          synonyms?.includes(term) ||
          indications?.includes(term) ||
          medicineClass?.includes(term)
        );
      });

      if (matches.length > 0) {
        setResults(matches);
        setRecommendations([]);
        setImageErrors({});
      } else {
        const suggestions = findSimilarMedicines(searchTerm);
        setResults([{
          error: `No remedy found for "${searchTerm}". ${suggestions.length > 0 ? 'Check the suggestions below.' : ''}`
        }]);
        setRecommendations(suggestions);
      }
      setLoading(false);
    } catch (error) {
      console.error('Search error:', error);
      setResults([{ error: 'An error occurred while searching. Please try again.' }]);
      setLoading(false);
    }
  };

  const findSimilarMedicines = useCallback((term) => {
    if (!term || term.length < 2) return [];

    const searchTerm = normalize(term);

    return remedies
      .filter(item => {
        const name = normalize(item.name_of_medicine);
        const indications = normalize(item.main_indications);

        return (
          name.includes(searchTerm.substring(0, 3)) ||
          searchTerm.includes(name.substring(0, 3)) ||
          indications?.includes(searchTerm.substring(0, 3))
        );
      })
      .map(item => item.name_of_medicine)
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 5);
  }, [remedies]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Only update recommendations, not search results
      if (searchTerm.length >= 2) {
        const suggestions = findSimilarMedicines(searchTerm);
        setRecommendations(suggestions);
      } else {
        setRecommendations([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, findSimilarMedicines]); // Add findSimilarMedicines as dependency

  return (
    <>
      <Helmet>
        <title>Home - AyuDost</title>
        <meta name="description" content="Get in touch with AyuDost for Ayurvedic consultations,Ayurvedic Medicienes ,Home Remedies emergency support, and general inquiries." />
        <meta name="keywords" content="Ayurvedic contact, AyuDost contact, AyuDost support, health app support" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://rajath2005.github.io/mediq.io/" />
      </Helmet>
      <div className="hero-section">
        <div className="hero-container">
          <div className="hero-left">
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Your Journey to Natural Wellness Starts Here
            </motion.h1>
            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover the ancient wisdom of Ayurveda combined with modern science.
              Find the perfect natural remedies for your well-being.
            </motion.p>

            <motion.div
              className="search-bar-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <input
                type="text"
                placeholder="Search for Ayurvedic medicines..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  // Recommendations will be handled by the useEffect
                }}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(e);
                  }
                }}
                className="search-bar"
              />
              <motion.button
                className="search-button"
                onClick={(e) => handleSearch(e)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSearch /> Search
              </motion.button>

              {/* Show recommendations while typing */}
              {recommendations.length > 0 && (
                <div className="recommendations-container">
                  <p className="recommendation-header">Suggestions:</p>
                  <div className="recommendation-tags">
                    {recommendations.map((med, index) => (
                      <span
                        key={index}
                        onClick={() => {
                          setSearchTerm(med);
                          setRecommendations([]);
                          handleSearch(null, true); // Pass true for exact match when clicking recommendation
                        }}
                        onMouseEnter={() => setHoveredTag(index)}
                        onMouseLeave={() => setHoveredTag(null)}
                        className="recommendation-tag"
                      >
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Loading State */}
            {loading && (
              <div className="search-loading">
                <div className="spinner"></div>
                <p>Searching...</p>
              </div>
            )}

            {/* Only show results after searching */}
            {!loading && results.length > 0 && (
              <motion.div
                className="search-results-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {results.map((item, index) =>
                  item.error ? (
                    <div key={index} className="error-card">
                      <p className="text-danger">{item.error}</p>
                    </div>
                  ) : (
                    <motion.div
                      key={index}
                      className="hero-result-card"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="hero-card-main">
                        <div className="hero-card-image-col">
                          {!imageErrors[item.name_of_medicine] ? (
                            <img
                              src={getImageUrl(item)}
                              alt={item.name_of_medicine}
                              className="hero-med-img"
                              onError={() =>
                                setImageErrors((prev) => ({
                                  ...prev,
                                  [item.name_of_medicine]: true,
                                }))
                              }
                            />
                          ) : (
                            <div className="hero-med-fallback">
                              <FaImage />
                            </div>
                          )}
                        </div>

                        <div className="hero-card-content-col">
                          <div className="hero-header-row">
                            <div>
                              <h3 className="hero-med-name">{item.name_of_medicine}</h3>
                              {item.synonyms && <p className="hero-med-synonyms">{item.synonyms}</p>}
                            </div>
                            <span className="hero-class-badge">{item.class || "Class A"}</span>
                          </div>

                          <div className="hero-indications-box">
                            <span className="hero-label-sm">Indications</span>
                            <p className="hero-text-primary">{item.main_indications}</p>
                            {item.main_indications_sanskrit && <p className="hero-text-sanskrit">{item.main_indications_sanskrit}</p>}
                          </div>

                          <div className="hero-props-strip">
                            <div className="hero-prop-item">
                              <FaFire className="hero-icon-xs virya" /> <span>{item.virya || "-"}</span>
                            </div>
                            <div className="hero-prop-divider"></div>
                            <div className="hero-prop-item">
                              <FaSun className="hero-icon-xs vipaka" /> <span>{item.vipaka || "-"}</span>
                            </div>
                            <div className="hero-prop-divider"></div>
                            <div className="hero-prop-item">
                              <FaMoon className="hero-icon-xs dosha" /> <span>{item.dosha_action || "-"}</span>
                            </div>
                          </div>

                          <div className="hero-ingredients-row">
                            <span className="hero-label-inline"><FaLeaf className="hero-icon-xs" /> Ingredients:</span>
                            <span className="hero-ing-list">
                              {item.key_ingredients && item.key_ingredients.slice(0, 4).join(", ")}
                              {item.key_ingredients && item.key_ingredients.length > 4 && "..."}
                            </span>
                          </div>

                          <div className="hero-footer-grid">
                            <div className="hero-footer-item">
                              <span className="hero-label-xs">Standard Dosage</span>
                              <span className="hero-val-sm">{item.dose || "As directed"}</span>
                            </div>
                            <div className="hero-footer-item">
                              <span className="hero-label-xs">Reference</span>
                              <span className="hero-val-sm">{item.classical_reference || item.reference_text || "Classical Text"}</span>
                            </div>
                          </div>

                          <div className="hero-disclaimer-box">
                            <FaExclamationTriangle className="hero-warn-icon" />
                            <div className="hero-disclaimer-content">
                              <p className="hero-advice">{item.administration_advice}</p>
                              <p className="hero-legal">Disclaimer: Dosage mentioned is for adults. Consult a physician for children, pregnancy, or specific conditions.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </motion.div>
            )}

            <motion.div
              className="button-container d-flex gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {!isAuthenticated && (
                <>
                  <Link to="/login">
                    <Button className="contact-submit-button" type="button" text="Login" />
                  </Link>
                  <Link to="/signup">
                    <Button className="contact-submit-button" type="button" text="Signup" />
                  </Link>
                </>
              )}
            </motion.div>
          </div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src={heroImage}
              alt="Ayurvedic Medicines"
              className="hero-image"
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>
    </>
  );

};

export default HeroSection;