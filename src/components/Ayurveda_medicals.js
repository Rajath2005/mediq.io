import React, { useState, useEffect } from "react";
/* eslint-disable-next-line no-unused-vars */
import { FaDirections, FaPhone, FaClock, FaHeart, FaBookmark } from "react-icons/fa";
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

      <div className="shop-details">        <h3 className="shop-name">{shop.name}</h3>

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
            name: "Apollo Pharmacy Temple Road Puttur",
            address: "Ground Floor, GL Complex, No. 2-952, Main Road, near Shri Laxmi Venkatramana Temple, Puttur, Karnataka 574201",
            imageUrl: "https://res.cloudinary.com/dacpbywfp/image/upload/v1749030981/Apollo_ugzwzy.jpg",
            phone: "082512 95020",
            openingHours: "7:00 AM - 11:00 PM",
            directions: "https://g.co/kgs/p2HCGJw"
          },
          {
            id: 2, 
            name: "Shri Mahalasa Medical",
            address: "Puttur, Karnataka 574201",
            imageUrl: "https://res.cloudinary.com/dacpbywfp/image/upload/v1749031060/Shri_mahalasa_medical_zhzm9x.jpg",
            phone: " 090087 18777",
            openingHours: "Closes 9 PM",
            directions: "https://g.co/kgs/FMXSGD4"
          },
          {
            id: 3,
             name: "Swastik Medical",
            address: "V2XV+HP6, Baddakatta, Bantwal, Karnataka 574211",
            imageUrl: "https://res.cloudinary.com/dacpbywfp/image/upload/v1749031028/Swastik_medical_y9ubti.jpg",
            phone: "Phone Number is Missing",
            openingHours: "Closes 7 PM",
            directions: "https://g.co/kgs/XMQqfts"
          },
          {
            id: 4, 
            name: "Sharada Medical",
            address: " 1-2 Nellikatte, Main Road, Puttur, Karnataka 574201",
            imageUrl: "https://res.cloudinary.com/dacpbywfp/image/upload/v1749031066/Sharada_medical_dvejgj.jpg",
            phone: " 09900617656",
            openingHours: "Closes 8 PM"
          },
          {
            id: 5,
             name: "Krishna Medicals",
            address: "Puttur, Karnataka 574201",
            imageUrl: "https://res.cloudinary.com/dacpbywfp/image/upload/v1749031210/Krishna_medical_fvktvo.jpg",
            openingHours: null
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
            onClick={() => { setLoading(true); /* Retry fetch logic here */ }}
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