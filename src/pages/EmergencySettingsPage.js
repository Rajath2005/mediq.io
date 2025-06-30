import React, { useEffect, useState } from 'react';
import { neon } from '@neondatabase/serverless';
import Swal from 'sweetalert2';
import {
  FaPlus, FaTrash, FaEye, FaEyeSlash, FaSave, FaHospital, FaPhone, FaSms
} from 'react-icons/fa';

// ✅ Neon connection string (replace with yours securely in production!)
 const sql = neon('postgresql://emergency_owner:npg_VQbCf3imhr8a@ep-small-shape-a8g2w5tp-pooler.eastus2.azure.neon.tech/emergency?sslmode=require&channel_binding=require');

const EmergencySettingsPage = () => {
  const [smsNumber, setSmsNumber] = useState('');
  const [entries, setEntries] = useState([{ hospitalName: '', ambulanceNumber: '' }]);
  const [loading, setLoading] = useState(false);
  const [allSettings, setAllSettings] = useState([]);
  const [showAllSettings, setShowAllSettings] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const rows = await sql`SELECT * FROM emergency_settings`;
      
      setAllSettings(rows);
    } catch (error) {
      console.error('Fetch error:', error);
      Swal.fire('Error', 'Failed to fetch emergency settings.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
       for (const entry of entries) {
       await sql`
         INSERT INTO emergency_settings (sms_number, hospital_name, ambulance_number)
        VALUES (${smsNumber}, ${entry.hospitalName}, ${entry.ambulanceNumber})
       `;
       }
      Swal.fire('Saved!', 'Emergency settings updated.', 'success');
      fetchSettings();
    } catch (error) {
      console.error('Save error:', error);
      Swal.fire('Error', 'Failed to save settings.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSetting = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete this contact?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete'
    });

    if (confirm.isConfirmed) {
      try {
         await sql`DELETE FROM emergency_settings WHERE id = ${id}`;
        fetchSettings();
        Swal.fire('Deleted!', 'Contact removed.', 'success');
      } catch (error) {
        console.error('Delete error:', error);
        Swal.fire('Error', 'Failed to delete contact.', 'error');
      }
    }
  };

  const handleEntryChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const toggleShowAllSettings = async () => {
    if (!showAllSettings) await fetchSettings();
    setShowAllSettings(!showAllSettings);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '20px' }}>
      <div className="shadow bg-white rounded-4 p-4" style={{ width: '100%', maxWidth: '100%' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary">🚑 Emergency Settings</h2>
          <button className="btn btn-outline-primary btn-sm" onClick={toggleShowAllSettings}>
            {showAllSettings ? <><FaEyeSlash /> Hide</> : <><FaEye /> View All</>}
          </button>
        </div>

        {showAllSettings && (
          <>
            <h5>All Emergency Contacts</h5>
            {loading ? (
              <div className="text-center p-4">
                <div className="spinner-border text-primary" role="status"></div>
              </div>
            ) : allSettings.length === 0 ? (
              <div className="alert alert-info">No emergency contacts found</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Hospital</th>
                      <th>Ambulance</th>
                      <th>SMS</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSettings.map((setting) => (
                      <tr key={setting.id}>
                        <td>{setting.hospital_name}</td>
                        <td>{setting.ambulance_number}</td>
                        <td>{setting.sms_number}</td>
                        <td>
                          <button className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteSetting(setting.id)}>
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <hr />
          </>
        )}

        <h5>Add Emergency Contacts</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <FaSms className="text-primary me-2" />SMS Number
            </label>
            <div className="input-group">
              <span className="input-group-text"><FaPhone /></span>
              <input type="text" className="form-control" placeholder="SMS Number"
                value={smsNumber} onChange={(e) => setSmsNumber(e.target.value)} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">
              <FaHospital className="text-primary me-2" />Ambulance Contacts
            </label>
            {entries.map((entry, index) => (
              <div className="input-group mb-2" key={index}>
                <input type="text" className="form-control"
                  placeholder="Hospital Name"
                  value={entry.hospitalName}
                  onChange={(e) => handleEntryChange(index, 'hospitalName', e.target.value)}
                  required />
                <input type="text" className="form-control"
                  placeholder="Ambulance Number"
                  value={entry.ambulanceNumber}
                  onChange={(e) => handleEntryChange(index, 'ambulanceNumber', e.target.value)}
                  required />
                <button type="button" className="btn btn-outline-danger"
                  onClick={() => entries.length > 1 &&
                    setEntries(entries.filter((_, i) => i !== index))}>
                  <FaTrash />
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-outline-secondary btn-sm"
              onClick={() => setEntries([...entries, { hospitalName: '', ambulanceNumber: '' }])}>
              <FaPlus /> Add Another Contact
            </button>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : <><FaSave /> Save Settings</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmergencySettingsPage;
