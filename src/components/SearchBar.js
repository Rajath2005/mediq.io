import React, { useState, useEffect } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [remedies, setRemedies] = useState([]);
  const [result, setResult] = useState("");

  // Fetch remedies on mount
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/sanath00007/ayurveda-api/main/remedies.json")
      .then((res) => res.json())
      .then((data) => setRemedies(data))
      .catch((err) => {
        console.error("Error fetching remedies:", err);
        setResult("Error fetching data.");
      });
  }, []);

  // Search logic
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResult("");
      return;
    }

    const match = remedies.find(
      (item) => item.condition.toLowerCase() === searchTerm.trim().toLowerCase()
    );

    setResult(match ? `Remedy: ${match.remedy}` : "No remedy found.");
  }, [searchTerm, remedies]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Optional: Call onSearch if you want to pass this to a parent component
  };

  return (
    <div className="search-bar-container">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search for Ayurvedic medicines..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-bar"
        />
      </div>
      {result && (
        <div className="flashcard">
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

