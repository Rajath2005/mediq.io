import React, { useEffect, useState } from 'react';
import { supabase2 } from '../supabaseClient2';
import Swal from 'sweetalert2';
import { FaPlus, FaTrash, FaEye, FaEyeSlash, FaSave, FaHospital, FaPhone, FaSms } from 'react-icons/fa';

const EmergencySettingsPage = () => {
  const [smsNumber, setSmsNumber] = useState('');
  const [entries, setEntries] = useState([{ hospitalName: '', ambulanceNumber: '' }]);
  const [loading, setLoading] = useState(false);
  const [allSettings, setAllSettings] = useState([]);
  const [showAllSettings, setShowAllSettings] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await supabase2
        .from('emergency_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (data) {
        setSmsNumber(data.sms_number || '');
        setEntries(data.entries || [{ hospitalName: '', ambulanceNumber: '' }]);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleEntryChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // First, update the SMS number in the main record
      const { error: smsError } = await supabase2
        .from('emergency_settings')
        .upsert({
          id: 1,
          sms_number: smsNumber
        });
      
      if (smsError) {
        console.error("SMS update error:", smsError);
        throw smsError;
      }
  
      // Then save each hospital entry as a separate record
      for (const entry of entries) {
        if (entry.hospitalName && entry.ambulanceNumber) {
          const { error: entryError } = await supabase2
            .from('emergency_settings')
            .upsert({  // Using upsert instead of insert
              sms_number: smsNumber,
              hospital_name: entry.hospitalName,
              ambulance_numbers: entry.ambulanceNumber
            });
          
          if (entryError) {
            console.error("Entry save error:", entryError);
            throw entryError;
          }
        }
      }
  
      Swal.fire({
        icon: 'success',
        title: 'Saved!',
        text: 'Emergency settings updated successfully',
        showConfirmButton: false,
        timer: 1500
      });
      
      if (showAllSettings) fetchAllSettings();
    } catch (error) {
      console.error("Full error details:", error);
      Swal.fire('Error', error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSettings = async () => {
    setLoading(true);
    try {
      const { data } = await supabase2.from('emergency_settings').select('*');
      setAllSettings(data || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowAllSettings = async () => {
    if (!showAllSettings) await fetchAllSettings();
    setShowAllSettings(!showAllSettings);
  };

  const handleDeleteSetting = async (id) => {
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
        await supabase2.from('emergency_settings').delete().eq('id', id);
        fetchAllSettings();
        Swal.fire('Deleted!', 'Contact removed successfully', 'success');
      } catch (error) {
        Swal.fire('Error', error.message, 'error');
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h3 className="mb-0">Emergency Settings</h3>
              <button 
                className="btn btn-light btn-sm"
                onClick={toggleShowAllSettings}
              >
                {showAllSettings ? <><FaEyeSlash /> Hide</> : <><FaEye /> View All</>}
              </button>
            </div>
            
            <div className="card-body">
              {/* All Settings View */}
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
                              <td>{setting.hospital_name}</td>
                              <td>{setting.ambulance_number}</td>
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

              {/* Add New Contact Form */}
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
    </div>
  );
};

export default EmergencySettingsPage;