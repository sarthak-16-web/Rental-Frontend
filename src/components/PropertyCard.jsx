import React from 'react'
import { Link } from 'react-router-dom'
import './PropertyCard.css'

function PropertyCard({ property }) {
  const handleWhatsApp = () => {
    const phoneNumber = '919300653927'
    const message = `I am interested in property ID:  ${property.name}`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="property-card">
      <div className="property-image">
        <img src={property.image} alt={property.name} />
        <span className="property-badge">{property.category}</span>
      </div>
      <div className="property-content">
        <h3 className="property-name">{property.name}</h3>
        <p className="property-location">{property.location}</p>
        <p className="property-address">{property.address}</p>
        
        <div className="property-specs">
          {property.beds > 0 && (
            <span className="spec">
              <strong>{property.beds}</strong> Beds
            </span>
          )}
          <span className="spec">
            <strong>{property.baths}</strong> Baths
          </span>
          <span className="spec">
            <strong>{property.sqft}</strong> sqft
          </span>
        </div>

        <div className="property-footer">
          <div className="property-price">{property.price}</div>
          <div className="property-actions">
            <Link to={`/property/${property._id}`} className="btn btn-outline">
              View Details
            </Link>
          </div>
        </div>

        <button className="btn btn-primary btn-inquire" onClick={handleWhatsApp}>
          Inquire on WhatsApp
        </button>
      </div>
    </div>
  )
}

export default PropertyCard
