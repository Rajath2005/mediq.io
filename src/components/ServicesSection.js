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
  faPhoneAlt
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ServicesSection = () => {
  const navigate = useNavigate();
  const { showAuthModal, closeAuthModal } = useAuthProtection();

  const serviceRoutes = {
    "Appointment Scheduling": "/hospitals", 
    "Home Remedies": "/home-remedies", 
    "Emergency Call": "/emergency-settings",
    "Ayurvedic Medicine": "/search-medicines",
    "AyurvedicShops": "/ayurvedic-shops",
    "Nearby Hospitals": "/nearby-hospitals"
  };

  const handleServiceClick = (title) => {
    const route = serviceRoutes[title];
    if (route) {
      navigate(route);
    }
  };

  const services = [
    { 
      icon: faCalendarAlt, 
      title: "Appointment Scheduling", 
      description: "Easily schedule appointments with doctors and specialists, manage reminders, and stay organized." 
    },
    {
      icon: faLeaf,
      title: "Ayurvedic Medicine",
      description: "Discover traditional Ayurvedic remedies and holistic healing approaches for natural wellness."
    },
    { 
      icon: faFlask, 
      title: "Home Remedies", 
      description: "Access traditional home remedies, natural healing methods, and wellness tips for common ailments." 
    },
    { 
      icon: faPhoneAlt, 
      title: "Emergency Call", 
      description: "Quick access to emergency services and support when you need it most." 
    },
    { 
      icon: faStore, 
      title: "AyurvedicShops", 
      description: "Find nearby Ayurvedic shops and stores for traditional medicine and wellness products." 
    },
    {
      icon: faHospital,
      title: "Nearby Hospitals",
      description: "Locate hospitals near you for quick access to medical care in emergencies or for regular checkups."
    }
  ];

  return (
    <section className="services-section animate__animated animate__fadeIn" id="services">
      <div className="row">
        <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} message="Please log in to view hospital details and book appointments" />
        <h1 className="main-services-title animate__animated animate__fadeInDown">Our Services</h1>
        <h4 className="our-services-sub animate__animated animate__fadeInUp">We offer a range of healthcare and wellness services for your needs</h4>
      </div>
      <div className="row">
        {services.map((service, index) => (
          <div className="column" key={index}>
            <div 
              className="card animate__animated animate__fadeInUp" 
              style={{ 
                animationDelay: `${index * 0.2}s`,
                cursor: 'pointer'
              }}
              onClick={() => handleServiceClick(service.title)}
            >
              <div className="icon-wrapper animate__animated animate__pulse animate__infinite">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
