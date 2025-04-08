// Preloader.jsx
import React, { useEffect } from "react";
import LoadingText from "./LoadingText";
import "./Preloader.css";

const Preloader = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = document.getElementById("preloader");
      if (loader) loader.style.display = "none";
    }, 3000); // Reduced from 5s to 3s for a smoother experience

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="preloaderBg" id="preloader">
      <div className="preloader">
        <div className="preloader2"></div>
      </div>
      <div className="text-animation">
        <LoadingText />
      </div>
    </div>
  );
};

export default Preloader;
