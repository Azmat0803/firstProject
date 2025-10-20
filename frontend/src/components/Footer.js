import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3>RUWAD CAPS</h3>
          <p>Premium manufacturer of caps, t-shirts, aprons, totes, bags and more.</p>
          <p>Quality B2B solutions for your business.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Find Us Here</h4>
          <p>
            Basement, City Basera Heights,<br />
            Mominpura, Ganj Peth,<br />
            Pune - 411043
          </p>
        </div>

        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="https://wa.me/918976109352" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-whatsapp"></i> WhatsApp
            </a>
            <a href="https://instagram.com/ruwad_caps" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="mailto:ruwadcaps@gmail.com" className="social-icon">
              <i className="fas fa-envelope"></i> Email
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 RUWAD CAPS. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
