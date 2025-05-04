// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from '../contexts/AuthContext';
import './Login.css';
import useDocumentTitle from "../hooks/useDocumentTitle";
import AlertMessage from "./AlertMessage";

const Login = () => {
  useDocumentTitle('Login or Sign Up - Start Your Health Journey | MediQ');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  
  const from = location.state?.from || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await signIn(email, password);
      if (error) throw error;

      if (data?.user) {
        navigate(from);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) throw error;
      
      // The redirect will happen automatically, but we'll navigate anyway if we're still here
      if (data) navigate('/');
    } catch (error) {
      console.error("Google login error:", error);
      setError(error.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;
      
      // The redirect will happen automatically, but we'll navigate anyway if we're still here
      if (data) navigate('/');
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setError(error.message || `Failed to sign in with ${provider}`);
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
        <AlertMessage type="success" message="Password reset instructions have been sent to your email." />
      ) : (
        <>
          <div className="oauth-buttons">
            <button
              className="oauth-btn github"
              onClick={() => handleOAuthLogin("github")}
            >
              Continue with GitHub
            </button>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="google-sign-in-button"
              disabled={loading}
            >
              Sign in with Google
            </button>
            <button
              className="oauth-btn linkedin"
              onClick={() => handleOAuthLogin("linkedin")}
            >
              Continue with LinkedIn
            </button>
          </div>
          <div className="divider">or</div>
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
