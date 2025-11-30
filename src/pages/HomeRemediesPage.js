import React, { useState, useEffect } from "react";
import "./HomeRemediesPage.css";
import useDocumentTitle from "../hooks/useDocumentTitle";
import {
  FaLeaf,
  FaInfoCircle,
  FaStar,
  FaListUl,
  FaExclamationTriangle,
} from "react-icons/fa";

const commonConditions = [
  "Headache",
  "Common Cold",
  "Fever",
  "Cough",
  "Sore Throat",
  "Upset Stomach",
  "Allergies",
  "Insomnia",
];

const knownIngredients = [
  "Tulsi",
  "Neem",
  "Ginger",
  "Turmeric",
  "Amla",
  "Ashwagandha",
  "Cinnamon",
  "Clove",
  "Cardamom",
  "Cumin",
  "Coriander",
  "Garlic",
  "Honey",
  "Lemon",
  "Pepper",
  "Mint",
  "Aloe",
  "Fenugreek",
  "Fennel",
  "Basil",
  "Licorice",
  "Triphala",
  "Brahmi",
  "Shatavari",
  "Sandalwood",
  "Lavender"
];

const HomeRemediesPage = () => {
  useDocumentTitle("Explore Home Remedies - Safe & Simple Cures | MediQ");

  const [searchTerm, setSearchTerm] = useState("");
  const [remedies, setRemedies] = useState([]);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://raw.githubusercontent.com/sanath00007/ayurveda-api/main/remedies.json")
      .then((res) => res.json())
      .then((data) => {
        setRemedies(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching remedies:", err);
        setResults([{ error: "Error fetching data. Please try again later." }]);
        setIsLoading(false);
      });
  }, []);

  const isTyping = React.useRef(false);

  // 🔹 Show suggestions only while typing
  useEffect(() => {
    if (searchTerm.trim() === "" || !isTyping.current) {
      setSuggestions([]);
      return;
    }

    const matches = remedies
      .filter((item) =>
        item.condition.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      .map((item) => item.condition);

    setSuggestions(matches.slice(0, 8));
  }, [searchTerm, remedies]);

  const handleSearchChange = (e) => {
    isTyping.current = true;
    setSearchTerm(e.target.value);
    setResults([]);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    isTyping.current = false;
    setSuggestions([]);

    // Find exact or partial match
    const foundRemedy = remedies.find(
      (item) => item.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (foundRemedy) {
      setResults([foundRemedy]);
    } else {
      // If no direct match, maybe show suggestions as results or "Not found"
      setResults([]);
    }
  };

  // 🔹 Show remedy instantly (also used for popular remedies)
  const showRemedyDirectly = (condition) => {
    isTyping.current = false;
    setSearchTerm(condition);
    setSuggestions([]);

    const foundRemedy = remedies.find(
      (item) => item.condition.toLowerCase() === condition.toLowerCase()
    );
    if (foundRemedy) setResults([foundRemedy]);
  };

  const clearSearch = () => {
    isTyping.current = false;
    setSearchTerm("");
    setResults([]);
    setSuggestions([]);
  };

  // show a small loading indicator while the remedies list is being fetched
  // uses `isLoading` so ESLint doesn't complain about the variable being unused

  const isKnownIngredient = (word) =>
    knownIngredients.some(
      (ing) => ing.toLowerCase() === word.toLowerCase().replace(/[^a-z]/gi, "")
    );

  return (
    <div className="home-remedies-page">
      <div className="remedies-hero-section">
        <div className="remedies-hero-content animate__animated animate__fadeInDown">
          <h1 className="remedies-title">
            <span className="highlight-text">Natural Healing</span> at Home
          </h1>
          <p className="remedies-subtitle">
            Discover safe, simple, and effective Ayurvedic cures for everyday ailments.
          </p>

          <div className={`remedies-search-wrapper ${searchTerm ? 'active' : ''}`}>
            <FaLeaf className="search-icon-leaf" />
            <input
              type="text"
              placeholder="Search for a condition (e.g. Cold, Headache)..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="remedies-search-input"
            />
            {searchTerm && (
              <button className="clear-btn" onClick={clearSearch}>×</button>
            )}
            <button className="remedies-search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="remedies-suggestions animate__animated animate__fadeIn">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="suggestion-row"
                  onClick={() => showRemedyDirectly(s)}
                >
                  <FaLeaf className="sug-icon" /> {s}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <main className="remedies-main-container">
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner-leaf"></div>
            <p>Gathering natural wisdom...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="remedy-results-area animate__animated animate__fadeInUp">
            {results.map((item, i) => (
              <div key={i} className="remedy-detail-card">
                <div className="remedy-card-header">
                  <div className="condition-icon-wrapper">
                    <FaLeaf />
                  </div>
                  <div>
                    <h2 className="condition-title">{item.condition}</h2>
                    <p className="remedy-summary">{item.remedy}</p>
                  </div>
                </div>

                <div className="remedy-card-body">
                  {item.ingredients && (
                    <div className="remedy-section ingredients-section">
                      <h4 className="section-title"><FaListUl /> You will need</h4>
                      <ul className="ingredients-list">
                        {item.ingredients.map((ing, idx) => (
                          <li key={idx}>
                            {ing.split(" ").map((word, wIdx) =>
                              isKnownIngredient(word) ? (
                                <a
                                  key={wIdx}
                                  href={`https://www.google.com/search?q=${encodeURIComponent(word + " ayurveda benefits")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ingredient-link"
                                >
                                  {word}
                                </a>
                              ) : (
                                <span key={wIdx}>{word}</span>
                              )
                            ).reduce((prev, curr) => [prev, " ", curr])}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.instructions && (
                    <div className="remedy-section instructions-section">
                      <h4 className="section-title"><FaInfoCircle /> How to prepare</h4>
                      <p className="instruction-text">{item.instructions}</p>
                    </div>
                  )}

                  {item.precautions && (
                    <div className="remedy-section precaution-section">
                      <h4 className="section-title warning"><FaExclamationTriangle /> Precautions</h4>
                      <p className="precaution-text">{item.precautions}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <button className="back-to-list-btn" onClick={clearSearch}>
              Explore More Remedies
            </button>
          </div>
        ) : (
          <div className="popular-remedies-section animate__animated animate__fadeIn">
            <h3 className="section-heading">
              <FaStar className="star-icon" /> Common Ailments
            </h3>
            <div className="quick-remedy-grid">
              {commonConditions.map((condition, i) => (
                <div
                  key={i}
                  className="quick-remedy-card"
                  onClick={() => showRemedyDirectly(condition)}
                >
                  <div className="quick-card-icon">
                    <FaLeaf />
                  </div>
                  <span className="quick-card-title">{condition}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="global-disclaimer-footer">
          <FaInfoCircle />
          <p>
            The information provided is for educational purposes only.
            Always consult a doctor before trying any new remedy, especially if you have existing conditions.
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomeRemediesPage;
