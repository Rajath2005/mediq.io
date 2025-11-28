import React, { useState, useEffect } from 'react';
import './Contact.css';
import Button from '../components/Button';
import useDocumentTitle from '../hooks/useDocumentTitle';
import AlertMessage from '../components/AlertMessage'; // adjust the path as needed
import { db } from '../firebase'; // Import Firestore instance
import { collection, addDoc } from 'firebase/firestore';

const Contact = () => {
  useDocumentTitle('Contact Us - AyuDost');

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'danger'

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'messages'), formData);
      setStatus('✅ Message sent successfully!');
      setAlertType('success');
      setFormData({ fullname: '', email: '', message: '' });
    } catch (error) {
      console.error('Firestore submission error:', error);
      setStatus('❌ Failed to send message. Please try again.');
      setAlertType('danger');
    }
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <article className="contact" data-page="contact">
      <h1 className="article-title">Contact Us</h1>

      <section className="contact-form">
        <h3 className="h3 form-title">Contact Form</h3>

        {/* Bootstrap Alert */}
        {status && <AlertMessage type={alertType} message={status} />}

        <form className="form" onSubmit={handleSubmit} data-form>
          <div className="input-wrapper">
            <input
              type="text"
              name="fullname"
              className="form-input"
              placeholder="Full name"
              value={formData.fullname}
              onChange={handleChange}
              required
              data-form-input
            />
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              data-form-input
            />
          </div>

          <textarea
            name="message"
            className="form-input"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            data-form-input
          ></textarea>

          <Button
            className="contact-submit-button"
            type="submit"
            data-form-btn
            text="Send Message"
          />
        </form>
      </section>

      <section className="mapbox" data-mapbox>
        <figure>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.96964260091!2d75.18195149280423!3d12.780482458704421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4bd112e521305%3A0xc08171b778a56885!2sVivekananda%20College%20of%20Engineering%20%26%20Technology%2C%20Puttur!5e0!3m2!1sen!2sin!4v1744008708213!5m2!1sen!2sin"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          ></iframe>
        </figure>
      </section>
    </article>
  );
};

export default Contact;
