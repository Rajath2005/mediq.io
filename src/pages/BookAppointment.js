import React, { useState, useEffect } from "react";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
  useDocumentTitle('Book Your Doctor Appointment - Hassle-Free | MediQ');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/book-appointment' } });
    }
  }, [isAuthenticated, navigate]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [fetchingSlots, setFetchingSlots] = useState(false);
  const [bookedAppointments, setBookedAppointments] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    doctor: "",
    date: "",
    timeSlot: ""
  });

  const doctors = ["Dr. John Smith", "Dr. Alice Johnson", "Dr. Rajeev Kapoor"];
  
  // Generate time slots from 9 AM to 5 PM with 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      const hourString = hour.toString().padStart(2, '0');
      slots.push(`${hourString}:00`);
      if (hour !== 17) { // No 5:30 slot
        slots.push(`${hourString}:30`);
      }
    }
    return slots;
  };

  const allTimeSlots = generateTimeSlots();

  // Fetch booked appointments whenever date or doctor changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!formData.date || !formData.doctor) return;
      
      setFetchingSlots(true);
      
      try {
        // Simulate fetching booked slots from Firestore
        const data = []; // Replace with actual Firestore fetching logic
        
        // Filter the available slots based on booked appointments
        const bookedTimes = data.map(app => app.time);
        const available = allTimeSlots.filter(slot => !bookedTimes.includes(slot));
        
        setAvailableSlots(available);
        setBookedAppointments(data);
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setFetchingSlots(false);
      }
    };
    
    fetchBookedSlots();
  }, [formData.date, formData.doctor]);

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Reset time slot when date or doctor changes
    if (e.target.name === 'date' || e.target.name === 'doctor') {
      setFormData(prev => ({ ...prev, timeSlot: "" }));
    }
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
    if (!formData.timeSlot) {
      setError("Please select an available time slot");
      return false;
    }
    return true;
  };

  const sendSMSNotification = async (phoneNumber, doctorName, appointmentDate, appointmentTime) => {
    // In a real implementation, you would integrate with an SMS service like Twilio, MessageBird, etc.
    // For this example, we'll just simulate the SMS sending
    console.log(`SMS notification would be sent to ${phoneNumber} for appointment with ${doctorName} on ${appointmentDate} at ${appointmentTime}`);
    
    // Simulate API call to SMS service
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(""); // Clear any previous errors

    try {
      // Simulate inserting data into Firestore
      const data = {
        name: formData.name,
        phone: formData.phone,
        doctor: formData.doctor,
        date: formData.date,
        time: formData.timeSlot,
        status: 'confirmed'
      };
      
      // Simulate SMS notification
      await sendSMSNotification(
        formData.phone,
        formData.doctor,
        formData.date,
        formData.timeSlot
      );
      
      setSuccess(true);
      alert(`Appointment booked with ${formData.doctor} on ${formData.date} at ${formData.timeSlot}`);
      setFormData({
        name: "",
        phone: "",
        doctor: "",
        date: "",
        timeSlot: ""
      });
      
      // Refresh available slots
      const updatedData = []; // Replace with actual Firestore fetching logic
      setBookedAppointments(updatedData || []);
    } catch (err) {
      console.error('Unexpected Error:', err);
      setError(`An unexpected error occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  
  // Format time for display (24h to 12h format)
  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  };

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <h2 className="mb-4 text-center">Book an Appointment</h2>
      {error && <div className="alert alert-danger animate__animated animate__shakeX">{error}</div>}
      {success && <div className="alert alert-success animate__animated animate__fadeIn">Appointment booked successfully!</div>}
      
      <div className="row">
        <div className="col-md-8">
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

            {formData.date && formData.doctor && (
              <div className="mb-3">
                <label className="form-label">Select Time</label>
                {fetchingSlots ? (
                  <div className="text-center my-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : availableSlots.length > 0 ? (
                  <div className="time-slots">
                    <select
                      className="form-select"
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choose time slot...</option>
                      {availableSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {formatTime(slot)}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="alert alert-warning">
                    No available slots for this date and doctor. Please try another date or doctor.
                  </div>
                )}
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary w-100" 
              disabled={loading || fetchingSlots || !formData.timeSlot}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : "Book Appointment"}
            </button>
          </form>
        </div>
        
        <div className="col-md-4">
          <div className="p-4 border rounded shadow-sm bg-light h-100">
            <h4 className="mb-3">Appointment Availability</h4>
            {formData.date && formData.doctor ? (
              <>
                <p>
                  <strong>Doctor:</strong> {formData.doctor}<br />
                  <strong>Date:</strong> {formData.date}
                </p>
                <div className="mb-3">
                  <h5>Booked Slots:</h5>
                  {bookedAppointments.length > 0 ? (
                    <ul className="list-group">
                      {bookedAppointments.map((app, idx) => (
                        <li key={idx} className="list-group-item list-group-item-danger">
                          {formatTime(app.time)} - Booked
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-success">No booked slots for this selection!</p>
                  )}
                </div>
                <div>
                  <h5>Available Slots:</h5>
                  {availableSlots.length > 0 ? (
                    <ul className="list-group">
                      {availableSlots.map((slot, idx) => (
                        <li key={idx} className="list-group-item list-group-item-success">
                          {formatTime(slot)} - Available
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-danger">No available slots for this selection!</p>
                  )}
                </div>
              </>
            ) : (
              <p className="text-muted">Select a doctor and date to view availability</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;