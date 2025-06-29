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
        {hospitals.map((hospital, idx) => (
          <div className="col-12 col-sm-10 col-md-6 col-lg-4" key={hospital.id}>
            <div
              className="card h-100 shadow-lg mx-auto animate__animated animate__fadeInUp animate__faster"
              onClick={() => handleHospitalClick(hospital.id)}
              style={{
                cursor: "pointer",
                maxWidth: "400px",
                width: "100%",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                marginBottom: "1rem"
              }}
            >
              <img
                src={hospital.image}
                className="card-img-top animate__animated animate__zoomIn"
                alt={hospital.name}
                style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-bold text-primary mb-2 animate__animated animate__fadeInDown">{hospital.name}</h5>
                  <p className="card-text text-muted animate__animated animate__fadeIn animate__delay-1s">{hospital.description}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <small className="text-muted d-flex align-items-center animate__animated animate__fadeInLeft animate__delay-1s">
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    {hospital.location}
                  </small>
                  <button className="btn btn-outline-primary btn-sm animate__animated animate__pulse animate__infinite" tabIndex={-1} onClick={e => { e.stopPropagation(); handleHospitalClick(hospital.id); }}>
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
