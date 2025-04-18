import React from "react";
import { useNavigate } from "react-router-dom";

const hospitals = [
  { 
    id: "apollo", 
    name: "Apollo Hospital",
    image: "https://res.cloudinary.com/dacpbywfp/image/upload/v1744958160/download_oarf4w.jpg", // Add actual image URL
    description: "Multi-specialty hospital with state-of-the-art facilities",
    location: "Central Delhi"
  },
  { 
    id: "fortis", 
    name: "Fortis Hospital",
    image: "https://res.cloudinary.com/dacpbywfp/image/upload/v1744957817/download_ezzxn2.jpg", // Add actual image URL
    description: "Leading healthcare provider with advanced medical technology",
    location: "South Delhi"
  },
  { 
    id: "medanta", 
    name: "Medanta Hospital",
    image: "https://res.cloudinary.com/dacpbywfp/image/upload/v1744958077/hospital-building-illustration-medical-clinic-isolated-on-white-background-vector_qxf2xc.jpg", // Add actual image URL
    description: "World-class medical care and surgical expertise",
    location: "Gurugram"
  },
  { 
    id: "Ayurveda", 
    name: "Medanta Hospital",
    image: "https://res.cloudinary.com/dacpbywfp/image/upload/v1744958077/hospital-building-illustration-medical-clinic-isolated-on-white-background-vector_qxf2xc.jpg", // Add actual image URL
    description: "World-class medical care and surgical expertise",
    location: "Gurugram"
  },
];

const HospitalList = () => {
  const navigate = useNavigate();

  const handleHospitalClick = (id) => {
    navigate(`/hospitals/${id}/doctors`);
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h2 className="display-4">Select a Hospital</h2>
        <p className="text-muted">Choose from our network of trusted healthcare providers</p>
      </div>
      
      <div className="row g-4">
        {hospitals.map((hospital) => (
          <div className="col-md-4" key={hospital.id}>
            <div 
              className="card h-100 shadow-sm"
              onClick={() => handleHospitalClick(hospital.id)}
              style={{
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 .125rem .25rem rgba(0,0,0,.075)";
              }}
            >
              <img 
                src={hospital.image} 
                className="card-img-top" 
                alt={hospital.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{hospital.name}</h5>
                <p className="card-text text-muted">{hospital.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    {hospital.location}
                  </small>
                  <button className="btn btn-outline-primary btn-sm">
                    View Doctors
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalList;
