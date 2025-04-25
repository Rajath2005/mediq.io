import React, { useState, useEffect } from 'react';
import '../styles/SearchPage.css';
import 'animate.css';
import { FaLeaf, FaSearchPlus, FaBookMedical, FaHeart, FaFlask, FaInfoCircle, FaSearch, FaImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [remedies, setRemedies] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // Update the image base URL to point to the correct GitHub repository path
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
    
    fetch("https://raw.githubusercontent.com/Sanath00007/ayurveda-api/main/ayur-med.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text(); // Get as text first to handle JSON parsing errors
      })
      .then((textData) => {
        try {
          // Remove NaN values which aren't valid JSON
          const cleanedData = textData
            .replace(/:\s*NaN\s*,/g, ': null,')
            .replace(/:\s*NaN\s*}/g, ': null}');
          
          // Parse the cleaned JSON
          const data = JSON.parse(cleanedData);
          
          console.log("Data fetched successfully:", Array.isArray(data) ? data.length : "not an array");
          
          if (Array.isArray(data) && data.length > 0) {
            setRemedies(data);
            setIsLoading(false);
          } else {
            setDataError("Received data is not in the expected format (array).");
            setIsLoading(false);
          }
        } catch (error) {
          console.error("JSON parsing error:", error);
          setDataError("Error parsing JSON data: " + error.message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching remedies:", err);
        setDataError("Error fetching data: " + err.message);
        setIsLoading(false);
      });
  };

  // Modified getImageUrl function with better fallbacks
  const getImageUrl = (medicine) => {
    if (!medicine) return null;
    
    // If the medicine object has an image property, use it directly
    if (medicine.image) {
      // Check if the image path already includes the base URL
      if (medicine.image.startsWith('http')) {
        return medicine.image;
      }
      return `${imageBaseUrl}${medicine.image}`;
    }
    
    // Fallback: Try multiple image formats using the medicine name
    const formattedName = medicine.name_of_medicine?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, ''); // Remove any special characters

    if (!formattedName) return null;

    // Create URLs for all possible image formats
    const possibleUrls = IMAGE_EXTENSIONS.map(ext => 
      `${imageBaseUrl}images/${encodeURIComponent(formattedName)}.${ext}`
    );

    // Also try in an 'assets' subfolder
    const assetsUrls = IMAGE_EXTENSIONS.map(ext => 
      `${imageBaseUrl}assets/images/${encodeURIComponent(formattedName)}.${ext}`
    );

    // Return all possible URLs as a comma-separated string
    // The browser will try each URL until one works
    return [...possibleUrls, ...assetsUrls].join(',');
  };

  const handleImageError = (medicineName) => {
    console.error(`Image failed to load for medicine: ${medicineName}`);
    setImageErrors(prev => ({ ...prev, [medicineName]: true }));
  };

  const normalize = (str) => {
    // Handle null or undefined values safely
    if (!str) return "";
    return str.toLowerCase().replace(/\s+/g, " ").trim();
  };

  // Function to find similar medicine names for recommendations
  const findSimilarMedicines = (searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    const normalizedSearch = normalize(searchTerm);
    
    // Find medicines that contain parts of the search term
    const similar = remedies
      .filter(item => {
        const name = normalize(item.name_of_medicine);
        // Check if medicine name contains part of search or search contains part of medicine
        return name.includes(normalizedSearch.substring(0, 3)) || 
               normalizedSearch.includes(name.substring(0, 3));
      })
      .map(item => item.name_of_medicine)
      .slice(0, 5); // Limit to 5 recommendations
    
    return [...new Set(similar)]; // Remove duplicates
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setResults([]);
      setRecommendations([]);
      return;
    }

    // Check if data is loaded
    if (remedies.length === 0) {
      if (isLoading) {
        setResults([{ error: "Data is still loading. Please wait." }]);
      } else {
        setResults([{ error: "No data available. Try refreshing the page." }]);
      }
      return;
    }

    const lowerSearch = normalize(searchTerm);
    console.log("Searching for:", lowerSearch);
    
    // More flexible search - partial word matches
    const matches = remedies.filter((item) => {
      const medicineName = normalize(item.name_of_medicine);
      return medicineName.includes(lowerSearch);
    });

    console.log("Found matches:", matches.length);
    
    // Generate recommendations if no exact matches
    if (matches.length === 0) {
      const similarMedicines = findSimilarMedicines(searchTerm);
      setRecommendations(similarMedicines);
    } else {
      setRecommendations([]);
    }
    
    // Reset image errors when showing new results
    setImageErrors({});
    
    setResults(matches.length > 0 ? matches : [{ error: "No remedy found for '" + searchTerm + "'." }]);
  };

  const handleRecommendationClick = (medicine) => {
    setSearchTerm(medicine);
    
    // Filter results based on the selected recommendation
    const matches = remedies.filter((item) => {
      return normalize(item.name_of_medicine) === normalize(medicine);
    });
    
    // Reset image errors when showing new results
    setImageErrors({});
    
    setResults(matches);
    setRecommendations([]);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Show recommendations on typing if there's at least 2 characters
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

  const getRandomColor = (str) => {
    // Generate a color based on the medicine name for consistent coloring
    if (!str) return "#6c5ce7";
    const hash = str.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 65%)`;
  };

  // Added styling for the search bar
  const searchBarStyle = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: searchFocus ? '0 0 0 2px rgba(108, 92, 231, 0.2)' : 'none',
    transition: 'all 0.3s ease'
  };

  // New styling for recommendations
  const recommendationsContainerStyle = {
    marginTop: '15px',
    padding: '10px 15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
  };

  const recommendationHeaderStyle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
    fontWeight: '500'
  };

  const recommendationTagsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  };

  const recommendationTagStyle = {
    display: 'inline-block',
    padding: '6px 12px',
    backgroundColor: '#6c5ce7',
    color: 'white',
    borderRadius: '20px',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(108, 92, 231, 0.2)'
  };

  const recommendationTagHoverStyle = {
    backgroundColor: '#5649c0',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(108, 92, 231, 0.3)'
  };

  // Styling for medicine images
  const medicineImageStyle = {
    width: '100%',
    maxHeight: '200px',
    objectFit: 'contain',
    borderRadius: '8px',
    marginBottom: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  };

  const fallbackImageContainerStyle = {
    height: '200px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '15px',
    color: '#6c757d',
    flexDirection: 'column'
  };

  // State to track hovered tag
  const [hoveredTag, setHoveredTag] = useState(null);

  return (
    <div className="search-page">
      <div className="mb-3 mt-2 me-auto animate__animated animate__fadeInUp" style={{ padding: '0 20px' }}>
        <button 
          className="btn btn-outline-success" 
          onClick={() => navigate(-1)}
        >
          Back to Home
        </button>
      </div>

      <div className="search-container animate__animated animate__fadeInUp">
        <div className="search-header animate__animated animate__fadeIn">
          <h1 className="search-title animate__animated animate__fadeInDown animate__delay-1s">
            Discover Ayurvedic Medicines
          </h1>
          <p className="search-subtitle animate__animated animate__fadeIn animate__delay-2s">
            Explore the ancient wisdom of Ayurveda with our comprehensive medicine database
          </p>

          {/* Enhanced Search Bar with border */}
          <div 
            className={`search-box-container ${searchFocus ? 'focused' : ''}`}
          >
            <input
              type="text"
              placeholder="Search for Ashwagandha, Triphala, Brahmi..."
              className="search-bar"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              style={searchBarStyle}
            />
            <button 
              className={`search-button ${!isLoading && remedies.length > 0 ? 'animate' : ''}`}
              onClick={handleSearch}
              disabled={isLoading}
            >
              <FaSearch className="search-icon" /> 
              Search
            </button>
          </div>
        </div>

        {/* Data Status Indicator */}
        {isLoading && (
          <div className="alert alert-info" role="alert">
            Loading medicine database... Please wait.
          </div>
        )}
        {dataError && (
          <div className="alert alert-danger" role="alert">
            {dataError}
            <button 
              className="btn btn-sm btn-outline-danger ms-3" 
              onClick={handleRetry}
            >
              Retry
            </button>
          </div>
        )}

        {/* Improved Recommendations */}
        {recommendations.length > 0 && (
          <div 
            className="recommendations-container animate__animated animate__fadeIn"
            style={recommendationsContainerStyle}
          >
            <p style={recommendationHeaderStyle}>
              {results.length > 0 && results[0].error 
                ? "Did you mean:" 
                : "Suggestions:"}
            </p>
            <div style={recommendationTagsStyle}>
              {recommendations.map((medicine, index) => (
                <span 
                  key={index} 
                  onClick={() => handleRecommendationClick(medicine)}
                  onMouseEnter={() => setHoveredTag(index)}
                  onMouseLeave={() => setHoveredTag(null)}
                  style={{
                    ...recommendationTagStyle,
                    ...(hoveredTag === index ? recommendationTagHoverStyle : {})
                  }}
                >
                  {medicine}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className="results-container">
          {results.map((item, index) => (
            <div 
              key={index} 
              className={`flashcard animate__animated ${item.error ? 'animate__shakeX' : 'animate__zoomIn'}`}
              style={item.error ? {} : {
                borderTop: `5px solid ${getRandomColor(item.name_of_medicine)}`,
                boxShadow: `0 10px 30px rgba(0, 0, 0, 0.1)`
              }}
            >
              {item.error ? (
                <div className="error-container">
                  <FaInfoCircle className="error-icon" />
                  <p className="error-message">{item.error}</p>
                </div>
              ) : (
                <>
                  <div className="medicine-header" style={{ backgroundColor: `${getRandomColor(item.name_of_medicine)}20` }}>
                    <h2 className="medicine-name">{item.name_of_medicine}</h2>
                    <div className="medicine-class">
                      <span className="medicine-badge" style={{ backgroundColor: getRandomColor(item.name_of_medicine) }}>
                        {item.class || "Ayurvedic"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="medicine-content">
                    {/* Medicine Image */}
                    {!imageErrors[item.name_of_medicine] ? (
                      <img 
                        src={getImageUrl(item)}
                        alt={item.name_of_medicine}
                        style={medicineImageStyle}
                        onError={() => handleImageError(item.name_of_medicine)}
                        className="animate__animated animate__fadeIn"
                      />
                    ) : (
                      <div style={fallbackImageContainerStyle}>
                        <FaImage size={40} />
                        <p className="mt-2">Image not available</p>
                      </div>
                    )}
                    
                    <div className="medicine-section">
                      <h3><FaLeaf /> Indications</h3>
                      <p>{item.main_indications || "Not specified"}</p>
                    </div>
                    
                    <div className="medicine-section">
                      <h3><FaFlask /> Dosage & Administration</h3>
                      <p><strong>Dose:</strong> {item.dose || "Not specified"}</p>
                      <p><strong>Pack Size:</strong> {item.dispensing_pack_size || "Not specified"}</p>
                      <p><strong>Preferred Use:</strong> {item["preferred_use_(opd/_ipd)"] || "Not specified"}</p>
                    </div>
                    
                    <div className="medicine-section">
                      <h3><FaHeart /> Precautions</h3>
                      <p>{item["precaution/_contraindication"] || "Not specified"}</p>
                    </div>
                    
                    <div className="medicine-section">
                      <h3><FaBookMedical /> Reference</h3>
                      <p>{item.reference_text || "Not specified"}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
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
