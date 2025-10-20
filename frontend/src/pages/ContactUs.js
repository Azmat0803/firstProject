import React from 'react';
import './ContactUs.css';

function ContactUs() {
  const openGoogleMaps = () => {
    window.open('https://maps.app.goo.gl/p4a5PqJYCBuQqt1k8', '_blank');
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/918976109352', '_blank');
  };

  const openInstagram = () => {
    window.open('https://instagram.com/ruwad_caps', '_blank');
  };

  const sendEmail = () => {
    window.location.href = 'mailto:ruwadcaps@gmail.com';
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>Get in touch with our team for any inquiries</p>
      </div>

      <div className="container">
        <section className="contact-section">
          <div className="contact-grid">
            {/* Left side - contact info */}
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>
                We're here to help! Reach out to us through any of the following channels 
                and our team will get back to you as soon as possible.
              </p>

              <div className="contact-methods">
                <div className="contact-method" onClick={sendEmail}>
                  <div className="method-icon">📧</div>
                  <div className="method-details">
                    <h4>Email Us</h4>
                    <p>ruwadcaps@gmail.com</p>
                  </div>
                </div>

                <div className="contact-method" onClick={openWhatsApp}>
                  <div className="method-icon">💬</div>
                  <div className="method-details">
                    <h4>WhatsApp</h4>
                    <p>+918976109352</p>
                  </div>
                </div>

                <div className="contact-method" onClick={openInstagram}>
                  <div className="method-icon">📱</div>
                  <div className="method-details">
                    <h4>Instagram</h4>
                    <p>@ruwad_caps</p>
                  </div>
                </div>

                <div className="contact-method" onClick={openGoogleMaps}>
                  <div className="method-icon">📍</div>
                  <div className="method-details">
                    <h4>Visit Us</h4>
                    <p>Click to view location on Google Maps</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - map */}
            <div className="contact-map">
              <h3>Our Location</h3>
              <div className="map-container">
                <iframe
                  title="Google Maps Location"
                  src="https://maps.google.com/maps?q=city+basera+mominpura+pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: '10px' }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
              <button onClick={openGoogleMaps} className="btn btn-primary map-btn">
                Open in Google Maps
              </button>
            </div>
          </div>
        </section>

        <section className="business-hours">
          <h2>Business Hours</h2>
          <div className="hours-grid">
            <div className="hours-item">
              <span className="day">Monday - Friday</span>
              <span className="time">9:00 AM - 6:00 PM</span>
            </div>
            <div className="hours-item">
              <span className="day">Saturday</span>
              <span className="time">10:00 AM - 4:00 PM</span>
            </div>
            <div className="hours-item">
              <span className="day">Sunday</span>
              <span className="time">Closed</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactUs;
