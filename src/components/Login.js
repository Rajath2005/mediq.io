// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data: { user }, error: loginError } = await signIn(email, password);
      if (loginError) throw loginError;

      // Fetch user's profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      // Update user metadata
      if (profileData) {
        const { error: updateError } = await supabase.auth.updateUser({
          data: {
            full_name: profileData.full_name,
            avatar_url: profileData.avatar_url
          }
        });

        if (updateError) throw updateError;
      }

      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });
      
      if (error) throw error;
    } catch (error) {
      setError(error.message);
      console.error("Google login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please enter your email address to reset password");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setResetSent(true);
      setError(null);
      alert("Password reset instructions have been sent to your email.");
    } catch (error) {
      setError(error.message);
      alert("Password reset failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {resetSent ? (
        <div className="success-message">
          Password reset instructions have been sent to your email.
        </div>
      ) : (
        <>
          <button 
            type="button" 
            onClick={handleGoogleSignIn}
            className="google-sign-in-button"
            disabled={loading}
          >
            Sign in with Google
          </button>
          <div className="divider">or</div>
          <form onSubmit={handleLogin}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
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
              />
            </div>
            <button type="submit" className="button button-login" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="auth-links">
              <button 
                type="button" 
                onClick={handlePasswordReset}
                className="reset-link"
                disabled={loading}
              >
                Forgot password?
              </button>
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
