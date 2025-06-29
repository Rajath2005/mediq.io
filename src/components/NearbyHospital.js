import { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, ChevronRight, Search, Loader } from 'lucide-react';
// Removed Google Maps imports
import './NearbyHospital.css';

// Mock data without coordinates
const mockHospitals = [
  {
    id: 1,
    name: "Puttur City Hospital",
    address: "APMC ROAD, Puttur, Karnataka 574201",
    phone: "08251237781",
    website: "https://putturcityhospital.com",
    emergency: true,
    openNow: true,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.2580543772438!2d75.20450717507288!3d12.761746387534648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4bd7f2febf221%3A0x192dd87687137c09!2sPuttur%20City%20Hospital!5e0!3m2!1sen!2sin!4v1751177643751!5m2!1sen!2sin"
  },
  {
    id: 2,
    name: "Dhanvanthari Hospital",
    address: "Q656+F87, Main Road, Kallare, Puttur, Karnataka 574201",
    phone: "08251230327",
    website: "https://communitymedicalcenter.org",
    emergency: true,
    openNow: true,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.3054580195753!2d75.20823457454338!3d12.758664319512027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4bd85b9b63b1b%3A0xa96b8e2425c289ec!2sDhanvanthari%20Hospital!5e0!3m2!1sen!2sin!4v1751177839215!5m2!1sen!2sin"
  },
  {
    id: 3,
    name: "Adarsha Hospital",
    address: "Q685+35P, APMC ROAD, Puttur, Karnataka 574201",
    phone: "08251235065",
    website: "http://www.adarshahospital.com",
    emergency: true,
    openNow: true,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15565.220235889466!2d75.20050974031243!3d12.758690267634078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4bd9b6fd6a97b%3A0x9aeba6c7f7e9e871!2sAdarsha%20Hospital!5e0!3m2!1sen!2sin!4v1751177950197!5m2!1sen!2sin"
  },
  {
    id: 4,
    name: "Government General Hospital",
    address: "Government Hospital, Puttur, Karnataka 574201",
    phone: "+1 555-456-7890",
    website: "Not Available",
    emergency: true,
    openNow: true,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.30879669416!2d75.19779207454347!3d12.75844721951673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4bd78bd6e3de5%3A0x83551d459619db4c!2sGovernment%20General%20Hospital!5e0!3m2!1sen!2sin!4v1751178035689!5m2!1sen!2sin"
  }
];

export default function NearbyHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEmergency, setFilterEmergency] = useState(false);

  useEffect(() => {
    // No location logic needed, just set hospitals
    setHospitals(mockHospitals);
    setLoading(false);
  }, []);

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEmergency = filterEmergency ? hospital.emergency : true;
    return matchesSearch && matchesEmergency;
  });

  const handleCallNow = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="nearby-hospitals-container">
      <div className="header-section">
        <h2>Nearby Hospitals</h2>
        <p>Find emergency services and medical facilities near you</p>
      </div>

      <div className="search-section">
        <div className="search-input-container">
          <Search />
          <input
            type="text"
            placeholder="Search by name or location"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="emergency-filter">
          <input
            type="checkbox"
            id="emergency-filter"
            checked={filterEmergency}
            onChange={() => setFilterEmergency(!filterEmergency)}
          />
          <label htmlFor="emergency-filter">Emergency Services Only</label>
        </div>
      </div>

      <div className="hospitals-wrapper">
        <div className="hospitals-list">
          {loading ? (
            <div className="loading-state">
              <Loader className="loading-spinner" />
              <span>Finding nearby hospitals...</span>
            </div>
          ) : filteredHospitals.length === 0 ? (
            <div className="empty-state">
              No hospitals found matching your criteria
            </div>
          ) : (
            <div>
              {filteredHospitals.map(hospital => (
                <div
                  key={hospital.id}
                  className={`hospital-card ${selectedHospital === hospital.id ? 'selected' : ''}`}
                  onClick={() => setSelectedHospital(hospital.id)}
                >
                  <div className="hospital-card-header">
                    <div>
                      <h3 className="hospital-name">{hospital.name}</h3>
                      <div className="hospital-location">
                        <MapPin />
                        <span>{hospital.address}</span>
                      </div>
                    </div>
                    <div className="website-link">
                      {hospital.website && hospital.website !== "Not Available" && (
                        <a href={hospital.website} target="_blank" rel="noopener noreferrer">
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="badges-container">
                    {hospital.emergency && (
                      <span className="badge badge-emergency">
                        Emergency
                      </span>
                    )}
                    <span className={`badge ${hospital.openNow ? 'badge-open' : 'badge-closed'}`}>
                      {hospital.openNow ? 'Open Now' : 'Closed'}
                    </span>
                  </div>

                  <div className="hospital-card-footer">
                    <button
                      className="call-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCallNow(hospital.phone);
                      }}
                    >
                      <Phone />
                      Call Now
                    </button>
                    <ChevronRight className="chevron-icon" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hospital-details">
          {selectedHospital ? (
            <>
              {hospitals.filter(h => h.id === selectedHospital).map(hospital => (
                <div key={hospital.id}>
                  <div className="hospital-detail-header">
                    <h2 className="hospital-detail-name">{hospital.name}</h2>
                    <div className="hospital-detail-status">
                      <span className={hospital.openNow ? 'open-status' : 'closed-status'}>
                        {hospital.openNow ? 'Open Now' : 'Currently Closed'}
                      </span>
                    </div>
                  </div>

                  <div className="info-card">
                    <h3>Contact Information</h3>
                    <div>
                      <div className="contact-item">
                        <Phone />
                        <div>
                          <p className="contact-detail">{hospital.phone}</p>
                          <button
                            className="action-link"
                            onClick={() => handleCallNow(hospital.phone)}
                          >
                            Call Now
                          </button>
                        </div>
                      </div>
                      <div className="contact-item">
                        <MapPin />
                        <div>
                          <p>{hospital.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="emergency-card">
                    <h3>
                      <Clock />
                      Emergency Response
                    </h3>
                    <p>
                      In case of emergency, call {hospital.phone} for immediate assistance.
                      Their ambulance service is available 24/7.
                    </p>
                  </div>

                  {/* Map section for each hospital - update src for each hospital as needed */}
                  <section className="mapbox" data-mapbox>
                    <figure>
                      <iframe
                        src={hospital.mapEmbedUrl}
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps Location"
                      ></iframe>
                    </figure>
                  </section>
                </div>
              ))}
            </>
          ) : (
            <div className="empty-details">
              <MapPin />
              <p>Select a hospital to view details</p>
              <p>
                Get detailed information about facilities, services, and emergency contact numbers
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};