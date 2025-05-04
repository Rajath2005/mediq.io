import React, { useState, useEffect } from "react";
import { supabase } from '../supabaseClient';
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

const ManageAppointments = () => {
  useDocumentTitle('Manage Appointments | MediQ Admin');
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login', { state: { from: '/manage-appointments' } });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const doctors = ["Dr. John Smith", "Dr. Alice Johnson", "Dr. Rajeev Kapoor"];

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        let query = supabase.from('appointments').select('*');
        
        if (filterDate) {
          query = query.eq('date', filterDate);
        }
        
        if (filterDoctor) {
          query = query.eq('doctor', filterDoctor);
        }
        
        // Sort by date and time
        query = query.order('date', { ascending: true }).order('time', { ascending: true });
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
    
    // Set up real-time subscription
    const appointmentsSubscription = supabase
      .channel('appointments-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'appointments' }, 
        () => {
          // Refresh data when changes occur
          setRefreshTrigger(prev => prev + 1);
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(appointmentsSubscription);
    };
  }, [filterDate, filterDoctor, refreshTrigger]);

  const handleStatusChange = async (id, newStatus) => {
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      // Update the local state to reflect the change
      setAppointments(prevAppointments => 
        prevAppointments.map(app => 
          app.id === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error("Error updating appointment status:", err);
      setError("Failed to update appointment status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) {
      return;
    }
    
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      // Remove the appointment from the local state
      setAppointments(prevAppointments => 
        prevAppointments.filter(app => app.id !== id)
      );
    } catch (err) {
      console.error("Error deleting appointment:", err);
      setError("Failed to delete appointment");
    } finally {
      setActionLoading(false);
    }
  };

  const sendReminderSMS = async (phone, doctor, date, time) => {
    // In a real implementation, you would integrate with an SMS service
    // This is a simulation
    console.log(`Reminder SMS would be sent to ${phone} for appointment with ${doctor} on ${date} at ${time}`);
    
    // Simulate API call to SMS service
    return new Promise(resolve => {
      setTimeout(() => {
        alert(`Reminder SMS sent to ${phone}`);
        resolve({ success: true });
      }, 1000);
    });
  };

  const handleSendReminder = async (appointment) => {
    setActionLoading(true);
    try {
      await sendReminderSMS(
        appointment.phone,
        appointment.doctor,
        appointment.date,
        appointment.time
      );
    } catch (err) {
      console.error("Error sending reminder:", err);
      setError("Failed to send reminder");
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      confirmed: "bg-success",
      completed: "bg-primary",
      cancelled: "bg-danger",
      no_show: "bg-warning text-dark"
    };
    
    return (
      <span className={`badge ${statusClasses[status] || "bg-secondary"}`}>
        {status.replace("_", " ").toUpperCase()}
      </span>
    );
  };

  const clearFilters = () => {
    setFilterDate("");
    setFilterDoctor("");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="container mt-5 animate__animated animate__fadeIn">
      <h2 className="mb-4 text-center">Manage Appointments</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0">Filter Appointments</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-5 mb-3">
              <label className="form-label">Filter by Date</label>
              <input
                type="date"
                className="form-control"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
            <div className="col-md-5 mb-3">
              <label className="form-label">Filter by Doctor</label>
              <select
                className="form-select"
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
              >
                <option value="">All Doctors</option>
                {doctors.map((doc, index) => (
                  <option key={index} value={doc}>{doc}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2 d-flex align-items-end mb-3">
              <button 
                className="btn btn-secondary w-100" 
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading appointments...</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="alert alert-info">No appointments found with the current filters.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover border">
            <thead className="table-dark">
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className={appointment.date === today ? "table-primary" : ""}>
                  <td>{appointment.name}</td>
                  <td>{appointment.doctor}</td>
                  <td>{formatDate(appointment.date)}</td>
                  <td>{formatTime(appointment.time)}</td>
                  <td>{appointment.phone}</td>
                  <td>{getStatusBadge(appointment.status)}</td>
                  <td>
                    <div className="btn-group">
                      <button 
                        className="btn btn-sm btn-outline-success"
                        onClick={() => handleStatusChange(appointment.id, 'completed')}
                        disabled={actionLoading || appointment.status === 'completed'}
                      >
                        Complete
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                        disabled={actionLoading || appointment.status === 'cancelled'}
                      >
                        Cancel
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleStatusChange(appointment.id, 'no_show')}
                        disabled={actionLoading || appointment.status === 'no_show'}
                      >
                        No Show
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleSendReminder(appointment)}
                        disabled={actionLoading}
                      >
                        Remind
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        disabled={actionLoading}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="card mt-4 shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0">Statistics</h5>
        </div>
        <div className="card-body">
          <div className="row text-center">
            <div className="col-md-3 mb-3">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <h5 className="card-title">Total</h5>
                  <h2>{appointments.length}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <h5 className="card-title">Confirmed</h5>
                  <h2>{appointments.filter(a => a.status === 'confirmed').length}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card bg-danger text-white">
                <div className="card-body">
                  <h5 className="card-title">Cancelled</h5>
                  <h2>{appointments.filter(a => a.status === 'cancelled').length}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card bg-warning">
                <div className="card-body">
                  <h5 className="card-title">Today</h5>
                  <h2>{appointments.filter(a => a.date === today).length}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAppointments;