import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
  <img src="/logo.png" alt="RUWAD CAPS" className="logo-img" />
</Link>

        <button className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>
          <li>
            <Link to="/products" onClick={closeMenu}>Products</Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu}>About Us</Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
          </li>
          <li>
            <Link to="/enquiry" className="enquiry-btn" onClick={closeMenu}>
              Get Quote
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;