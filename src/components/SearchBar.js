import React, { useState, useEffect } from "react";
import { useAuthProtection } from "../hooks/useAuthProtection";
import AuthModal from "./AuthModal";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [remedies, setRemedies] = useState([]);
  const [result, setResult] = useState("");
  const { requireAuth, showAuthModal, closeAuthModal } = useAuthProtection();

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

  const handleInputChange = async (e) => {
    const value = e.target.value;
    const canSearch = await requireAuth(() => true);
    if (!canSearch) return;

    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleInputFocus = async (e) => {
    // Check auth when user focuses the input
    await requireAuth(() => true);
  };

  return (
    <div className="search-bar-container">
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={closeAuthModal} 
        message="Please log in to search for Ayurvedic medicines" 
      />
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search for Ayurvedic medicines..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
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

