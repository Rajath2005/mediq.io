import { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Star, ChevronRight, Search, Loader } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './NearbyHospital.css';

// Mock data with coordinates
const mockHospitals = [
  {
    id: 1,
    name: "Puttur City Hospital",
    coordinates: {
      lat: 12.7619122,  // Puttur coordinates
      lng: 75.2066932
    },
    address: "APMC ROAD, Puttur, Karnataka 574201",
    phone: "08251237781",
    emergency: true,
    rating: 4.7,
    openNow: true,
    services: ["Emergency", "ICU", "Pediatrics", "Cardiology"]
  },
  {
    id: 2,
    name: "Community Medical Center",
    coordinates: {
      lat: 12.7640,
      lng: 75.2030
    },
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
    coordinates: {
      lat: 12.7650,
      lng: 75.2040
    },
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
    coordinates: {
      lat: 12.7660,
      lng: 75.2050
    },
    address: "321 River Road, Westside",
    phone: "+1 555-456-7890",
    emergency: true,
    rating: 4.1,
    openNow: true,
    services: ["Emergency", "Trauma Center", "Pediatrics"]
  }
];

const mapContainerStyle = {
  width: '100%',
  height: '200px'
};

export default function NearbyHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEmergency, setFilterEmergency] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);

  // Calculate distance between two coordinates in kilometers
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Get user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setLocationError("Unable to retrieve your location");
          console.error("Error getting location:", error);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
    }
  }, []);

  useEffect(() => {
    // Simulate API call and calculate distances
    setTimeout(() => {
      const hospitalsWithDistance = mockHospitals.map(hospital => {
        let distance = "Unknown";
        if (userLocation) {
          const distanceInKm = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            hospital.coordinates.lat,
            hospital.coordinates.lng
          );
          distance = distanceInKm.toFixed(1) + " km";
        }
        return { ...hospital, distance };
      });

      // Sort hospitals by distance
      hospitalsWithDistance.sort((a, b) => {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
      });

      setHospitals(hospitalsWithDistance);
      setLoading(false);
    }, 1500);
  }, [userLocation]);

  useEffect(() => {
    if (selectedHospital) {
      const hospital = hospitals.find(h => h.id === selectedHospital);
      if (hospital) {
        setMapCenter(hospital.coordinates);
      }
    }
  }, [selectedHospital, hospitals]);

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEmergency = filterEmergency ? hospital.emergency : true;
    return matchesSearch && matchesEmergency;
  });

  const handleCallNow = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleGetDirections = (hospital) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${hospital.coordinates.lat},${hospital.coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="nearby-hospitals-container">
      <div className="header-section">
        <h2>Nearby Hospitals</h2>
        <p>Find emergency services and medical facilities near you</p>
        {locationError && (
          <div className="location-error">
            {locationError}
          </div>
        )}
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
                          <button 
                            className="action-link"
                            onClick={() => handleGetDirections(hospital)}
                          >
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
                    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={mapCenter}
                        zoom={15}
                      >
                        {mapCenter && <Marker position={mapCenter} />}
                      </GoogleMap>
                    </LoadScript>
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