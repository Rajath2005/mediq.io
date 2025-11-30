import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';
import Button from '../components/Button';
import useDocumentTitle from '../hooks/useDocumentTitle';
import AlertMessage from '../components/AlertMessage';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaUser,
  FaClock,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

const Contact = () => {
  useDocumentTitle('Contact Us - AyuDost');

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [alertType, setAlertType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Contact information data
  const contactCards = [
    {
      icon: <FaEnvelope />,
      title: 'Email Us',
      info: 'mediq2005@gmail.com',
      subInfo: 'We reply within 24 hours',
      link: 'mailto:mediq2005@gmail.com',
      color: '#3498db'
    },
    {
      icon: <FaPhone />,
      title: 'Call Us',
      info: '+917483975463',
      subInfo: 'Mon-Fri, 9AM-6PM IST',
      link: 'tel:+97483975463',
      color: '#2ecc71'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Visit Us',
      info: 'Puttur, Karnataka',
      subInfo: 'India - 574203',
      link: '#map',
      color: '#e74c3c'
    },
    {
      icon: <FaClock />,
      title: 'Office Hours',
      info: 'Monday - Friday',
      subInfo: '9:00 AM - 6:00 PM IST',
      link: null,
      color: '#f39c12'
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: 'How quickly will I receive a response?',
      answer: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.'
    },
    {
      question: 'What information should I include in my message?',
      answer: 'Please provide your full name, email address, and a detailed description of your inquiry. The more specific you are, the better we can assist you.'
    },
    {
      question: 'Do you offer phone support?',
      answer: 'Yes! Our phone support is available Monday through Friday, 9:00 AM to 6:00 PM IST. Feel free to call us at +91 1234567890.'
    },
    {
      question: 'Can I visit your office in person?',
      answer: 'Absolutely! We welcome visitors at our Puttur office. We recommend scheduling an appointment in advance to ensure someone is available to assist you.'
    },
    {
      question: 'How do you handle my personal information?',
      answer: 'We take privacy seriously. All information submitted through our contact form is encrypted and stored securely. We never share your data with third parties without your consent.'
    }
  ];

  // Social media links
  const socialLinks = [
    { icon: <FaTwitter />, url: 'https://twitter.com/ayudost', label: 'Twitter', color: '#1DA1F2' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/company/ayudost', label: 'LinkedIn', color: '#0077B5' },
    { icon: <FaInstagram />, url: 'https://instagram.com/ayudost', label: 'Instagram', color: '#E4405F' },
    { icon: <FaGithub />, url: 'https://github.com/ayudost', label: 'GitHub', color: '#333' }
  ];

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Name is required';
    } else if (formData.fullname.trim().length < 2) {
      newErrors.fullname = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        timestamp: new Date().toISOString()
      });
      setStatus('✅ Message sent successfully! We\'ll get back to you soon.');
      setAlertType('success');
      setFormData({ fullname: '', email: '', message: '' });
    } catch (error) {
      console.error('Firestore submission error:', error);
      setStatus('❌ Failed to send message. Please try again.');
      setAlertType('danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <motion.article
      className="contact"
      data-page="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.div
        className="contact-hero"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="contact-title">Get In Touch</h1>
        <p className="contact-subtitle">
          We'd love to hear from you. Our team is always here to help.
        </p>
      </motion.div>

      {/* Contact Cards Grid */}
      <motion.section
        className="contact-cards-grid"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {contactCards.map((card, index) => (
          <motion.a
            key={index}
            href={card.link || '#'}
            className="contact-card"
            style={{ '--card-color': card.color }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            onClick={(e) => !card.link && e.preventDefault()}
          >
            <div className="contact-card-icon">{card.icon}</div>
            <h3 className="contact-card-title">{card.title}</h3>
            <p className="contact-card-info">{card.info}</p>
            <p className="contact-card-subinfo">{card.subInfo}</p>
          </motion.a>
        ))}
      </motion.section>

      {/* Main Content Grid */}
      <div className="contact-main-grid">
        {/* Contact Form */}
        <motion.section
          className="contact-form-section"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="contact-form-container">
            <h2 className="section-title">Send Us a Message</h2>
            <p className="section-description">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            {status && <AlertMessage type={alertType} message={status} />}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullname" className="form-label">
                  <FaUser className="label-icon" /> Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  className={`form-input ${errors.fullname ? 'input-error' : ''}`}
                  placeholder="John Doe"
                  value={formData.fullname}
                  onChange={handleChange}
                />
                {errors.fullname && (
                  <span className="error-message">{errors.fullname}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <FaEnvelope className="label-icon" /> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={`form-input form-textarea ${errors.message ? 'input-error' : ''}`}
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                />
                <div className="textarea-footer">
                  {errors.message && (
                    <span className="error-message">{errors.message}</span>
                  )}
                  <span className="character-count">
                    {formData.message.length} / 500
                  </span>
                </div>
              </div>

              <Button
                className="contact-submit-btn"
                type="submit"
                text={isSubmitting ? 'Sending...' : 'Send Message'}
                disabled={isSubmitting}
              />
            </form>

            {/* Social Media Links */}
            <div className="social-links-section">
              <p className="social-title">Connect with us</p>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ '--social-color': social.color }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          className="faq-section"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-description">
            Quick answers to common questions about contacting us.
          </p>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <button
                  className={`faq-question ${activeAccordion === index ? 'active' : ''}`}
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={activeAccordion === index}
                >
                  <span>{faq.question}</span>
                  {activeAccordion === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <AnimatePresence>
                  {activeAccordion === index && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Map Section */}
      <motion.section
        className="mapbox"
        id="map"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="map-header">
          <h2 className="section-title">Find Us Here</h2>
          <p className="section-description">
            Visit our office or get directions to reach us easily
          </p>
        </div>

        <div className="map-wrapper">
          <figure className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.96964260091!2d75.18195149280423!3d12.780482458704421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4bd112e521305%3A0xc08171b778a56885!2sVivekananda%20College%20of%20Engineering%20%26%20Technology%2C%20Puttur!5e0!3m2!1sen!2sin!4v1744008708213!5m2!1sen!2sin"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            />
          </figure>

          {/* Address Card Overlay */}
          <motion.div
            className="address-card"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="address-card-header">
              <FaMapMarkerAlt className="address-icon" />
              <h3>Our Location</h3>
            </div>
            <div className="address-details">
              <p className="address-line">
                <strong>Vivekananda College of Engineering & Technology</strong>
              </p>
              <p className="address-line">Puttur, Karnataka</p>
              <p className="address-line">India - 574203</p>
            </div>
            <motion.a
              href="https://www.google.com/maps/dir//Vivekananda+College+of+Engineering+%26+Technology,+Puttur/@12.780482,75.181951,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="directions-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaMapMarkerAlt /> Get Directions
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </motion.article>
  );
};

export default Contact;
