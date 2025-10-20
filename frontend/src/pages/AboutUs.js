import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About RUWAD CAPS</h1>
        <p>Your Trusted Partner in Custom Merchandise Manufacturing</p>
      </div>

      <div className="container">
        <section className="about-intro">
          <h2>Who We Are</h2>
          <p>
            RUWAD CAPS is a leading B2B manufacturer specializing in premium quality custom merchandise. 
            We produce caps, t-shirts, aprons, tote bags, backpacks, and various other products tailored 
            to meet the unique branding needs of businesses worldwide.
          </p>
          <p>
            With years of experience in the industry, we have built a reputation for delivering 
            exceptional quality, competitive pricing, and reliable service to our B2B clients.
          </p>
        </section>

        <section className="mission-vision">
          <div className="mv-grid">
            <div className="mv-card">
              <h3>Our Mission</h3>
              <p>
                To provide businesses with high-quality, customizable merchandise that helps them 
                build their brand identity and connect with their customers.
              </p>
            </div>
            <div className="mv-card">
              <h3>Our Vision</h3>
              <p>
                To become the most trusted and preferred B2B manufacturer of custom merchandise, 
                known for innovation, quality, and customer satisfaction.
              </p>
            </div>
          </div>
        </section>

        <section className="why-choose">
          <h2>Why Choose Us?</h2>
          <div className="reasons-grid">
            <div className="reason-item">
              <div className="reason-icon">🏭</div>
              <h4>State-of-the-Art Facility</h4>
              <p>Modern manufacturing equipment ensuring consistent quality</p>
            </div>
            <div className="reason-item">
              <div className="reason-icon">🎨</div>
              <h4>Custom Design Services</h4>
              <p>Expert team to help bring your brand vision to life</p>
            </div>
            <div className="reason-item">
              <div className="reason-icon">⚡</div>
              <h4>Fast Turnaround</h4>
              <p>Quick production and delivery without compromising quality</p>
            </div>
            <div className="reason-item">
              <div className="reason-icon">💰</div>
              <h4>Competitive Pricing</h4>
              <p>Best rates for bulk orders with transparent pricing</p>
            </div>
            <div className="reason-item">
              <div className="reason-icon">✓</div>
              <h4>Quality Assurance</h4>
              <p>Rigorous quality control at every production stage</p>
            </div>
            <div className="reason-item">
              <div className="reason-icon">🤝</div>
              <h4>Dedicated Support</h4>
              <p>Personalized service from inquiry to delivery</p>
            </div>
          </div>
        </section>

        <section className="cta-about">
          <h2>Ready to Work With Us?</h2>
          <p>Let's discuss how we can help grow your brand with quality merchandise</p>
          <Link to="/enquiry" className="btn btn-primary">Get in Touch</Link>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;