import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar"; // Import the SearchBar component

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section with Search Bar */}
      <div className="flex flex-col items-center justify-center h-64 bg-gray-200 my-10">
        <h1 className="text-xl font-bold mb-4">Welcome to My Website</h1>
        <SearchBar /> {/* Add SearchBar component */}
      </div>

      {/* Other page content */}

      <Footer />
    </div>
  );
};

export default App;
