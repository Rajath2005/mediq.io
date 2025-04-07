import React from 'react';
import './Contact.css';
import Button from '../components/Button';

const Contact = () => {
  return (
    <article className="contact" data-page="contact">
      <header>
        <h1 className="h2 article-title">Contact Us</h1>
      </header>

      <section className="mapbox" data-mapbox>
        <figure>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.96964260091!2d75.18195149280423!3d12.780482458704421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4bd112e521305%3A0xc08171b778a56885!2sVivekananda%20College%20of%20Engineering%20%26%20Technology%2C%20Puttur!5e0!3m2!1sen!2sin!4v1744008708213!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          ></iframe>
        </figure>
      </section>

      <section className="contact-form">
        <h3 className="h3 form-title">Contact Form</h3>

        <form
          action="https://formspree.io/f/xovjllal" // Replace with your Formspree endpoint!
          method="POST"
          className="form"
          data-form
        >
          <div className="input-wrapper">
            <input
              type="text"
              name="fullname"
              className="form-input"
              placeholder="Full name"
              required
              data-form-input
            />

            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address"
              required
              data-form-input
            />
          </div>

          <textarea
            name="message"
            className="form-input"
            placeholder="Your Message"
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
    </article>
  );
};

export default Contact;
