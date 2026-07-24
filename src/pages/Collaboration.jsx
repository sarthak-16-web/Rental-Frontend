import React from "react";
import "./Collaboration.css";

const milestones = [
  { year: "2015", title: "Rental King Founded", description: "Started as a small local rental service with a handful of properties and a big vision." },
  { year: "2018", title: "Regional Expansion", description: "Grew to serve multiple cities, building a reputation for reliability and transparency." },
  { year: "2021", title: "500+ Properties Managed", description: "Crossed a major milestone in trusted property listings and satisfied tenants." },
  { year: "2024", title: "Industry Recognition", description: "Received certifications and awards for excellence in property management." },
];

const certificates = [
  { title: "ISO 9001:2015 Certified", issuer: "Quality Management", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop" },
  { title: "Best Real Estate Partner 2023", issuer: "National Realty Awards", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop" },
  { title: "Verified Business License", issuer: "State Housing Authority", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop" },
  { title: "Customer Trust Certification", issuer: "Consumer Protection Board", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop" },
];

const positivePoints = [
  { icon: "🏆", title: "Trusted Reputation", description: "Years of consistent, transparent service have built strong trust with clients and partners." },
  { icon: "📈", title: "Proven Growth", description: "A steadily expanding portfolio of properties and satisfied customers year over year." },
  { icon: "🤝", title: "Strong Network", description: "Deep local connections with property owners, tenants, and service providers." },
  { icon: "🔒", title: "Verified & Certified", description: "Fully licensed and certified, ensuring compliance and peace of mind for every deal." },
  { icon: "💼", title: "Professional Team", description: "An experienced team dedicated to smooth transactions and long-term relationships." },
  { icon: "🌟", title: "Customer Satisfaction", description: "Consistently high ratings and repeat business from happy clients." },
];

const mutualBenefits = {
  rentalKing: [
    "Access to new markets and client bases",
    "Shared marketing and brand visibility",
    "Combined resources for faster growth",
  ],
  partner: [
    "Access to Rental King's verified property network",
    "Established trust and credibility in the market",
    "Support from an experienced, certified team",
  ],
};

function Collaboration() {
  return (
    <div className="collab-page">
      {/* Hero */}
      <section className="collab-hero">
        <div className="container">
          <h1>Partnering With Rental King</h1>
          <p>
            A story of trust, growth, and shared success — explore why collaborating
            with Rental King is a win for everyone involved.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="collab-section">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          <p className="section-text">
            Rental King began with a simple goal: make renting and property management
            transparent, reliable, and stress-free. Over the years, we've grown from a
            small local operation into a trusted name in the industry, built on strong
            relationships, honest dealings, and a genuine commitment to our clients and
            partners.
          </p>
        </div>
      </section>

      {/* Milestones / Journey */}
      <section className="collab-section alt-bg">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-year">{m.year}</div>
                <div className="timeline-content">
                  <h3>{m.title}</h3>
                  <p>{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="collab-section">
        <div className="container">
          <h2 className="section-title">Certificates & Achievements</h2>
          <div className="certificate-grid">
            {certificates.map((cert, i) => (
              <div className="certificate-card" key={i}>
                <img src={cert.image} alt={cert.title} />
                <div className="certificate-info">
                  <h3>{cert.title}</h3>
                  <p>{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positive Points */}
      <section className="collab-section alt-bg">
        <div className="container">
          <h2 className="section-title">Why Partner With Rental King</h2>
          <div className="points-grid">
            {positivePoints.map((point, i) => (
              <div className="point-card" key={i}>
                <div className="point-icon">{point.icon}</div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mutual Benefits */}
      <section className="collab-section">
        <div className="container">
          <h2 className="section-title">A Collaboration That Benefits Everyone</h2>
          <div className="benefits-grid">
            <div className="benefit-column">
              <h3>For Rental King</h3>
              <ul>
                {mutualBenefits.rentalKing.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="benefit-column">
              <h3>For Our Partner</h3>
              <ul>
                {mutualBenefits.partner.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="collab-cta">
        <div className="container">
          <h2>Ready to Collaborate?</h2>
          <p>Let's build something great together.</p>
        <a  href="https://wa.me/919300653927?text=Hi%2C%20I%27m%20interested%20in%20collaborating%20with%20Rental%20King."
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-primary"
>
  Get in Touch on WhatsApp
</a>
        </div>
      </section>
    </div>
  );
}

export default Collaboration;