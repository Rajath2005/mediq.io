// App.js
import React from "react";
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const App = () => {
  return (
    <div>
      <Navbar />
      {/* Rest of the app */}
      <Hero />
    </div>
  );
};

export default App;