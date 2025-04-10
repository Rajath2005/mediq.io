import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const doctorData = {
  apollo: ["Dr. John Smith", "Dr. Maya Singh"],
  fortis: ["Dr. Arjun Mehta", "Dr. Lisa Ray"],
  medanta: ["Dr. Rajeev Kapoor", "Dr. Neha Sharma"],
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
      <h2>Select a Doctor from {hospitalId}</h2>
      <ul className="list-group mt-3">
        {doctors.map((doctor, index) => (
          <li
            key={index}
            className="list-group-item list-group-item-action"
            onClick={() => handleDoctorClick(doctor)}
            style={{ cursor: "pointer" }}
          >
            {doctor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
