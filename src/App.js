import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection"; // Import HeroSection

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <HeroSection /> {/* Use HeroSection Component */}
      
      {/* Other page content */}

      <Footer />
    </div>
  );
};

export default App;
