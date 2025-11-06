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

const HomeRemediesPage = () => {
  useDocumentTitle("Explore Home Remedies - Safe & Simple Cures | MediQ");

  const [searchTerm, setSearchTerm] = useState("");
  const [remedies, setRemedies] = useState([]);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // 🔹 Show suggestions only while typing
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      setResults([]);
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
    setSearchTerm(e.target.value);
    setResults([]);
  };

  // 🔹 Show remedy instantly (also used for popular remedies)
  const showRemedyDirectly = (condition) => {
    setSearchTerm(condition);
    setSuggestions([]);

    const foundRemedy = remedies.find(
      (item) => item.condition.toLowerCase() === condition.toLowerCase()
    );
    if (foundRemedy) setResults([foundRemedy]);
  };

  const clearSearch = () => {
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
    <div className="improved-home-remedies-page">
      {/* 🌿 Elegant Header */}
      <header className="page-header">
        <div className="header-content">
          <h1>
            <FaLeaf className="header-icon" /> Natural Home Remedies
          </h1>
          <p>Simple, safe, and effective Ayurvedic wellness tips</p>
        </div>
      </header>

      {/* Subtle Disclaimer */}
      <div className="global-disclaimer">
        <FaInfoCircle className="disclaimer-icon" />
        <p>
          The information provided is for educational purposes only and not a
          substitute for medical advice. Always consult a doctor before trying
          any remedy.
        </p>
      </div>

      <main className="main-content">
        <section className="search-panel">
          {/* Search Bar */}
          <div className="search-bar-container">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search for Ayurvedic remedies..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-bar"
              />
              {searchTerm && (
                <button className="clear-button" onClick={clearSearch}>
                  ×
                </button>
              )}
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="suggestions-box">
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    className="suggestion-item"
                    onClick={() => showRemedyDirectly(s)}
                  >
                    <FaLeaf className="suggestion-icon" /> {s}
                  </div>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="loading-indicator" aria-live="polite">
                <FaLeaf className="loading-icon" /> Loading remedies...
              </div>
            )}

            {/* Remedy Result */}
            {results.length > 0 && (
              <div className="remedy-card">
                {results.map((item, i) => (
                  <div key={i}>
                    <h2>{item.condition}</h2>
                    <p className="remedy-subtitle">{item.remedy}</p>

                    {item.ingredients && (
                      <div className="ingredients">
                        <h4>
                          <FaListUl /> Ingredients
                        </h4>
                        <ul>
                          {item.ingredients.map((ing, idx) => (
                            <li key={idx}>
                              {ing.split(" ").map((word, i) =>
                                isKnownIngredient(word) ? (
                                  <a
                                    key={i}
                                    href={`https://www.google.com/search?q=${encodeURIComponent(
                                      word + " ayurveda benefits"
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ingredient-link"
                                  >
                                    {word}
                                  </a>
                                ) : (
                                  <span key={i}>{word}</span>
                                )
                              ).reduce((prev, curr) => [prev, " ", curr])}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.instructions && (
                      <div className="instructions">
                        <h4>Instructions</h4>
                        <p>{item.instructions}</p>
                      </div>
                    )}

                    {item.precautions && (
                      <div className="precautions">
                        <h4>
                          <FaExclamationTriangle /> Precautions
                        </h4>
                        <p>{item.precautions}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Popular Remedies */}
          <aside className="top-remedies">
            <h3>
              <FaStar /> Popular Remedies
            </h3>
            <ul className="top-remedies-list">
              {commonConditions.map((condition, i) => (
                <li key={i} onClick={() => showRemedyDirectly(condition)}>
                  <FaLeaf className="list-icon" /> {condition}
                </li>
              ))}
            </ul>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default HomeRemediesPage;
