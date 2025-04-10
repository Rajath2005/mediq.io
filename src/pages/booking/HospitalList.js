import React from "react";
import { useNavigate } from "react-router-dom";

const hospitals = [
  { id: "apollo", name: "Apollo Hospital" },
  { id: "fortis", name: "Fortis Hospital" },
  { id: "medanta", name: "Medanta Hospital" },
];

const HospitalList = () => {
  const navigate = useNavigate();

  const handleHospitalClick = (id) => {
    navigate(`/hospitals/${id}/doctors`);
  };

  return (
    <div className="container mt-5">
      <h2>Select a Hospital</h2>
      <ul className="list-group mt-3">
        {hospitals.map((hospital) => (
          <li
            key={hospital.id}
            className="list-group-item list-group-item-action"
            onClick={() => handleHospitalClick(hospital.id)}
            style={{ cursor: "pointer" }}
          >
            {hospital.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalList;
