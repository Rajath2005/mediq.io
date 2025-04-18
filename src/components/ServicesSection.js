import React from 'react';
import './ServicesSection.css';
import 'animate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeartbeat, 
  faCalendarAlt, 
  faPrescription, 
  faAmbulance,
  faChartLine,
  faCommentDots
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ServicesSection = () => {
  const navigate = useNavigate();

  const serviceRoutes = {
    "Health Monitoring": "/health-monitor",
    "Appointment Scheduling": "/hospitals", // Changed from "/HospitalList" to "/hospitals"
    "Prescription Management": "/prescription-management",
    "Emergency Assistance": "/emergency-service",
    "Health Analytics": "/health-analytics",
    "Doctor Chat": "/doctor-chat"
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
      icon: faHeartbeat, 
      title: "Health Monitoring", 
      description: "Real-time tracking of vital health metrics and personalized insights to help you stay healthy." 
    },
    { 
      icon: faPrescription, 
      title: "Prescription Management", 
      description: "Manage your prescriptions, set reminders, and access important medication information." 
    },
    { 
      icon: faAmbulance, 
      title: "Emergency Assistance", 
      description: "Quick access to emergency services and support when you need it most." 
    },
    {
      icon: faChartLine,
      title: "Health Analytics",
      description: "Detailed analysis of your health data, providing trends and actionable insights for better health management."
    },
    {
      icon: faCommentDots,
      title: "Doctor Chat",
      description: "Secure and convenient communication with your healthcare providers for questions, consultations, and support."
    }
  ];

  return (
    <section className="services-section animate__animated animate__fadeIn" id="services">
      <div className="row">
        <h2 className="section-heading animate__animated animate__slideInDown">Our Services</h2>
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
