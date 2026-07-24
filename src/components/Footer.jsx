import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-section">
          <h3>Rental King</h3>
          <p>Your trusted partner in premium real estate solutions. We provide quality properties and exceptional service.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/support-contact">Support</Link></li>
            <li><Link to="/collaboration">Collaboration</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: info@rentalking.com</p>
          <p>Phone: +91 9300653927 </p>
          <p>Address:Second Floor Real Estate Avenue, Business City, BC 452001 Indore</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="LinkedIn">in</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Rental King. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
