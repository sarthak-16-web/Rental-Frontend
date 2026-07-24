import React, { useState } from 'react'
import './SupportContact.css'

function SupportContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
  e.preventDefault()

  // No backend/third-party service — this opens the visitor's own
  // email app with everything pre-filled. They still have to hit
  // Send themselves once their email app opens; that's a browser
  // security limitation, not something code can skip around.
  const recipient = 'kasat4309@gmail.com'

  const emailSubject = `${formData.subject} — from ${formData.name}`

  const emailBody =
    `Name: ${formData.name}\n` +
    `Email: ${formData.email}\n` +
    `Phone: ${formData.phone || 'Not provided'}\n\n` +
    `Message:\n${formData.message}`

  const mailtoLink =
    `mailto:${recipient}` +
    `?subject=${encodeURIComponent(emailSubject)}` +
    `&body=${encodeURIComponent(emailBody)}`

  window.location.href = mailtoLink

  
  setSubmitted(true)

  // Clear the form after submit
  setFormData({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
}

  return (
    <div className="support-contact">
      <div className="page-header">
        <div className="container">
          <h1>Support & Contact</h1>
          <p>Get in touch with our team. We're here to help!</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Contact Information</h2>

            <div className="info-card">
              <h3>Email</h3>
              <p><a href="mailto:info@rentalking.com">info@rentalking.com</a></p>
              <p className="desc">Send us an email and we'll respond within 24 hours</p>
            </div>

            <div className="info-card">
              <h3>Phone</h3>
              <p><a href="tel:+919300653927">+91 9300653927</a></p>
              <p className="desc">Call us Monday to Friday, 9am to 6pm EST</p>
            </div>

            <div className="info-card">
              <h3>Address</h3>
              <p>Second Floor Real Estate Avenue<br />Business City, BC 452001<br />Indore</p>
              <p className="desc">Visit our office for in-person consultations</p>
            </div>

            <div className="info-card">
              <h3>Business Hours</h3>
              <ul className="hours-list">
                <ul><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</ul>
                <ul><strong>Saturday:</strong> 10:00 AM - 4:00 PM</ul>
                <ul><strong>Sunday:</strong> Closed</ul>
              </ul>
            </div>

            <div className="info-card">
              <h3>Quick Support</h3>
              <a href="https://wa.me/9300653927" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h2>Send us a Message</h2>
            
            {submitted && (
              <div className="success-message">
                ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
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
                  placeholder="your@email.com"
                  required
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
                  placeholder="+91 9384XXXX37"
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
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportContact
