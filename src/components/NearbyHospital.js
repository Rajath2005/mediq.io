import { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Star, ChevronRight, Search, Loader } from 'lucide-react';
import './NearbyHospital.css';

// Mock data for demonstration purposes
// In a real implementation, this would come from Google Maps API
const mockHospitals = [
  {
    id: 1,
    name: "City General Hospital",
    distance: "1.2 km",
    address: "123 Main Street, City Center",
    phone: "+1 555-123-4567",
    emergency: true,
    rating: 4.7,
    openNow: true,
    services: ["Emergency", "ICU", "Pediatrics", "Cardiology"]
  },
  {
    id: 2,
    name: "Community Medical Center",
    distance: "2.5 km",
    address: "456 Oak Avenue, Downtown",
    phone: "+1 555-987-6543",
    emergency: true,
    rating: 4.3,
    openNow: true,
    services: ["Emergency", "Orthopedics", "Neurology"]
  },
  {
    id: 3,
    name: "Sunshine Hospital & Research",
    distance: "3.8 km",
    address: "789 Sunshine Blvd, Eastside",
    phone: "+1 555-789-0123",
    emergency: false,
    rating: 4.9,
    openNow: false,
    services: ["Cancer Care", "Surgery", "Rehabilitation"]
  },
  {
    id: 4,
    name: "Riverside Medical Facility",
    distance: "4.1 km",
    address: "321 River Road, Westside",
    phone: "+1 555-456-7890",
    emergency: true,
    rating: 4.1,
    openNow: true,
    services: ["Emergency", "Trauma Center", "Pediatrics"]
  }
];

export default function NearbyHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEmergency, setFilterEmergency] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHospitals(mockHospitals);
      setLoading(false);
    }, 1500);
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
                        <span>{hospital.distance} • {hospital.address}</span>
                      </div>
                    </div>
                    <div className="hospital-rating">
                      <Star />
                      {hospital.rating}
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
                    <div className="hospital-detail-ratings">
                      <Star />
                      <span className="rating-value">{hospital.rating}</span>
                      <span>•</span>
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
                          <p>{hospital.distance} from your location</p>
                          <button className="action-link">
                            Get Directions
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="services-section">
                    <h3>Available Services</h3>
                    <div className="service-tags">
                      {hospital.services.map((service, idx) => (
                        <span key={idx} className="service-tag">
                          {service}
                        </span>
                      ))}
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
                  
                  <div className="map-container">
                    Google Maps would display here with hospital location
                  </div>
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
}