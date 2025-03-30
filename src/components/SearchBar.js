import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  return (
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
  );
};

export default SearchBar;
