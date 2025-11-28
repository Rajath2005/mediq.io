import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Clock,
  ChevronRight,
  Search,
  Loader,
  Navigation,
  Map,
} from "lucide-react";
import "./NearbyHospital.css";

// Static hospitals list (you can later change names to Ayurvedic ones)
const mockHospitals = [
  {
    id: 1,
    name: "Puttur City Hospital",
    address: "APMC ROAD, Puttur, Karnataka 574201",
    phone: "08251237781",
    website: "https://putturcityhospital.com",
    emergency: true,
    openNow: true,
    lat: 12.7617,
    lon: 75.2045,
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.2580543772438!2d75.20450717507288!3d12.761746387534648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4bd7f2febf221%3A0x192dd87687137c09!2sPuttur%20City%20Hospital!5e0!3m2!1sen!2sin!4v1751177643751!5m2!1sen!2sin",
  },
  {
    id: 2,
    name: "Dhanvanthari Hospital",
    address: "Main Road, Kallare, Puttur, Karnataka 574201",
    phone: "08251230327",
    website: "https://communitymedicalcenter.org",
    emergency: true,
    openNow: true,
    lat: 12.7586,
    lon: 75.2082,
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.3054580195753!2d75.20823457454338!3d12.758664319512027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4bd85b9b63b1b%3A0xa96b8e2425c289ec!2sDhanvanthari%20Hospital!5e0!3m2!1sen!2sin!4v1751177839215!5m2!1sen!2sin",
  },
  {
    id: 3,
    name: "Adarsha Hospital",
    address: " APMC ROAD, Puttur, Karnataka 574201",
    phone: "08251235065",
    website: "http://www.adarshahospital.com",
    emergency: true,
    openNow: true,
    lat: 12.7587,
    lon: 75.2005,
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15565.220235889466!2d75.20050974031243!3d12.758690267634078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4bd9b6fd6a97b%3A0x9aeba6c7f7e9e871!2sAdarsha%20Hospital!5e0!3m2!1sen!2sin!4v1751177950197!5m2!1sen!2sin",
  },
  {
    id: 4,
    name: "Government General Hospital",
    address: "Government Hospital, Puttur, Karnataka 574201",
    phone: "08251XXXXXX",
    website: "Not Available",
    emergency: true,
    openNow: true,
    lat: 12.7584,
    lon: 75.1978,
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.30879669416!2d75.19779207454347!3d12.75844721951673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4bd78bd6e3de5%3A0x83551d459619db4c!2sGovernment%20General%20Hospital!5e0!3m2!1sen!2sin!4v1751178035689!5m2!1sen!2sin",
  },
];

// Utils
const deg2rad = (deg) => deg * (Math.PI / 180);

const getDistanceKm = (lat1, lon1, lat2, lon2) => {
  if (
    lat1 == null ||
    lon1 == null ||
    lat2 == null ||
    lon2 == null ||
    Number.isNaN(lat1) ||
    Number.isNaN(lon1) ||
    Number.isNaN(lat2) ||
    Number.isNaN(lon2)
  )
    return null;

  const R = 6371; // km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const formatDistance = (km) => {
  if (km == null) return null;
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
};

export default function NearbyHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEmergency, setFilterEmergency] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle"); // idle | requesting | granted | denied | unsupported

  useEffect(() => {
    setHospitals(mockHospitals);
  }, []);

  // Ask for location on first load
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocationStatus("unsupported");
      setLocationError("Geolocation is not supported by this browser.");
      setLoading(false);
      return;
    }

    setLocationStatus("requesting");
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });
        setLocationStatus("granted");
        setLocationError(null);
        setLoading(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLocationStatus("denied");

        if (err.code === 1) {
          setLocationError("Location access denied. Showing static nearby hospitals.");
        } else if (err.code === 2) {
          setLocationError("Unable to determine your location. Check GPS or network.");
        } else if (err.code === 3) {
          setLocationError("Location request timed out. You can retry below.");
        } else {
          setLocationError("Something went wrong while accessing your location.");
        }

        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const handleRetryLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationStatus("unsupported");
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    setLocationStatus("requesting");
    setLocationError(null);
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });
        setLocationStatus("granted");
        setLocationError(null);
        setLoading(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLocationStatus("denied");
        setLoading(false);
        setLocationError("Still couldn't access location. Showing static list.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Attach distance + sort
  const hospitalsWithDistance = hospitals
    .map((h) => {
      const distanceKm = userLocation
        ? getDistanceKm(userLocation.lat, userLocation.lon, h.lat, h.lon)
        : null;
      return { ...h, distanceKm };
    })
    .sort((a, b) => {
      const da = a.distanceKm ?? Infinity;
      const db = b.distanceKm ?? Infinity;
      return da - db;
    });

  const filteredHospitals = hospitalsWithDistance.filter((hospital) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      hospital.name.toLowerCase().includes(q) ||
      hospital.address.toLowerCase().includes(q);
    const matchesEmergency = filterEmergency ? hospital.emergency : true;
    return matchesSearch && matchesEmergency;
  });

  const handleCallNow = (phone) => {
    if (!phone || phone === "Not Available") return;
    window.location.href = `tel:${phone}`;
  };

  const renderLocationStatusText = () => {
    if (locationStatus === "requesting") return "Requesting location permission…";
    if (locationStatus === "granted" && userLocation)
      return `Using your current location (${userLocation.lat.toFixed(
        3
      )}, ${userLocation.lon.toFixed(3)})`;
    if (locationStatus === "denied")
      return "Location permission denied. Sorting based on static list.";
    if (locationStatus === "unsupported")
      return "Geolocation not supported. Showing static hospitals.";
    return "Allow location to sort hospitals by distance.";
  };

  return (
    <div className="nearby-hospitals-container">
      {/* Clean, professional header */}
      <div className="hospital-hero">
        <div className="hero-inner hero-inner-compact">
          <div className="hero-text-block">
            <h1>Nearby Ayurvedic & Multi-Speciality Hospitals</h1>
            <p>
              Search hospitals around Puttur and, if you allow location, we’ll sort them by
              distance to you.
            </p>

            <div className="hero-actions-row">
              <button
                onClick={handleRetryLocation}
                className="use-location-btn primary"
                disabled={locationStatus === "requesting"}
              >
                <Navigation size={18} />
                {locationStatus === "requesting"
                  ? "Locating you…"
                  : "Use my current location"}
              </button>

              <div className="hero-status-pill">
                <span className="status-dot" />
                <span>{renderLocationStatusText()}</span>
              </div>
            </div>

            {locationError && <p className="location-error">{locationError}</p>}
          </div>
        </div>
      </div>

      <div className="main-content-wrapper">
        {/* Search & Filter */}
        <div className="search-section">
          <div className="search-input-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search hospitals by name or area…"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="emergency-filter">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={filterEmergency}
                onChange={() => setFilterEmergency(!filterEmergency)}
              />
              <span className="slider round"></span>
            </label>
            <span className="filter-label">Emergency only</span>
          </div>
        </div>

        <div className="hospitals-layout">
          {/* List View */}
          <div className="hospitals-list">
            {loading && locationStatus === "requesting" ? (
              <div className="loading-state">
                <Loader className="loading-spinner" />
                <span>Locating you and sorting nearby hospitals…</span>
              </div>
            ) : filteredHospitals.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon-bg">
                  <Search size={32} />
                </div>
                <h3>No hospitals found</h3>
                <p>Try adjusting search or filters.</p>
              </div>
            ) : (
              <div className="cards-grid">
                {filteredHospitals.map((hospital, index) => {
                  const distanceLabel = formatDistance(hospital.distanceKm);
                  const isNearest = index === 0 && distanceLabel;

                  return (
                    <div
                      key={hospital.id}
                      className={`hospital-card ${
                        selectedHospital === hospital.id ? "selected" : ""
                      }`}
                      onClick={() => setSelectedHospital(hospital.id)}
                    >
                      <div className="hospital-card-header">
                        <h3 className="hospital-name">{hospital.name}</h3>
                        <div className="hospital-location">
                          <MapPin size={14} className="location-icon" />
                          <span>{hospital.address}</span>
                        </div>
                      </div>

                      {/* Distance + badges row – separate from buttons so no overlap */}
                      <div className="hospital-meta-row">
                        <div className="meta-left">
                          {distanceLabel && (
                            <span className="badge distance-badge">
                              {distanceLabel}
                              {isNearest && (
                                <span className="nearest-label"> • Nearest</span>
                              )}
                            </span>
                          )}
                          {hospital.emergency && (
                            <span className="badge badge-emergency">Emergency</span>
                          )}
                        </div>
                        <div className="meta-right">
                          <span
                            className={`badge ${
                              hospital.openNow ? "badge-open" : "badge-closed"
                            }`}
                          >
                            {hospital.openNow ? "Open now" : "Closed"}
                          </span>
                        </div>
                      </div>

                      <div className="hospital-card-footer">
                        <button
                          className="call-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCallNow(hospital.phone);
                          }}
                        >
                          <Phone size={16} />
                          Call
                        </button>
                        <button
                          className="details-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedHospital(hospital.id);
                          }}
                        >
                          Details <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Details Sidebar */}
          {selectedHospital && (
            <div className="hospital-details-sidebar">
              {hospitalsWithDistance
                .filter((h) => h.id === selectedHospital)
                .map((hospital) => (
                  <div key={hospital.id} className="details-content">
                    <div className="details-header">
                      <button
                        className="close-details"
                        onClick={() => setSelectedHospital(null)}
                      >
                        ×
                      </button>
                      <h2>{hospital.name}</h2>
                      <span className={hospital.openNow ? "status-open" : "status-closed"}>
                        {hospital.openNow ? "Open Now" : "Closed"}
                      </span>
                    </div>

                    <div className="details-body">
                      <div className="info-section">
                        <h3>Contact & Location</h3>

                        <div className="contact-row">
                          <div className="icon-box">
                            <Phone size={18} />
                          </div>
                          <div className="contact-text">
                            <span className="label">Phone</span>
                            <span className="value">{hospital.phone}</span>
                          </div>
                          <button
                            className="action-icon-btn"
                            onClick={() => handleCallNow(hospital.phone)}
                          >
                            Call
                          </button>
                        </div>

                        <div className="contact-row">
                          <div className="icon-box">
                            <MapPin size={18} />
                          </div>
                          <div className="contact-text">
                            <span className="label">Address</span>
                            <span className="value">{hospital.address}</span>
                          </div>
                        </div>
                      </div>

                      <div className="emergency-banner">
                        <div className="emergency-icon">
                          <Clock size={20} />
                        </div>
                        <div className="emergency-text">
                          <h4>Emergency Response</h4>
                          <p>
                            In case of an emergency, call ahead so the hospital can get the
                            emergency team ready.
                          </p>
                        </div>
                      </div>

                      <div className="map-container">
                        <div className="map-header">
                          <Map size={16} /> <span>Location Map</span>
                        </div>
                        <iframe
                          src={hospital.mapEmbedUrl}
                          title="Hospital Location"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>

                      {hospital.website && hospital.website !== "Not Available" && (
                        <a
                          href={hospital.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="visit-website-btn"
                        >
                          Visit official website
                        </a>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
