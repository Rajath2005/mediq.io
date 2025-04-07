import React, { useState } from "react";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    doctor: "",
    date: "",
    time: ""
  });

  const doctors = ["Dr. John Smith", "Dr. Alice Johnson", "Dr. Rajeev Kapoor"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment booked with ${formData.doctor} on ${formData.date} at ${formData.time}`);
    // You can send this to a backend or handle however you want
    setFormData({
      name: "",
      doctor: "",
      date: "",
      time: ""
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Book an Appointment</h2>
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
          <label className="form-label">Select Doctor</label>
          <select
            className="form-select"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
          >
            <option value="">Choose...</option>
            {doctors.map((doc, index) => (
              <option key={index} value={doc}>{doc}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Select Date</label>
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
          <label className="form-label">Select Time</label>
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
