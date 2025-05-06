// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabaseClient";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    totalUsers: 0,
    totalDoctors: 0,
    totalHospitals: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Get appointments count
        const { count: totalAppointments, error: appointmentsError } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true });
          
        if (appointmentsError) throw appointmentsError;
        
        // Get pending appointments count
        const { count: pendingAppointments, error: pendingError } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');
          
        if (pendingError) throw pendingError;
        
        // Get users count
        const { count: totalUsers, error: usersError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
          
        if (usersError) throw usersError;
        
        // Get doctors count
        const { count: totalDoctors, error: doctorsError } = await supabase
          .from('doctors')
          .select('*', { count: 'exact', head: true });
          
        if (doctorsError) throw doctorsError;
        
        // Get hospitals count
        const { count: totalHospitals, error: hospitalsError } = await supabase
          .from('hospitals')
          .select('*', { count: 'exact', head: true });
          
        if (hospitalsError) throw hospitalsError;
        
        setStats({
          totalAppointments,
          pendingAppointments,
          totalUsers,
          totalDoctors,
          totalHospitals,
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
        setError("Failed to load admin dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="admin-dashboard access-denied">
        <h2>Access Denied</h2>
        <p>You do not have administrator privileges to access this page.</p>
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <p>Welcome back, Admin {user?.email}</p>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="stats-cards">
            <div className="stat-card">
              <h3>Total Appointments</h3>
              <p className="stat-number">{stats.totalAppointments}</p>
              <Link to="/manage-appointments" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </div>
            
            <div className="stat-card highlight">
              <h3>Pending Appointments</h3>
              <p className="stat-number">{stats.pendingAppointments}</p>
              <Link to="/manage-appointments?status=pending" className="btn btn-sm btn-primary">
                Review
              </Link>
            </div>
            
            <div className="stat-card">
              <h3>Total Users</h3>
              <p className="stat-number">{stats.totalUsers}</p>
            </div>
            
            <div className="stat-card">
              <h3>Total Doctors</h3>
              <p className="stat-number">{stats.totalDoctors}</p>
            </div>
            
            <div className="stat-card">
              <h3>Total Hospitals</h3>
              <p className="stat-number">{stats.totalHospitals}</p>
            </div>
          </div>

          <div className="admin-quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <Link to="/manage-appointments" className="btn btn-primary">
                Manage Appointments
              </Link>
              <Link to="/emergency-settings" className="btn btn-danger">
                Emergency Settings
              </Link>
              <Link to="/hospitals" className="btn btn-info">
                View Hospitals
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;