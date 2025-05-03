import React from 'react';
import ServicesSection from '../components/ServicesSection';
import useDocumentTitle from "../hooks/useDocumentTitle";


const ServicesPage = () => {
  useDocumentTitle('Our Services - Advanced Digital Health Solutions | MediQ');

  return (
    <div className="container mt-5">
         <ServicesSection/>
    </div>
  );
};

export default ServicesPage;
