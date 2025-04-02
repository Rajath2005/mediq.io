import React, { useState } from "react";

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
    <div className="flex flex-col">
      <div className="flex items-center border border-gray-400 rounded-lg p-2 bg-white">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-2 outline-none w-64"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default SearchBar;
