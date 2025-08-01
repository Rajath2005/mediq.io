import React, { useState, useEffect, useCallback } from "react";
import './Hero.css';
import 'animate.css';
import heroImage from './images/hero.jpeg';
import { Link } from "react-router-dom";
import Button from '../components/Button';
import { FaSearch, FaImage } from "react-icons/fa";
import { useAuth } from '../contexts/AuthContext';
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Helmet } from 'react-helmet-async';

const HeroSection = () => {
  useDocumentTitle('MediQ 🌿- Your Digital Healthcare Companion');

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
    

    if (medicine.images) {
      
      if (medicine.images.trim() !== '') {
        return `${imageBaseUrl}${medicine.images}`;
      }
    }

   
    if (medicine.image && medicine.image.trim() !== '') {
      return `${imageBaseUrl}${medicine.image}`;
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

  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, " ").trim() || "";

  const handleSearch = async (exactMatch = false) => {
    if (!searchTerm.trim()) {
      setResults([]);
      setRecommendations([]);
      return;
    }

    try {
      const term = normalize(searchTerm);
      
      const matches = remedies.filter((item) => {
        const medicineName = normalize(item.name_of_medicine);
        
        if (exactMatch) {
          return medicineName === term;
        }
        
        const indications = normalize(item.main_indications);
        const medicineClass = normalize(item.class);
        
        return (
          medicineName.includes(term) ||
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
          error: `No remedy found for "${searchTerm}". ${
            suggestions.length > 0 ? 'Check the suggestions below.' : ''
          }` 
        }]);
        setRecommendations(suggestions);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([{ error: 'An error occurred while searching. Please try again.' }]);
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
        <title>Home - MediQ</title>
        <meta name="description" content="Get in touch with MediQ for Ayurvedic consultations,Ayurvedic Medicienes ,Home Remedies emergency support, and general inquiries." />
        <meta name="keywords" content="Ayurvedic contact, MediQ contact, MediQ support, health app support" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://rajath2005.github.io/mediq.io/" />
      </Helmet>
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
                // Recommendations will be handled by the useEffect
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
                        handleSearch(true); // Pass true for exact match when clicking recommendation
                      }}
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

          {/* Only show results after searching */}
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
                        onError={() =>
                          setImageErrors((prev) => ({
                            ...prev,
                            [item.name_of_medicine]: true,
                          }))
                        }
                      />
                    ) : (
                      <div className="fallback-image">
                        <FaImage size={32} />
                        <span>Image not available</span>
                      </div>
                    )}
                    <div className="medicine-details">
                      <span className="medicine-label">Indications: </span>
                      <span className="medicine-indications">{item.main_indications}</span>
                    </div>
                    <div className="medicine-details">
                      <span className="medicine-label">Dose: </span>
                      <span className="medicine-dose">{item.dose}</span>
                    </div>
                    <div className="medicine-details">
                      <span className="medicine-label">Note: </span>
                      <span className="medicine-dose">
                        Dosage for adults and children: Please contact your physician.
                      </span>
                    </div>
                    <div className="medicine-details">
                      <span className="medicine-label">Pack Size: </span>
                      <span className="medicine-pack-size">{item.dispensing_pack_size}</span>
                    </div>
                    <div className="medicine-details">
                      <span className="medicine-label">Class: </span>
                      <span className="medicine-class">{item.class}</span>
                    </div>
                    <div className="medicine-details">
                      <span className="medicine-label">Reference: </span>
                      <span className="medicine-reference">{item.reference_text}</span>
                    </div>
                    <div className="medical-disclaimer">
                      <p>Medical Disclaimer:
                      Ayurvedic medicines listed are based on traditional practices and are for informational use only. Consult a healthcare professional before use..</p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          <div className="button-container d-flex gap-4 mt-4 animate__animated animate__fadeInUp animate__delay-2s">
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
          </div>
        </div>

        <div className="hero-right animate__animated animate__fadeInRight animate__delay-1s">
          <img src={heroImage} alt="Ayurvedic Medicines" className="hero-image" />
        </div>
      </div>
    </div>
    </>
  );
  
};

export default HeroSection;