import React, { useState } from 'react';
import axios from 'axios';
import './Enquiry.css';

function Enquiry() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post('http://localhost:5000/api/inquiries', formData);
      
      setStatus({
        type: 'success',
        message: 'Thank you for your enquiry! We will get back to you soon.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enquiry-page">
      <div className="enquiry-hero">
        <h1>Request a Quote</h1>
        <p>Fill out the form below and we'll get back to you shortly</p>
      </div>

      <div className="container">
        <section className="enquiry-section">
          <div className="enquiry-grid">
            <div className="enquiry-info">
              <h2>Why Request a Quote?</h2>
              <ul className="benefits-list">
                <li>
                  <span className="icon">✓</span>
                  <span>Get personalized pricing for bulk orders</span>
                </li>
                <li>
                  <span className="icon">✓</span>
                  <span>Discuss custom design requirements</span>
                </li>
                <li>
                  <span className="icon">✓</span>
                  <span>Learn about available materials and options</span>
                </li>
                <li>
                  <span className="icon">✓</span>
                  <span>Receive timeline estimates for your project</span>
                </li>
                <li>
                  <span className="icon">✓</span>
                  <span>Get expert advice from our team</span>
                </li>
              </ul>

              <div className="contact-options">
                <h3>Prefer to contact us directly?</h3>
                <div className="quick-contacts">
                  <a href="mailto:ruwadcaps@gmail.com" className="quick-contact">
                    📧 ruwadcaps@gmail.com
                  </a>
                  <a href="https://wa.me/8976109352" target="_blank" rel="noopener noreferrer" className="quick-contact">
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>
            </div>

            <div className="enquiry-form-container">
              <form onSubmit={handleSubmit} className="enquiry-form">
                {status.message && (
                  <div className={`alert alert-${status.type}`}>
                    {status.message}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+918976109352"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Bulk Order Enquiry"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your requirements..."
                    rows="6"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Sending...' : 'Submit Enquiry'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Enquiry;