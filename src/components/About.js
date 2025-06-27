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
          <h2>Welcome to MediQ</h2>
          <div className="underline"></div>
          <p>
            MediQ is your digital gateway to authentic Ayurvedic healthcare. We're building a comprehensive platform that brings together traditional medicine wisdom and modern convenience, making it easier for you to find natural remedies, book appointments, and manage your wellness journey.
          </p>
          <button className="view-more">
            <Link to="#">● DISCOVER MORE</Link>
          </button>
        </div>

        <div className="about-right">
          <img src={logo} alt="MediQ Logo" />
          <h2>Our Mission</h2>
          <div className="underline"></div>
          <p>
            We're on a mission to bridge the gap between ancient Ayurvedic healing and today's digital world. Our team is passionate about creating a platform where you can easily access medicine details, discover home remedies, and seamlessly book healthcare appointments - all in one place.
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutUs;