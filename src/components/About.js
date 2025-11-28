import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import logo from './images/logo.jpg';

const AboutUs = () => {
  return (
    <>
      <section className="about-section">
        <div className="about-left">
          <h1>About Us</h1>
          <h2>Welcome to AyuDost</h2>
          <div className="underline"></div>
          <p>
            Your online resource for traditional Ayurvedic medicine is AyuDost. We're developing a one-stop shop that blends the knowledge of traditional medicine with modern conveniences, enabling you to quickly find natural cures, schedule consultations, and monitor your health.

          </p>
          <button className="view-more">
            <Link to="#">● DISCOVER MORE</Link>
          </button>
        </div>

        <div className="about-right">
          <img src={logo} alt="AyuDost Logo" />
          <h2>Our Mission</h2>
          <div className="underline"></div>
          <p>
            We're on a mission to bridge the gap between ancient Ayurvedic healing and today's digital world. Our team is committed to developing a platform that will allow you to conveniently arrange medical visits, find home remedies, and obtain medication details in one location.
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutUs;