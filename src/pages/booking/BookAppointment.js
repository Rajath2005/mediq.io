import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BookAppointment = () => {
  const { hospitalId, doctorId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    doctor: decodeURIComponent(doctorId || ""),
    date: "",
    time: ""
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      doctor: decodeURIComponent(doctorId || "")
    }));
  }, [doctorId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment booked with ${formData.doctor} at ${hospitalId} on ${formData.date} at ${formData.time}`);
    setFormData({ name: "", doctor: "", date: "", time: "" });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Book Appointment at {hospitalId}</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Doctor</label>
          <input
            type="text"
            className="form-control"
            name="doctor"
            value={formData.doctor}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            type="time"
            className="form-control"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Book Appointment</button>
      </form>
    </div>
  );
};

export default BookAppointment;
