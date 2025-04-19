import React from 'react';
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="mb-10" style={{ 
        position: 'fixed',
        left: '20px', 
        top: '100px',
        zIndex: 1000
      }}>
        <button 
          className="btn btn-outline-success btn-lg" 
          onClick={() => navigate(-1)}
        >
          Back 
        </button>
      </div>
      <h2>My Appointments</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Upcoming Appointments</h5>
          <div className="list-group">
            {/* Add appointment list items here */}
            <div className="list-group-item">
              <p className="mb-1">No appointments scheduled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
