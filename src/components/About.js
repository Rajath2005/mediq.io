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
          <h2>About MediQ:</h2>
          <div className="underline"></div>
          <p>
            MediQ is your trusted destination for authentic Ayurvedic healthcare solutions. We combine ancient wisdom with modern healthcare practices to provide holistic wellness solutions that benefit your mind, body, and soul.
          </p>
          <button className="view-more">
            <Link to="/ayurveda-roadmap">● VIEW MORE</Link>
          </button>
        </div>

        <div className="about-right">
          
          <img src={logo} alt="MediQ Logo" />
          <h2>Our Vision</h2>
          <div className="underline"></div>
          <p>
            At MediQ, we strive to make traditional Ayurvedic healing accessible to everyone. Our team of experienced practitioners and modern healthcare experts work together to deliver personalized wellness solutions for our valued clients.
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
