import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 
import React, { useState } from 'react';
import 'animate.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ADMIN_EMAILS = ["mediq2005@gmail.com"];

export async function signInAdmin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!ADMIN_EMAILS.includes(user.email)) {
      await auth.signOut();
      throw new Error("Unauthorized access: You are not an admin.");
    }

    return { data: { user }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await signIn(email, password);
      if (result.error) {
        setError(result.error.message);
      } else if (result.profile && result.profile.isAdmin) {
        navigate('/admin-dashboard');
      } else {
        setError('Unauthorized access: You are not an admin.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5 p-6 border rounded shadow-sm bg-white animate__animated animate__fadeIn" style={{ maxWidth: 400, maxHeight: 900 }}>
      <h2 className="mb-4 text-center">Admin Login</h2>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Admin Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Logging in..." : "Login as Admin"}
      </button>
      {error && <div className="alert alert-danger mt-3 animate__animated animate__shakeX" role="alert">{error}</div>}
    </form>
  );
};

export default AdminLogin;
