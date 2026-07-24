import { useParams, Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import api from "../api/axios";
import './PropertyDetails.css'

function PropertyDetails() {
  const [property, setProperty] = useState(null);
const [properties, setProperties] = useState([]);
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    fetchProperty();
}, [id]);

const fetchProperty = async () => {

    try {

        const res = await api.get("/property/get-all");

        setProperties(res.data.properties);

        const selected = res.data.properties.find(
            (p) => p._id === id
        );

        setProperty(selected);

    } catch (error) {

        console.log(error);

    }

};
  if (!property) {
    return (
      <div className="not-found">
        <div className="container">
          <h1>Property Not Found</h1>
          <p>The property you're looking for doesn't exist.</p>
          <Link to="/properties" className="btn btn-primary">
            Back to Properties
          </Link>
        </div>
      </div>
    )
  }

  const handleWhatsApp = () => {
    const phoneNumber = '919300653927'
    const message = `I am interested in property ID: ${property.name} `
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const relatedProperties = properties
    .filter((p) => p.category === property.category && p._id !== property._id)
    .slice(0, 3)

  return (
    <div className="property-details">
      <div className="container">
        <Link to="/properties" className="back-link">
          ← Back to Properties
        </Link>

        <div className="details-hero">
          <div className="hero-image">
            <img src={property.image} alt={property.name} />
            <span className="property-badge">{property.category}</span>
          </div>

          <div className="hero-content">
            <h1>{property.name}</h1>
            <p className="location">{property.location}</p>
            <p className="address">{property.address}</p>

            <div className="price-section">
              <span className="price">{property.price}</span>
              <span className="frequency">per month</span>
            </div>

            <div className="specs">
              {property.beds > 0 && (
                <div className="spec-item">
                  <span className="spec-value">{property.beds}</span>
                  <span className="spec-label">Bedrooms</span>
                </div>
              )}
              <div className="spec-item">
                <span className="spec-value">{property.baths}</span>
                <span className="spec-label">Bathrooms</span>
              </div>
              <div className="spec-item">
                <span className="spec-value">{property.sqft}</span>
                <span className="spec-label">Square Feet</span>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn btn-primary btn-whatsapp" onClick={handleWhatsApp}>
                Inquire on WhatsApp
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => window.location.href = 'mailto:info@rentalking.com'}
              >
                Email Us
              </button>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2>Description</h2>
          <p>{property.description}</p>
        </div>

        <div className="details-grid">
          <div className="details-section">
            <h3>Property Details</h3>
            <ul className="details-list">
              <li>
                <span className="label">Category:</span>
                <span className="value">{property.category}</span>
              </li>
              <li>
                <span className="label">Price:</span>
                <span className="value">{property.price}</span>
              </li>
              <li>
                <span className="label">Location:</span>
                <span className="value">{property.location}</span>
              </li>
              <li>
                <span className="label">Address:</span>
                <span className="value">{property.address}</span>
              </li>
              <li>
                <span className="label">Square Feet:</span>
                <span className="value">{property.sqft}</span>
              </li>
            </ul>
          </div>

          <div className="details-section">
            <h3>Amenities & Features</h3>
            <ul className="features-list">
              <li>✓ Modern finishes</li>
              <li>✓ Natural lighting</li>
              <li>✓ Secure access</li>
              <li>✓ Parking available</li>
              <li>✓ Pet friendly</li>
              <li>✓ Utilities included</li>
            </ul>
          </div>
        </div>

        {relatedProperties.length > 0 && (
          <div className="related-section">
            <h2>Similar Properties</h2>
            <div className="related-grid grid-3">
              {relatedProperties.map((prop) => (
                <Link key={prop._id} to={`/property/${prop._id}`} className="related-card">
                  <div className="related-image">
                    <img src={prop.image} alt={prop.name} />
                  </div>
                  <div className="related-info">
                    <h4>{prop.name}</h4>
                    <p className="related-price">{prop.price}</p>
                    <p className="related-location">{prop.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyDetails
