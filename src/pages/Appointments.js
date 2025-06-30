import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Appointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) {
        setAppointments([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const q = query(
          collection(db, "appointments"),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        setAppointments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  return (
    <div className="container mt-5">
      <div className="mb-10" style={{
        position: 'fixed',
        left: '20px',
        top: '100px',
        zIndex: 1000
      }}>
        <button
          className="btn btn-outline-success btn-lg"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      <h2>My Appointments</h2>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Upcoming Appointments</h5>
          <div className="list-group">
            {loading ? (
              <div className="list-group-item">Loading...</div>
            ) : appointments.length === 0 ? (
              <div className="list-group-item">No appointments scheduled</div>
            ) : (
              appointments.map(appt => (
                <div className="list-group-item" key={appt.id}>
                  <strong>Doctor:</strong> {appt.doctor} <br />
                  <strong>Date:</strong> {appt.date} <br />
                  <strong>Time:</strong> {appt.time} <br />
                  <strong>Hospital:</strong> {appt.hospitalId}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
