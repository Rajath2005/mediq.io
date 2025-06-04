// src/components/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './Signup.css';
import useDocumentTitle from "../hooks/useDocumentTitle";


const Signup = () => {
  useDocumentTitle('Login or Sign Up - Start Your Health Journey | MediQ');

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      if (result.user) {
        // Create user profile in Firestore
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          full_name: result.user.displayName,
          created_at: new Date().toISOString()
        });
        
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
      console.error("Google signup error:", error);
    } finally {
      setLoading(false);
    }
  };  const handleOAuthLogin = async (providerName) => {
    try {
      setLoading(true);
      let provider;
      
      if (providerName === 'github') {
        provider = new GithubAuthProvider();
      } else if (providerName === 'linkedin') {
        // LinkedIn auth is not directly supported by Firebase
        setError("LinkedIn authentication is not available");
        return;
      }
      
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
      console.error(`${providerName} login error:`, error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Create a user profile in Firestore
      if (userCredential.user) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          full_name: `${firstName} ${lastName}`.trim(),
          first_name: firstName,
          last_name: lastName,
          email: email,
          created_at: new Date().toISOString()
        });

        // Redirect to home page
        navigate("/");
      }

    } catch (error) {
      setError(error.message);
      console.error("Sign up error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create New Account</h2>
      <div className="oauth-buttons">
            <button
              className="oauth-btn github"
              onClick={() => handleOAuthLogin("github")}
            >
              Continue with GitHub
            </button>
            <button 
              type="button" 
              onClick={handleGoogleSignUp}
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
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="button button-signup" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p className="auth-link">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default Signup;
