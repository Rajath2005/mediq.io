import React from "react";
import SearchBar from "./SearchBar";
import bgImage from "./images/logo.png"; // Import the image

const HeroSection = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-[500px] my-10 bg-cover bg-center w-full"
      style={{ backgroundImage: `url(${bgImage})` }} // Set background image
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Content (Heading + SearchBar) should be above the overlay */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-white mb-6">Welcome to My Website</h1>
        <SearchBar /> {/* Search bar now accessible */}
      </div>
    </div>
  );
};

export default HeroSection;

