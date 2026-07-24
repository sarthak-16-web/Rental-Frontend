import React, { useState , useEffect} from 'react'

import api from "../api/axios";
import { Link, useNavigate } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import './Home.css'

function Home() {
  const [properties, setProperties] = useState([]);
  const [searchLocation, setSearchLocation] = useState('')
 const [testimonials, setTestimonials] = useState([]);
 const [upcomingProjects, setUpcomingProjects] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
  fetchTestimonials();
}, []);

useEffect(() => {

    fetchProjects();

}, []);
const fetchTestimonials = async () => {
  try {
    const res = await api.get("/testimonial/get-all");
    setTestimonials(res.data.testimonials);
  } catch (error) {
    console.log(error);
  }
};
const fetchProjects = async () => {

    try{

        const res = await api.get("/project/get-all");

        setUpcomingProjects(res.data.projects);

    }catch(error){

        console.log(error);

    }

};
useEffect(() => {
  fetchProperties();
}, []);
const fetchProperties = async () => {
    try {

        const res = await api.get("/property/get-all");

        setProperties(res.data.properties);

    } catch (error) {

        console.log(error);

    }
};
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchLocation) {
      navigate(`/properties?location=${searchLocation}`)
    } else {
      navigate('/properties')
    }
  }

  const featuredProperties = properties.filter((p) => p.isFeatured)

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Dream Property</h1>
          <p>Discover premium residential and commercial properties tailored to your lifestyle</p>
          
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search by location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="featured-section py-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Properties</h2>
            <p>Discover our hand-picked selection of premium properties</p>
          </div>

          <div className="properties-grid grid-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/properties" className="btn btn-outline">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Projects */}
      <section className="upcoming-section py-section">
        <div className="container">
          <div className="section-header">
            <h2>Upcoming Projects</h2>
            <p>Explore our exciting new developments coming soon</p>
          </div>

          <div className="projects-grid grid-3">
            {upcomingProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.name} />
                  <span className="project-badge">{project.completion}</span>
                </div>
                <div className="project-content">
                  <h3>{project.name}</h3>
                  <p className="project-location">{project.location}</p>
                  <p className="project-description">{project.description}</p>
                  <p className="project-units"><strong>{project.units} Units</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section py-section">
        <div className="container">
          <div className="section-header">
            <h2>Happy Customers</h2>
            <p>See what our clients have to say about their experience with us</p>
          </div>

          <div className="testimonials-grid grid-2">
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="testimonial-card">
                <div className="stars">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
             <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <p className="author-name">{testimonial.name}</p>
                  <p className="author-property">{testimonial.property}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Property?</h2>
            <p>Connect with our expert team today</p>
            <div className="cta-buttons">
              <Link to="/properties" className="btn btn-primary">
                Browse Properties
              </Link>
              <Link to="/support-contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
