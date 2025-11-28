import React, { useEffect } from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="privacy-page">
      <div className="privacy-container">
        {/* Sidebar Navigation */}
        <aside className="privacy-sidebar">
          <h3 className="sidebar-title">Table of Contents</h3>
          <nav>
            <ul className="sidebar-nav">
              <li><button onClick={() => scrollToSection('introduction')} className="nav-link">Introduction</button></li>
              <li><button onClick={() => scrollToSection('data-collection')} className="nav-link">Data Collection</button></li>
              <li><button onClick={() => scrollToSection('usage')} className="nav-link">How We Use Data</button></li>
              <li><button onClick={() => scrollToSection('cookies')} className="nav-link">Cookies & Tracking</button></li>
              <li><button onClick={() => scrollToSection('security')} className="nav-link">Data Security</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="nav-link">Contact Us</button></li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="privacy-content">
          <div className="page-header">
            <h1 className="page-title">Privacy Policy</h1>
            <p className="last-updated">Last Updated: November 28, 2025</p>
          </div>

          <section id="introduction" className="policy-section">
            <h2 className="section-title">Introduction</h2>
            <p className="policy-text">
              Welcome to AyuDost. We value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
            </p>
            <p className="policy-text">
              By accessing or using AyuDost, you agree to the terms of this Privacy Policy. If you do not agree with these terms, please do not use our services.
            </p>
          </section>

          <section id="data-collection" className="policy-section">
            <h2 className="section-title">Information We Collect</h2>
            <p className="policy-text">We collect several types of information to provide and improve our service to you:</p>
            <ul className="policy-list">
              <li><strong>Personal Data:</strong> While using our service, we may ask you to provide us with certain personally identifiable information, such as your email address, name, and phone number.</li>
              <li><strong>Usage Data:</strong> We may also collect information on how the service is accessed and used, including your computer's Internet Protocol (IP) address, browser type, and pages visited.</li>
            </ul>
          </section>

          <section id="usage" className="policy-section">
            <h2 className="section-title">How We Use Your Data</h2>
            <p className="policy-text">AyuDost uses the collected data for various purposes:</p>
            <ul className="policy-list">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our service</li>
            </ul>
          </section>

          <section id="cookies" className="policy-section">
            <h2 className="section-title">Cookies and Tracking</h2>
            <p className="policy-text">
              We use cookies and similar tracking technologies to track the activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </p>
            <p className="policy-text">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
          </section>

          <section id="security" className="policy-section">
            <h2 className="section-title">Data Security</h2>
            <p className="policy-text">
              The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          <section id="contact" className="policy-section">
            <h2 className="section-title">Contact Us</h2>
            <p className="policy-text">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="policy-list">
              <li>By email: support@ayudost.ai</li>
              <li>By visiting the contact page on our website</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;