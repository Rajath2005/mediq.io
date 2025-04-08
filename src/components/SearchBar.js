import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setError("");
      alert(`Searching for: ${query}`);
    } catch (err) {
      setError("Connection error. Please try again later.");
      console.error("Search error:", err);
    }
  };

  return (
    <div className="search-bar-container">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search for Ayurvedic medicines..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default SearchBar;
