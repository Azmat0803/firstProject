import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);

  const products = [
    {
      id: 1,
      name: 'Custom Caps',
      category: 'caps',
      description: 'Premium quality caps with custom embroidery and printing options',
      features: ['Multiple colors', 'Adjustable straps', 'Embroidery/Print', 'Bulk discounts'],
      images: [
        '/products/caps/cap-1.jpg',
        '/products/caps/cap-2.jpg',
        '/products/caps/cap-3.jpg',
        '/products/caps/cap-4.jpg',
        '/products/caps/cap-5.jpg',
        '/products/caps/cap-6.jpg',
        '/products/caps/cap-7.jpg',
      ]
    },
    {
      id: 2,
      name: 'T-Shirts',
      category: 'tshirts',
      description: 'Comfortable cotton t-shirts perfect for corporate branding',
      features: ['100% cotton', 'All sizes', 'Screen printing', 'Custom designs'],
      images: [
        '/products/tshirts/tshirt-1.jpg',
        '/products/tshirts/tshirt-2.jpg',
        '/products/tshirts/tshirt-3.jpg'
      ]
    },
    {
      id: 3,
      name: 'Aprons',
      category: 'aprons',
      description: 'Durable aprons for restaurants, cafes, and industrial use',
      features: ['Heavy-duty fabric', 'Multiple pockets', 'Adjustable neck', 'Logo printing'],
      images: [
        '/products/aprons/apron-1.jpg',
        '/products/aprons/apron-2.jpg',
        '/products/aprons/apron-3.jpg',
        '/products/aprons/apron-4.jpg',
        '/products/aprons/apron-5.jpg',
        '/products/aprons/apron-6.jpg',
      ]
    },
    {
      id: 4,
      name: 'Tote Bags',
      category: 'totes',
      description: 'Eco-friendly tote bags for shopping and promotional events',
      features: ['Canvas material', 'Spacious design', 'Custom printing', 'Reusable'],
      images: [
        '/products/totes/tote-1.jpg',
        '/products/totes/tote-2.jpg',
        '/products/totes/tote-3.jpg',
        '/products/totes/tote-4.jpg',
        '/products/totes/tote-5.jpg',
        '/products/totes/tote-6.jpg',
      ]
    },
    {
      id: 5,
      name: 'Backpacks',
      category: 'backpacks',
      description: 'High-quality backpacks for school,colleges,corporate gifts and promotional use',
      features: ['Multiple compartments', 'Padded straps', 'Water resistant', 'Logo options'],
      images: [
        '/products/backpacks/bag-1.jpg',
        '/products/backpacks/bag-2.jpg',
        '/products/backpacks/bag-3.jpg',
        '/products/backpacks/bag-4.jpg',
        '/products/backpacks/bag-5.jpg',
        '/products/backpacks/bag-6.jpg'
        
      ]
    },
    {
  id: 6,
  name: 'Custom Bags',
  category: 'bags',
  description: 'Various bag styles customized for your business needs',
  features: ['Different sizes', 'Premium materials', 'Custom branding', 'Bulk orders'],
  images: [
    '/products/bags/cbag-1.jpg',
    '/products/bags/cbag-2.jpg',
    '/products/bags/cbag-3.jpg',
    '/products/bags/cbag-4.jpg',
    '/products/bags/cbag-5.jpg',
  ]
}
    
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'caps', name: 'Caps' },
    { id: 'tshirts', name: 'T-Shirts' },
    { id: 'aprons', name: 'Aprons' },
    { id: 'totes', name: 'Tote Bags' },
    { id: 'backpacks', name: 'Backpacks' },
    { id: 'bags', name: 'Custom Bags' },
    
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const openLightbox = (image) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <div className="products-page">
      <div className="products-hero">
        <h1>Our Products</h1>
        <p>Premium B2B merchandise solutions for your business</p>
      </div>

      <div className="container">
        {/* Category Filter */}
        <section className="category-filter">
          <h3>Filter by Category:</h3>
          <div className="category-buttons">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="products-section">
          <div className="products-list">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-item">
                {/* Product Images Gallery */}
                <div className="product-gallery">
                  <div className="main-image">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      onClick={() => openLightbox(product.images[0])}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=' + product.name;
                      }}
                    />
                    <div className="image-overlay">
                      <span>Click to view</span>
                    </div>
                  </div>
                  <div className="thumbnail-images">
                    {product.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        onClick={() => openLightbox(img)}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/100x75?text=Image';
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="product-details">
                  <div className="product-header">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                  <div className="product-features">
                    <h4>Features:</h4>
                    <ul>
                      {product.features.map((feature, index) => (
                        <li key={index}> {feature}</li>
                      ))}
                    </ul>
                  </div>
                  <Link to="/enquiry" className="btn btn-primary">Request Quote</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="products-cta">
          <h2>Need Custom Solutions?</h2>
          <p>We specialize in creating custom merchandise tailored to your brand</p>
          <Link to="/enquiry" className="btn btn-primary">Contact Us</Link>
        </section>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <span className="close-lightbox">&times;</span>
          <img src={lightboxImage} alt="Product" className="lightbox-image" />
        </div>
      )}
    </div>
  );
}

export default Products;