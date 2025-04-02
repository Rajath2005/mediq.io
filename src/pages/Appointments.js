import React from 'react';

const Appointments = () => {
  return (
    <div className="container mt-5">
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
