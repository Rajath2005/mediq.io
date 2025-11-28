import React from 'react';
import './ServicesSection.css';
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthProtection } from "../hooks/useAuthProtection";
import AuthModal from "./AuthModal";
import {
  faCalendarAlt,
  faLeaf,
  faFlask,
  faStore,
  faHospital,
  faPhoneAlt,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ServicesSection = () => {
  const navigate = useNavigate();
  const { showAuthModal, closeAuthModal } = useAuthProtection();

  const serviceRoutes = {
    "Appointment Scheduling": "https://ayudost-connect-62435.lovable.app/",
    "Home Remedies": "/home-remedies",
    "Emergency Call": "/emergency-settings",
    "Ayurvedic Medicine": "/search-medicines",
    "AyurvedicShops": "/ayurvedic-shops",
    "Nearby Hospitals": "/nearby-hospitals"
  };

  const handleServiceClick = (title) => {
    const route = serviceRoutes[title];
    if (route) {
      if (route.startsWith('http')) {
        window.open(route, '_blank');
      } else {
        navigate(route);
      }
    }
  };

  const services = [
    {
      icon: faCalendarAlt,
      title: "Appointment Scheduling",
      description: "Easily schedule appointments with doctors and specialists, manage reminders, and stay organized.",
      features: ["Instant Booking", "Specialist Search", "Reminders"]
    },
    {
      icon: faLeaf,
      title: "Ayurvedic Medicine",
      description: "Discover traditional Ayurvedic remedies and holistic healing approaches for natural wellness.",
      features: ["Herbal Database", "Dosage Guide", "Side-effect Free"]
    },
    {
      icon: faFlask,
      title: "Home Remedies",
      description: "Access traditional home remedies, natural healing methods, and wellness tips for common ailments.",
      features: ["Natural Healing", "Kitchen Ingredients", "Immunity Boost"]
    },
    {
      icon: faPhoneAlt,
      title: "Emergency Call",
      description: "Quick access to emergency services and support when you need it most.",
      features: ["24/7 Support", "Ambulance", "Quick Connect"]
    },
    {
      icon: faStore,
      title: "AyurvedicShops",
      description: "Find nearby Ayurvedic shops and stores for traditional medicine and wellness products.",
      features: ["Verified Sellers", "Organic Products", "Local Stores"]
    },
    {
      icon: faHospital,
      title: "Nearby Hospitals",
      description: "Locate hospitals near you for quick access to medical care in emergencies or for regular checkups.",
      features: ["GPS Locator", "Emergency Care", "Rating System"]
    }
  ];

  return (
    <section className="services-section" id="services">
      {/* Background Elements */}
      <div className="bg-gradient-overlay"></div>
      <div className="floating-shapes">
        <div className="shape shape-1"><FontAwesomeIcon icon={faLeaf} /></div>
        <div className="shape shape-2"><FontAwesomeIcon icon={faFlask} /></div>
        <div className="shape shape-3"><FontAwesomeIcon icon={faLeaf} /></div>
      </div>

      <div className="content-container">
        <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} message="Please log in to view hospital details and book appointments" />

        <div className="section-header">
          <h1 className="main-services-title">Our Services</h1>
          <div className="title-underline"></div>
          <h4 className="our-services-sub">We offer a range of healthcare and wellness services tailored for your natural well-being</h4>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              className="service-card"
              key={index}
              onClick={() => handleServiceClick(service.title)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-inner">
                <div className="icon-wrapper">
                  <FontAwesomeIcon icon={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <div className="features-list">
                  {service.features.map((feature, idx) => (
                    <span key={idx} className="feature-badge">
                      <span className="check-icon">✓</span> {feature}
                    </span>
                  ))}
                </div>

                <div className="card-action">
                  <span>Explore</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <div className="cta-content">
            <h3>Need Personalized Help?</h3>
            <button className="cta-button" onClick={() => window.dispatchEvent(new CustomEvent('openChatbot'))}>
              Start Your Ayurvedic Journey
              <FontAwesomeIcon icon={faArrowRight} className="cta-icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
