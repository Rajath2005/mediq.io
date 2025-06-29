import { useParams, useNavigate } from "react-router-dom";

const doctorData = {
  apollo: [
    {
      name: "Dr. John Smith",
      specialization: "Cardiologist",
      experience: "15 years",
      availability: "Mon, Wed, Fri",
      image: "https://res.cloudinary.com/dacpbywfp/image/upload/v1745058915/download_dbzqqi.jpg",
    },
    {
      name: "Dr. Maya Singh",
      specialization: "Pediatrician",
      experience: "12 years",
      availability: "Tue, Thu, Sat",
      image: "https://res.cloudinary.com/dacpbywfp/image/upload/v1745059265/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMV9waG90b2dyYXBoeV9vZl9hbl9zb3V0aF9pbmRpYW5fd29tZW5fYXNfYV9kb2N0b19kMzAxMDM3Zi03MDUzLTQxNDAtYmYyZS1lZDFlYWE0YTM3NDRfMS5qcGc_w0zl2u.webp",
    }
  ],
  fortis: [
    {
      name: "Dr. Arjun Mehta",
      specialization: "Orthopedic",
      experience: "20 years",
      availability: "Mon, Tue, Thu",
      image: "https://res.cloudinary.com/dacpbywfp/image/upload/v1745059022/istockphoto-1346124900-612x612_xvadxi.jpg",
    },
    {
      name: "Dr. Lisa Ray",
      specialization: "Dermatologist",
      experience: "8 years",
      availability: "Wed, Fri, Sat",
      image: "https://res.cloudinary.com/dacpbywfp/image/upload/v1745059441/360_F_320744517_TaGkT7aRlqqWdfGUuzRKDABtFEoN5CiO_pz5kex.jpg",
    }
  ],
  medanta: [
    {
      name: "Dr. Rajeev Kapoor",
      specialization: "Neurologist",
      experience: "18 years",
      availability: "Mon, Wed, Fri",
      image: "https://res.cloudinary.com/dacpbywfp/image/upload/v1745069264/vaccination-and-injection-male-doctor-in-medical-gown-with-vaccine-vector_gvewen.jpg",
    },
    {
      name: "Dr. Neha Sharma",
      specialization: "Gynecologist",
      experience: "10 years",
      availability: "Tue, Thu, Sat",
      image: "https://res.cloudinary.com/dacpbywfp/image/upload/v1745069071/female-doctor-character-physician-hospital-checkup-patient-healthy-treatment-personnel_505557-11354_gzdxbh.avif",
    }
  ],
};

const DoctorList = () => {
  const { hospitalId } = useParams();
  const navigate = useNavigate();

  const doctors = doctorData[hospitalId] || [];

  const handleDoctorClick = (doctorName) => {
    navigate(`/book-appointment/${hospitalId}/${encodeURIComponent(doctorName)}`);
  };

  return (
    <div className="container mt-5">
      <div className="mb-10 " style={{ position: 'absolute', left: '20px', top: '80px' }}>
        <button 
          className="btn btn-outline-success" 
          onClick={() => navigate(-1)}
        >
          Back to Hospitals
        </button>
      </div>
      <div className="text-center mb-4">
        <h2>Doctors at {hospitalId.charAt(0).toUpperCase() + hospitalId.slice(1)}</h2>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {doctors.map((doctor, index) => (
          <div key={index} className="col">
            <div 
              className="card h-100 shadow-sm" 
              onClick={() => handleDoctorClick(doctor.name)}
              style={{ cursor: "pointer" }}
            >
              <img src={doctor.image} className="card-img-top" alt={doctor.name} />
              <div className="card-body">
                <h5 className="card-title">{doctor.name}</h5>
                <p className="card-text text-muted mb-1">{doctor.specialization}</p>
                <p className="card-text"><small>Experience: {doctor.experience}</small></p>
                <p className="card-text"><small>Available: {doctor.availability}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
