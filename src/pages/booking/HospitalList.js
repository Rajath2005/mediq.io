import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProtection } from "../../hooks/useAuthProtection";
import AuthModal from "../../components/AuthModal";
import useDocumentTitle from '../../hooks/useDocumentTitle';


const hospitals = [
  { 
    id: "apollo", 
    name: "Apollo Hospital",
    image: "https://res.cloudinary.com/dacpbywfp/image/upload/v1744958160/download_oarf4w.jpg",
    description: "Multi-specialty hospital with state-of-the-art facilities",
    location: "Central Delhi"
  },
  { 
    id: "fortis", 
    name: "Fortis Hospital",
    image: "https://res.cloudinary.com/dacpbywfp/image/upload/v1744957817/download_ezzxn2.jpg",
    description: "Leading healthcare provider with advanced medical technology",
    location: "South Delhi"
  },
  { 
    id: "medanta", 
    name: "Medanta Hospital",
    image: "https://res.cloudinary.com/dacpbywfp/image/upload/v1744958077/hospital-building-illustration-medical-clinic-isolated-on-white-background-vector_qxf2xc.jpg",
    description: "World-class medical care and surgical expertise",
    location: "Gurugram"
  }
];

const HospitalList = () => {
    useDocumentTitle('Hospitals 🏥');

  const navigate = useNavigate();
  const { requireAuth, showAuthModal, closeAuthModal } = useAuthProtection();

  const handleHospitalClick = async (id) => {
    const canProceed = await requireAuth(() => true);
    if (!canProceed) return;
    
    navigate(`/hospitals/${id}/doctors`);
  };

  return (
    <div className="container mt-5 px-4">
      <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} message="Please log in to view hospital details and book appointments" />
      
      <div className="mb-4" style={{ position: 'absolute', left: '20px', top: '80px' }}>
        <button 
          className="btn btn-outline-success" 
          onClick={() => navigate(-1)}
        >
         Back 
        </button>
      </div>
      <div className="text-center mb-5">
        <h2 className="display-4">Select a Hospital</h2>
        <p className="text-muted">Choose from our network of trusted healthcare providers</p>
      </div>
      
      <div className="row g-4 justify-content-center">
        {hospitals.map((hospital) => (
          <div className="col-12 col-sm-10 col-md-6 col-lg-4" key={hospital.id}>
            <div 
              className="card h-100 shadow-sm mx-auto"
              onClick={() => handleHospitalClick(hospital.id)}
              style={{
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                maxWidth: "400px",
                width: "100%"
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
