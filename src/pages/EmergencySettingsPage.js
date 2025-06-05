import React, { useEffect, useState, useCallback } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {
  FaPlus,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaSave,
  FaHospital,
  FaPhone,
  FaSms
} from 'react-icons/fa';


const EmergencySettingsPage = () => {
  const [smsNumber, setSmsNumber] = useState('');
  const [entries, setEntries] = useState([{ hospitalName: '', ambulanceNumber: '' }]);
  const [loading, setLoading] = useState(false);
  const [allSettings, setAllSettings] = useState([]);
  const [showAllSettings, setShowAllSettings] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [navigate]);

  const userId = auth.currentUser?.uid;

  const fetchSettings = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const docRef = doc(db, 'emergency_settings', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setSmsNumber(data.sms_number || '');
        setEntries(data.entries || [{ hospitalName: '', ambulanceNumber: '' }]);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      Swal.fire('Error', 'Failed to fetch emergency settings. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (authChecked && userId) {
      fetchSettings();
    }
  }, [authChecked, userId, fetchSettings]);

  const handleEntryChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      Swal.fire('Error', 'You must be logged in to save settings', 'error');
      return;
    }

    setLoading(true);

    try {
      await setDoc(doc(db, 'emergency_settings', userId), {
        sms_number: smsNumber,
        entries: entries.filter(e => e.hospitalName && e.ambulanceNumber)
      });

      Swal.fire({
        icon: 'success',
        title: 'Saved!',
        text: 'Emergency settings updated successfully',
        showConfirmButton: false,
        timer: 1500
      });

      if (showAllSettings) fetchAllSettings();
    } catch (error) {
      console.error('Error saving settings:', error);
      Swal.fire('Error', 'Failed to save settings. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSettings = async () => {
    if (!userId) {
      Swal.fire('Error', 'You must be logged in to view settings', 'error');
      return;
    }

    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'emergency_settings'));
      const settings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllSettings(settings);
    } catch (error) {
      console.error('Fetch error:', error);
      Swal.fire('Error', 'Failed to fetch all settings. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowAllSettings = async () => {
    if (!showAllSettings) await fetchAllSettings();
    setShowAllSettings(!showAllSettings);
  };

  const handleDeleteSetting = async (id) => {
    if (!userId) {
      Swal.fire('Error', 'You must be logged in to delete settings', 'error');
      return;
    }

    const result = await Swal.fire({
      title: 'Delete this contact?',
      text: "This action cannot be undone",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete'
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, 'emergency_settings', id));
        fetchAllSettings();
        Swal.fire('Deleted!', 'Contact removed successfully', 'success');
      } catch (error) {
        console.error('Delete error:', error);
        Swal.fire('Error', 'Failed to delete contact. Please try again.', 'error');
      }
    }
  };

  if (!authChecked) {
    return (
      <div className="container-fluid py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5 emergency-settings-container">
      <div className="w-100 px-3">
        <div className="card shadow-sm w-100 emergency-card-full">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Emergency Settings</h3>
            <button className="btn btn-light btn-sm" onClick={toggleShowAllSettings}>
              {showAllSettings ? <><FaEyeSlash /> Hide</> : <><FaEye /> View All</>}
            </button>
          </div>

          <div className="card-body">
            {showAllSettings && (
              <div className="mb-4">
                <h5 className="card-title mb-3 d-flex align-items-center">
                  <FaHospital className="text-primary me-2" /> All Emergency Contacts
                </h5>

                {loading ? (
                  <div className="text-center p-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : allSettings.length === 0 ? (
                  <div className="alert alert-info">No emergency contacts found</div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Hospital</th>
                          <th>Ambulance</th>
                          <th>SMS</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {allSettings.map((setting) => (
                          <tr key={setting.id}>
                            <td>{setting.entries?.[0]?.hospitalName}</td>
                            <td>{setting.entries?.[0]?.ambulanceNumber}</td>
                            <td>{setting.sms_number}</td>
                            <td>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleDeleteSetting(setting.id)}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <hr className="my-4" />
              </div>
            )}

            <h5 className="card-title mb-3">Add Emergency Contacts</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label d-flex align-items-center">
                  <FaSms className="text-primary me-2" /> SMS Recipient Number
                </label>
                <div className="input-group">
                  <span className="input-group-text"><FaPhone /></span>
                  <input
                    type="text"
                    className="form-control"
                    value={smsNumber}
                    onChange={(e) => setSmsNumber(e.target.value)}
                    placeholder="Enter SMS number for emergency alerts"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label d-flex align-items-center">
                  <FaHospital className="text-primary me-2" /> Ambulance Contacts
                </label>

                {entries.map((entry, index) => (
                  <div key={index} className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Hospital Name"
                      value={entry.hospitalName}
                      onChange={(e) => handleEntryChange(index, 'hospitalName', e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ambulance Number"
                      value={entry.ambulanceNumber}
                      onChange={(e) => handleEntryChange(index, 'ambulanceNumber', e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => entries.length > 1 && setEntries(entries.filter((_, i) => i !== index))}
                      disabled={entries.length === 1}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm mt-2"
                  onClick={() => setEntries([...entries, { hospitalName: '', ambulanceNumber: '' }])}
                >
                  <FaPlus /> Add Another Contact
                </button>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="me-2" /> Save Settings
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencySettingsPage;
