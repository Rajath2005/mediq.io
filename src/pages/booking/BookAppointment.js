import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../../firebase"; // Import auth from firebase
import "animate.css/animate.min.css";
import "./BookingForm.css";

const BookAppointment = () => {
  const { hospitalId, doctorId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    doctor: decodeURIComponent(doctorId || ""),
    date: "",
    time: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      doctor: decodeURIComponent(doctorId || "")
    }));
  }, [doctorId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.name.trim() || !formData.date || !formData.time) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      await addDoc(collection(db, "appointments"), {
        name: formData.name,
        email: auth.currentUser?.email || "",
        doctor: formData.doctor,
        hospitalId: hospitalId,
        date: formData.date,
        time: formData.time,
        uid: auth.currentUser?.uid || "", // ✅ Required for security rules
        createdAt: new Date()
      });
      alert(`Appointment booked with ${formData.doctor} at ${hospitalId} on ${formData.date} at ${formData.time}`);
      setFormData({ name: "", doctor: decodeURIComponent(doctorId || ""), date: "", time: "" });
    } catch (error) {
      alert("Failed to book appointment. Please try again.");
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="booking-form-container animate__animated animate__fadeInDown">
      <div className="booking-form-card shadow-lg">
        <h2 className="mb-4">Book Appointment at <span className="text-primary">{hospitalId}</span></h2>
        {error && <div className="alert alert-danger animate__animated animate__shakeX" role="alert">{error}</div>}
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
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

          <button type="submit" className="btn btn-primary w-100 py-2 mt-2 animate__animated animate__pulse animate__delay-1s">Book Appointment</button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
