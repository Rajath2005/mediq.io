// src/components/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import './Login.css';
import useDocumentTitle from "../hooks/useDocumentTitle";
import AlertMessage from "./AlertMessage";

const AdminLogin = () => {
  useDocumentTitle('Admin Login - MediQ Administration');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signInAdmin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await signInAdmin(email, password);
      if (error) throw error;

      if (data?.user) {
        navigate('/manage-appointments');
      }
    } catch (error) {
      console.error("Admin login error:", error);
      setError(error.message || "Failed to log in. Please check your credentials or admin status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container admin-login">
      <h2>Admin Login</h2>
      <div className="admin-badge">
        <span>Administrator Access Only</span>
      </div>
      
      <form onSubmit={handleLogin}>
        {error && <AlertMessage type="danger" message={error} />}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            placeholder="Admin email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            placeholder="Admin password"
          />
        </div>
        <button type="submit" className="button button-login admin-login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Admin Login"}
        </button>
        <div className="auth-links">
          <p>
            Regular user? <Link to="/login">User Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;