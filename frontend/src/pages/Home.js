import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const products = [
    { name: 'Custom Caps', icon: '🧢' },
    { name: 'T-Shirts', icon: '👕' },
    { name: 'Aprons', icon: '👔' },
    { name: 'Tote Bags', icon: '👜' },
    { name: 'Backpacks', icon: '🎒' },
    { name: 'Custom Bags', icon: '💼' },
    
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to RUWAD CAPS</h1>
          <p>Your Trusted B2B Partner for Premium Custom Merchandise</p>
          <p className="hero-subtitle">
            We manufacture high-quality caps, t-shirts, aprons, totes, uniforms, bags and more for businesses worldwide
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">View Products</Link>
            <Link to="/enquiry" className="btn">Get a Quote</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose RUWAD CAPS?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Quality Materials</h3>
              <p>We use only premium fabrics and materials for all our products</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Custom Branding</h3>
              <p>Full customization options including embroidery, printing, and design</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Bulk Orders</h3>
              <p>Competitive pricing for large B2B orders with fast delivery</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>B2B Expertise</h3>
              <p>Over years of experience serving businesses of all sizes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="products-preview">
        <div className="container">
          <h2>Our Products</h2>
          <div className="products-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-icon">{product.icon}</div>
                <h3>{product.name}</h3>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/products" className="btn btn-primary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Place Your Order?</h2>
          <p>Contact us today for bulk pricing and custom quotes</p>
          <Link to="/enquiry" className="btn btn-primary">Request Quote</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;