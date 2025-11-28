import React, { useState } from "react";
/* eslint-disable-next-line no-unused-vars */
import { FaDirections, FaPhone, FaClock, FaHeart, FaBookmark, FaMapMarkerAlt, FaLocationArrow, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./AyurvedicShops.css";

const AyurvedicShopCard = ({ shop, userLocation }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  // Calculate distance if user location and shop location are available
  const getDistance = () => {
    if (!userLocation || !shop.lat || !shop.lon) return null;

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(shop.lat - userLocation.lat);
    const dLon = deg2rad(shop.lon - userLocation.lon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(userLocation.lat)) * Math.cos(deg2rad(shop.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km

    return d < 1 ? `${(d * 1000).toFixed(0)} m` : `${d.toFixed(1)} km`;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const distance = getDistance();

  return (
    <div className="shop-card">
      <div className="shop-image-container">
        {shop.imageUrl ? (
          <img src={shop.imageUrl} alt={shop.name} className="shop-image" />
        ) : (
          <div className="shop-image-placeholder">
            <span>No Image Available</span>
          </div>
        )}
        <button
          className={`bookmark-btn ${isSaved ? 'saved' : ''}`}
          onClick={handleSave}
          aria-label={isSaved ? "Remove from saved" : "Save for later"}
        >
          <FaBookmark />
        </button>
        {distance && (
          <div className="distance-badge">
            <FaLocationArrow className="distance-icon" />
            {distance}
          </div>
        )}
      </div>

      <div className="shop-details">
        <h3 className="shop-name">{shop.name}</h3>

        {shop.address && (
          <p className="shop-address">
            <FaMapMarkerAlt className="address-icon" />
            {shop.address}
          </p>
        )}

        {shop.openingHours && (
          <div className="shop-hours">
            <FaClock className="shop-icon" />
            <span>{shop.openingHours}</span>
          </div>
        )}

        <div className="shop-actions">
          {shop.phone && (
            <a
              href={`tel:${shop.phone}`}
              className="shop-action-btn call-btn"
              aria-label={`Call ${shop.name}`}
            >
              <FaPhone /> Call
            </a>
          )}

          <a
            href={shop.directions || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + ' ' + (shop.address || ''))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shop-action-btn directions-btn"
            aria-label={`Get directions to ${shop.name}`}
          >
            <FaDirections /> Directions
          </a>
        </div>
      </div>
    </div>
  );
};

// Main component that shows all shops here
const AyurvedaMedicals = () => {
  // Default sample data with approximate coordinates for Puttur, Karnataka
  const defaultShops = [
    {
      id: 1,
      name: "Apollo Pharmacy Temple Road Puttur",
      address: "Ground Floor, GL Complex, No. 2-952, Main Road, near Shri Laxmi Venkatramana Temple, Puttur, Karnataka 574201",
      imageUrl: "https://res.cloudinary.com/dacpbywfp/image/upload/v1749030981/Apollo_ugzwzy.jpg",
      phone: "082512 95020",
      openingHours: "7:00 AM - 11:00 PM",
      directions: "https://g.co/kgs/p2HCGJw",
      lat: 12.7685,
      lon: 75.2026
    },
    {
      id: 2,
      name: "Shri Mahalasa Medical",
      address: "Puttur, Karnataka 574201",
      imageUrl: "https://res.cloudinary.com/dacpbywfp/image/upload/v1749031060/Shri_mahalasa_medical_zhzm9x.jpg",
      phone: " 090087 18777",
      openingHours: "Closes 9 PM",
      directions: "https://g.co/kgs/FMXSGD4",
      lat: 12.7650,
      lon: 75.2050
    },
    {
      id: 3,
      name: "Swastik Medical",
      address: "V2XV+HP6, Baddakatta, Bantwal, Karnataka 574211",
      imageUrl: "https://res.cloudinary.com/dacpbywfp/image/upload/v1749031028/Swastik_medical_y9ubti.jpg",
      phone: "Phone Number is Missing",
      openingHours: "Closes 7 PM",
      directions: "https://g.co/kgs/XMQqfts",
      lat: 12.8950,
      lon: 75.0350
    },
    {
      id: 4,
      name: "Sharada Medical",
      address: " 1-2 Nellikatte, Main Road, Puttur, Karnataka 574201",
      imageUrl: "https://res.cloudinary.com/dacpbywfp/image/upload/v1749031066/Sharada_medical_dvejgj.jpg",
      phone: " 09900617656",
      openingHours: "Closes 8 PM",
      lat: 12.7700,
      lon: 75.2000
    },
    {
      id: 5,
      name: "Krishna Medicals",
      address: "Puttur, Karnataka 574201",
      imageUrl: "https://res.cloudinary.com/dacpbywfp/image/upload/v1749031210/Krishna_medical_fvktvo.jpg",
      openingHours: null,
      lat: 12.7660,
      lon: 75.2040
    }
  ];

  const [fetchedShops, setFetchedShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);

  // Function to fetch shops from Overpass API
  const fetchShops = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      // Query for nodes with "Ayurveda" in the name OR healthcare=alternative within 10km (10000m)
      const query = `
        [out:json];
        (
          node["name"~"Ayurveda",i](around:10000,${lat},${lon});
          node["healthcare"="alternative"](around:10000,${lat},${lon});
          way["name"~"Ayurveda",i](around:10000,${lat},${lon});
        );
        out body;
        >;
        out skel qt;
      `;

      const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.elements && data.elements.length > 0) {
        const apiShops = data.elements.filter(el => el.tags && el.tags.name).map((el, index) => ({
          id: el.id,
          name: el.tags.name,
          address: el.tags["addr:full"] || el.tags["addr:street"] ? `${el.tags["addr:street"] || ''} ${el.tags["addr:city"] || ''}` : "Address not available",
          // Use a random placeholder image from the sample set or a generic one
          imageUrl: [
            "https://res.cloudinary.com/dacpbywfp/image/upload/v1749030981/Apollo_ugzwzy.jpg",
            "https://res.cloudinary.com/dacpbywfp/image/upload/v1749031060/Shri_mahalasa_medical_zhzm9x.jpg",
            "https://res.cloudinary.com/dacpbywfp/image/upload/v1749031028/Swastik_medical_y9ubti.jpg",
            "https://res.cloudinary.com/dacpbywfp/image/upload/v1749031066/Sharada_medical_dvejgj.jpg",
            "https://res.cloudinary.com/dacpbywfp/image/upload/v1749031210/Krishna_medical_fvktvo.jpg"
          ][index % 5],
          phone: el.tags.phone || el.tags["contact:phone"] || "Phone number not available",
          openingHours: el.tags.opening_hours || "Hours not available",
          directions: `https://www.google.com/maps/search/?api=1&query=${el.lat},${el.lon}`,
          lat: el.lat,
          lon: el.lon
        }));
        setFetchedShops(apiShops);
      } else {
        setFetchedShops([]); // Clear fetched shops if none found
        if (!location) {
          console.log("No results from API");
        }
      }
    } catch (err) {
      console.error("Error fetching from Overpass API:", err);
      setError("Failed to fetch shops from the network.");
    } finally {
      setLoading(false);
      setIsSearchingLocation(false);
    }
  };



  const handleUseLocation = () => {
    setLoading(true);
    setLocationError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude, name: "Your Location" });
          fetchShops(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setLocationError("Location access denied. Please search manually.");
          setLoading(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  // Combine default shops and fetched shops
  const allShops = [...defaultShops, ...fetchedShops];

  // Filter based on search input (name or address)
  const filteredShops = allShops.filter(shop =>
    shop.name.toLowerCase().includes(filter.toLowerCase()) ||
    (shop.address && shop.address.toLowerCase().includes(filter.toLowerCase()))
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filter) {
      searchLocationByValue(filter);
    }
  };

  const searchLocationByValue = async (query) => {
    setIsSearchingLocation(true);
    setLoading(true);
    setError(null);
    setLocationError(null);

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setLocation({ lat: parseFloat(lat), lon: parseFloat(lon), name: display_name });
        fetchShops(lat, lon);
      } else {
        setError(`Could not find location: "${query}"`);
        setLoading(false);
        setIsSearchingLocation(false);
      }
    } catch (err) {
      console.error("Error geocoding location:", err);
      setError("Failed to search for location.");
      setLoading(false);
      setIsSearchingLocation(false);
    }
  }

  return (
    <div className="ayurvedic-shops-page">
      {/* Hero Section */}
      <div className="shops-hero">
        <div className="hero-content">
          <h1>Find Authentic Ayurvedic Shops</h1>
          <p>Discover trusted Ayurvedic medical stores near you for all your wellness needs.</p>

          {!location && (
            <button onClick={handleUseLocation} className="use-location-btn">
              <FaLocationArrow /> Use My Current Location
            </button>
          )}

          {location && (
            <div className="active-location-badge">
              <FaMapMarkerAlt /> Near: {location.name}
              <button onClick={() => { setLocation(null); setFetchedShops([]); }} className="clear-location">
                (Change)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section-container">
        <form onSubmit={handleSearchSubmit} className="modern-search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for shops or a city (e.g., 'Mumbai')..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
      </div>

      {/* Main Content */}
      <div className="shops-content-container">
        {locationError && (
          <div className="error-banner">
            {locationError}
          </div>
        )}
        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>{isSearchingLocation ? "Searching location..." : "Finding nearby shops..."}</p>
          </div>
        ) : (
          <>
            <div className="results-header">
              <h2>{location ? `Shops Near ${location.name}` : "Recommended Shops"}</h2>
              <span className="results-count">{filteredShops.length} results found</span>
            </div>

            <div className="shops-grid-modern">
              {filteredShops.length > 0 ? (
                filteredShops.map(shop => (
                  <AyurvedicShopCard key={shop.id} shop={shop} userLocation={location} />
                ))
              ) : (
                <div className="empty-state">
                  <p>No shops found matching your criteria.</p>
                  <button onClick={() => setFilter("")} className="clear-filter-btn">Clear Search</button>
                </div>
              )}
            </div>
          </>
        )}

        <div className="shops-footer-modern">
          <p>Don't see your favorite shop?</p>
          <Link to="/suggest-shop" className="suggest-link">Suggest a Shop</Link>
        </div>
      </div>
    </div>
  );
};

export default AyurvedaMedicals;
