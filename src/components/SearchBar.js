import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Call the onSearch prop with the current value
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
    </div>
  );
};

export default SearchBar;
