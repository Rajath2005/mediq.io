import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default App;
