// src/pages/PrivacyPolicy/PrivacyPolicy.js
import React, { useState } from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = ({ onAccept }) => {
  const [agree, setAgree] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setScrolledToBottom(true);
    }
  };

  const handleAccept = () => {
    if (agree && scrolledToBottom) {
      localStorage.setItem('privacyAccepted', 'true');
      onAccept?.();
      window.location.href = '/';
    } else {
      alert('Please scroll through and agree to the Privacy Policy to continue.');
    }
  };

  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-content scrollable" onScroll={handleScroll}>
        <h1>MediQ Privacy Policy</h1>
        <p className="last-updated"><strong>Last Updated: April 9, 2025</strong></p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to MediQ. We understand the importance of your personal information, 
            particularly when it comes to health data. This Privacy Policy explains how 
            we collect, use, disclose, and safeguard your information when you use our 
            website and services.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Personal Information</h3>
          <p>We may collect personally identifiable information, such as:</p>
          <ul>
            <li>Full name</li>
            <li>Contact information (email address, phone number, mailing address)</li>
            <li>Date of birth</li>
            <li>Gender</li>
            <li>Insurance information</li>
            <li>Payment details</li>
          </ul>

          <h3>2.2 Health Information</h3>
          <p>We may collect health-related information, including:</p>
          <ul>
            <li>Medical history</li>
            <li>Current health conditions</li>
            <li>Medications</li>
            <li>Treatment plans</li>
            <li>Activity and health metrics</li>
            <li>Appointment information</li>
          </ul>

          <h3>2.3 Technical Information</h3>
          <p>When you use our website, we automatically collect:</p>
          <ul>
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Usage data</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To process appointments and reminders</li>
            <li>To monitor and improve health outcomes</li>
            <li>To communicate with you about your health</li>
            <li>To improve our website and services</li>
            <li>To process payments</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>4. HIPAA Compliance</h2>
          <p>
            MediQ is committed to complying with the Health Insurance Portability and 
            Accountability Act (HIPAA). We implement physical, technical, and administrative 
            safeguards to protect your health information as required by HIPAA.
          </p>
        </section>

        <section>
          <h2>5. Data Sharing and Disclosure</h2>
          
          <h3>5.1 Healthcare Providers</h3>
          <p>
            With your consent, we may share your health information with healthcare 
            providers involved in your care.
          </p>

          <h3>5.2 Service Providers</h3>
          <p>
            We may share information with third-party vendors who help us operate our 
            website and services, such as hosting providers, payment processors, and 
            analytics services. These providers are contractually obligated to protect 
            your information.
          </p>

          <h3>5.3 Legal Requirements</h3>
          <p>
            We may disclose your information when required by law, such as in response 
            to a court order, subpoena, or other legal process.
          </p>
        </section>

        <section>
          <h2>6. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal and health 
            information from unauthorized access, alteration, disclosure, or destruction. 
            However, no method of transmission over the Internet or electronic storage is 
            100% secure.
          </p>
        </section>

        <section>
          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your information</li>
            <li>Restrict or object to processing</li>
            <li>Data portability</li>
            <li>Withdraw consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information in Section 11.
          </p>
        </section>

        <section>
          <h2>8. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 18 without 
            parental consent. We do not knowingly collect information from children under 
            18 without verifiable parental consent.
          </p>
        </section>

        <section>
          <h2>9. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience 
            on our website. You can manage your cookie preferences through your browser 
            settings.
          </p>
        </section>

        <section>
          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of 
            any changes by posting the new Privacy Policy on this page and updating the 
            "Last Updated" date.
          </p>
        </section>

        <section>
          <h2>11. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please 
            contact us at:
          </p>
          <div className="contact-info">
            <p><strong>MediQ</strong></p>
            <p>Email: privacy@mediq.io</p>
            <p>Address: [Your Physical Address]</p>
            <p>Phone: [Your Phone Number]</p>
          </div>
        </section>

        <section>
          <h2>12. Consent</h2>
          <p>
            By using our website and services, you consent to this Privacy Policy.
          </p>
        </section>
      </div>

      <div className="accept-controls">
        <label>
          <input 
            type="checkbox" 
            checked={agree} 
            onChange={(e) => setAgree(e.target.checked)} 
          /> I agree to the terms and conditions
        </label>
        <button onClick={handleAccept} disabled={!agree || !scrolledToBottom}>
          Accept & Continue
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
