import React from 'react';
import './ServicesSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHammer, 
  faBrush, 
  faWrench, 
  faTruckPickup, 
  faBroom, 
  faPlug 
} from '@fortawesome/free-solid-svg-icons';

const ServicesSection = () => {
  const services = [
    { 
      icon: faHammer, 
      title: "Medical Device Development", 
      description: "Comprehensive solutions for medical device design and development, ensuring compliance with industry standards." 
    },
    { 
      icon: faBrush, 
      title: "Healthcare Solutions", 
      description: "Innovative healthcare solutions tailored to meet modern medical challenges and improve patient care." 
    },
    { 
      icon: faWrench, 
      title: "Quality Assurance", 
      description: "Rigorous quality control and assurance processes to maintain the highest standards in medical technology." 
    },
    { icon: faTruckPickup, title: "Service Heading", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam consequatur necessitatibus eaque." },
    { icon: faBroom, title: "Service Heading", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam consequatur necessitatibus eaque." },
    { icon: faPlug, title: "Service Heading", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam consequatur necessitatibus eaque." }
  ];

  return (
    <section className="services-section" id="services">
      <div className="row">
        <h2 className="section-heading">Our Services</h2>
      </div>
      <div className="row">
        {services.map((service, index) => (
          <div className="column" key={index}>
            <div className="card">
              <div className="icon-wrapper">
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
