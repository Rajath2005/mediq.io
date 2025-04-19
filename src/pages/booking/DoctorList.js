import { useParams, useNavigate } from "react-router-dom";

const doctorData = {
  apollo: [
    {
      name: "Dr. John Smith",
      specialization: "Cardiologist",
      experience: "15 years",
      availability: "Mon, Wed, Fri",
      image: "https://placeholder.com/150",
    },
    {
      name: "Dr. Maya Singh",
      specialization: "Pediatrician",
      experience: "12 years",
      availability: "Tue, Thu, Sat",
      image: "https://placeholder.com/150",
    }
  ],
  fortis: [
    {
      name: "Dr. Arjun Mehta",
      specialization: "Orthopedic",
      experience: "20 years",
      availability: "Mon, Tue, Thu",
      image: "https://placeholder.com/150",
    },
    {
      name: "Dr. Lisa Ray",
      specialization: "Dermatologist",
      experience: "8 years",
      availability: "Wed, Fri, Sat",
      image: "https://placeholder.com/150",
    }
  ],
  medanta: [
    {
      name: "Dr. Rajeev Kapoor",
      specialization: "Neurologist",
      experience: "18 years",
      availability: "Mon, Wed, Fri",
      image: "https://placeholder.com/150",
    },
    {
      name: "Dr. Neha Sharma",
      specialization: "Gynecologist",
      experience: "10 years",
      availability: "Tue, Thu, Sat",
      image: "https://placeholder.com/150",
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
      <div className="mb-4" style={{ position: 'absolute', left: '20px', top: '80px' }}>
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
