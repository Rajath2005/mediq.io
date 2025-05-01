import React, { useState, useEffect } from "react";
/* eslint-disable-next-line no-unused-vars */
import { FaDirections, FaPhone, FaClock, FaStar, FaHeart, FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./AyurvedicShops.css";

// Individual Shop Card Component
const AyurvedicShopCard = ({ shop }) => {
  const [isSaved, setIsSaved] = useState(false);
  
  // Handle save/bookmark functionality
  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    // Here you would implement logic to save to localStorage or your backend
  };

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
      </div>
      
      <div className="shop-details">
        <h3 className="shop-name">{shop.name}</h3>
        
        {shop.rating && (
          <div className="shop-rating">
            <FaStar className="rating-star" />
            <span>{shop.rating}</span>
            <span className="rating-count">({shop.ratingCount || 0})</span>
          </div>
        )}
        
        {shop.address && (
          <p className="shop-address">{shop.address}</p>
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

// Main component that shows all shops
const AyurvedaMedicals = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  
  // Sample data - Replace this with your API call or data source
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      try {
        const sampleData = [
          {
            id: 1,
            name: "Patanjali Ayurvedic Center",
            address: "123 Health Street, City Center",
            rating: 4.5,
            ratingCount: 128,
            imageUrl: "https://via.placeholder.com/300x200",
            phone: "+911234567890",
            openingHours: "9:00 AM - 9:00 PM",
            directions: "https://goo.gl/maps/example1"
          },
          {
            id: 2,
            name: "Himalaya Wellness Store",
            address: "456 Natural Avenue, Green Park",
            rating: 4.2,
            ratingCount: 95,
            imageUrl: null,
            phone: "+919876543210",
            openingHours: "10:00 AM - 8:00 PM",
            directions: "https://goo.gl/maps/example2"
          },
          {
            id: 3,
            name: "Kerala Ayurveda Pharmacy",
            address: "789 Herbal Lane, South District",
            rating: 4.7,
            ratingCount: 152,
            imageUrl: "https://via.placeholder.com/300x200",
            phone: "+917890123456",
            openingHours: "8:00 AM - 7:00 PM",
            directions: "https://goo.gl/maps/example3"
          },
          {
            id: 4,
            name: "Sri Sri Ayurveda",
            address: "101 Wellness Road, East End",
            rating: 4.3,
            ratingCount: 87,
            imageUrl: null,
            phone: "+914567890123",
            openingHours: "9:30 AM - 8:30 PM"
          },
          {
            id: 5,
            name: "Ancient Remedies Center",
            address: "202 Traditional Plaza, West Side",
            rating: 4.0,
            ratingCount: 63,
            imageUrl: "https://via.placeholder.com/300x200",
            openingHours: "10:00 AM - 7:00 PM"
          }
        ];
        
        setShops(sampleData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch shop data. Please try again later.");
        setLoading(false);
      }
    }, 1000);
  }, []);

  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(filter.toLowerCase()) ||
    (shop.address && shop.address.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="ayurvedic-shops-container">
      <div className="shops-header">
        <h2>Ayurvedic Medical Shops Near You</h2>
        <p>Find authentic Ayurvedic medicines and wellness products from these trusted stores</p>
        
        <div className="shops-search">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      
      {loading ? (
        <div className="shops-loading">
          <div className="loading-spinner"></div>
          <p>Finding Ayurvedic shops near you...</p>
        </div>
      ) : error ? (
        <div className="shops-error">
          <p>{error}</p>
          <button 
            onClick={() => {setLoading(true); /* Retry fetch logic here */}}
            className="retry-btn"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="shops-count">
            <p>Found {filteredShops.length} shops in your area</p>
          </div>
          
          <div className="shops-grid">
            {filteredShops.length > 0 ? (
              filteredShops.map(shop => (
                <AyurvedicShopCard key={shop.id} shop={shop} />
              ))
            ) : (
              <div className="no-shops-found">
                <p>No shops match your search. Try different keywords.</p>
              </div>
            )}
          </div>
        </>
      )}
      
      <div className="shops-footer">
        <p>Know an Ayurvedic shop not listed here?</p>
        <Link to="/suggest-shop" className="suggest-shop-btn">
          Suggest a Shop
        </Link>
      </div>
    </div>
  );
};

export default AyurvedaMedicals;