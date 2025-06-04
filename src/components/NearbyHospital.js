import { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, ChevronRight, Search, Loader } from 'lucide-react';
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
    website: "https://putturcityhospital.com",
    emergency: true,
    openNow: true
  },
  {
    id: 2,
    name: "Dhanvanthari Hospital",
    coordinates: {
      lat: 12.727848,  // Updated coordinates for Kallare, Puttur
      lng: 75.217483
    },
    address: "Q656+F87, Main Road, Kallare, Puttur, Karnataka 574201",
    phone: "08251230327",
    website: "https://communitymedicalcenter.org",
    emergency: true,
    openNow: true
  },
  {
    id: 3,
    name: "Adarsha Hospital",
    coordinates: {
      lat: 12.7651833,
      lng: 75.2077486
    },
    address: "Q685+35P, APMC ROAD, Puttur, Karnataka 574201",
    phone: "08251235065",
    website: "http://www.adarshahospital.com",
    emergency: true,
    openNow: true
  },
  {
    id: 4,
    name: "Government General Hospital",
    coordinates: {
      lat: 12.758442,
      lng: 75.2000854
    },
    address: "Government Hospital, Puttur, Karnataka 574201",
    phone: "+1 555-456-7890",
    website: "Not Available",
    emergency: true,
    openNow: true
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
  const [mapError, setMapError] = useState(null);

  const onMapError = (error) => {
    setMapError('Failed to load Google Maps. Please check your internet connection.');
    console.error('Google Maps Error:', error);
  };

  // Get user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(userCoords);
        setMapCenter(userCoords);
        setLocationError(null);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocationError('Could not get your location. Using default location instead.');
        // Fallback to Uppinangady as reference point
        const referencePoint = {
          lat: 12.864564,
          lng: 75.322145
        };
        setUserLocation(referencePoint);
        setMapCenter(referencePoint);
      }
    );
  }, []);

  // Calculate distance between two coordinates in kilometers
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;

    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 10) / 10;
  };

  useEffect(() => {
    if (userLocation) {
      const hospitalsWithDistance = mockHospitals.map(hospital => {
        const distanceInKm = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          hospital.coordinates.lat,
          hospital.coordinates.lng
        );
        return { ...hospital, distance: distanceInKm.toFixed(1) + " km" };
      });

      hospitalsWithDistance.sort((a, b) => {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
      });

      setHospitals(hospitalsWithDistance);
      setLoading(false);
    }
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
                    <div className="website-link">
                      {hospital.website && (
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
                    {mapError ? (
                      <div className="map-error">
                        <p>{mapError}</p>
                      </div>
                    ) : (
                      <LoadScript 
                        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE"}
                        onError={onMapError}
                      >
                        <GoogleMap
                          mapContainerStyle={mapContainerStyle}
                          center={mapCenter}
                          zoom={15}
                        >
                          {mapCenter && <Marker position={mapCenter} />}
                        </GoogleMap>
                      </LoadScript>
                    )}
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