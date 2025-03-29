import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Empty section space */}
      <div className="h-64 bg-gray-200 my-10"></div> 

      <h1 className="text-center text-xl font-bold">Welcome to My Website</h1>
      
      {/* Other page content */}

      <Footer />
    </div>
  );
};

export default App;
