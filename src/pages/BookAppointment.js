import React, { useState } from "react";

const BookAppointment = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    doctor: "",
    date: "",
    time: ""
  });

  const doctors = ["Dr. John Smith", "Dr. Alice Johnson", "Dr. Rajeev Kapoor"];

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.name.length < 3) {
      setError("Name must be at least 3 characters long");
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Here you would typically make an API call
      setSuccess(true);
      alert(`Appointment booked with ${formData.doctor} on ${formData.date} at ${formData.time}`);
      setFormData({
        name: "",
        phone: "",
        doctor: "",
        date: "",
        time: ""
      });
    } catch (err) {
      setError("Failed to book appointment. Please try again.");
    }
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Book an Appointment</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Appointment booked successfully!</div>}
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            minLength="3"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            placeholder="Enter 10-digit number"
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
            min={today}
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
            min="09:00"
            max="17:00"
            step="1800"
            required
          />
          <small className="text-muted">Available times: 9:00 AM - 5:00 PM</small>
        </div>

        <button type="submit" className="btn btn-primary">Book Appointment</button>
      </form>
    </div>
  );
};

export default BookAppointment;
