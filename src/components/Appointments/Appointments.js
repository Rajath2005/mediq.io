import React, { useState } from 'react';
import { FaCalendar, FaClock, FaUserMd } from 'react-icons/fa';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. John Doe",
      date: "2024-01-20",
      time: "10:00 AM",
      status: "upcoming"
    }
    // Add more mock appointments as needed
  ]);

  const renderAppointmentCard = (appointment) => (
    <div key={appointment.id} className="appointment-card">
      <div className="appointment-header">
        <FaUserMd className="icon" />
        <h5>{appointment.doctor}</h5>
      </div>
      <div className="appointment-details">
        <div className="detail-row">
          <FaCalendar className="icon" />
          <span>{appointment.date}</span>
        </div>
        <div className="detail-row">
          <FaClock className="icon" />
          <span>{appointment.time}</span>
        </div>
      </div>
      <div className={`appointment-status ${appointment.status}`}>
        {appointment.status}
      </div>
      <div className="appointment-actions">
        <button className="btn btn-outline-primary btn-sm">Reschedule</button>
        <button className="btn btn-outline-danger btn-sm">Cancel</button>
      </div>
    </div>
  );

  return (
    <div className="appointments-container">
      <h2 className="mb-4">My Appointments</h2>
      <div className="appointments-list">
        {appointments.map(renderAppointmentCard)}
      </div>
    </div>
  );
};

export default Appointments;
