import React, { useState } from "react";
import "./SuggestShopForm.css";

const SuggestShopForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    openingHours: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can integrate API or save to database here
    console.log("Shop Suggested:", formData);
    setSubmitted(true);
    setFormData({
      name: "",
      address: "",
      phone: "",
      openingHours: ""
    });
  };

  return (
    <div className="suggest-shop-form">
      <h3>Suggest an Ayurvedic Shop</h3>
      {submitted ? (
        <p className="thank-you-message">Thank you for your suggestion!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Shop Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="openingHours"
            placeholder="Opening Hours"
            value={formData.openingHours}
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      )}
    </div>
  );
};

export default SuggestShopForm;
