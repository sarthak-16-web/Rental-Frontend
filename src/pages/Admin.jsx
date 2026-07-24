import React, { useState, useEffect } from "react";
import './Admin.css'
import api from "../api/axios";
function Admin() {
  const [activeTab, setActiveTab] = useState('properties')

  // Lifted up here (instead of living inside PropertiesManager) so both
  // the Properties tab and the Featured Properties tab read/write the
  // exact same list — a featured property IS a property, just filtered.
const [properties, setProperties] = useState([]);
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
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Manage properties, featured properties, upcoming projects, and testimonials</p>
        </div>
      </div>

      <div className="container admin-content">
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            Properties
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'featured' ? 'active' : ''}`}
            onClick={() => setActiveTab('featured')}
          >
            Featured Properties
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Projects
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
            onClick={() => setActiveTab('testimonials')}
          >
            Testimonials
          </button>
        </div>

        {activeTab === 'properties' && (
<PropertiesManager
    properties={properties}
    setProperties={setProperties}
    fetchProperties={fetchProperties}
/>        )}
        {activeTab === 'featured' && (
          <FeaturedPropertiesManager properties={properties} setProperties={setProperties} />
        )}
        {activeTab === 'upcoming' && <UpcomingManager />}
        {activeTab === 'testimonials' && <TestimonialsManager />}
      </div>
    </div>
  )
}

/* ==================================================================
   PROPERTIES — your original code, unchanged, plus one new field:
   "isFeatured" checkbox. Checking it is what makes a property show
   up in the Featured Properties tab (and the homepage).
   `properties` / `setProperties` now come in as props from Admin,
   shared with the Featured Properties tab below.
================================================================== */

function PropertiesManager({ properties, setProperties , fetchProperties}) {
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    priceNumeric: 0,
    location: '',
    address: '',
    category: 'Apartment',
    beds: 0,
    baths: 1,
    sqft: '',
    description: '',
    image: '',
    isFeatured: false
  })

  const handleOpenModal = (property = null) => {
    if (property) {
      setEditingId(property._id)
      setFormData(property)
    } else {
      setEditingId(null)
      setFormData({
        name: '',
        price: '',
        priceNumeric: 0,
        location: '',
        address: '',
        category: 'Apartment',
        beds: 0,
        baths: 1,
        sqft: '',
        description: '',
        image: '',
        isFeatured: false
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingId(null)
  }

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'beds' || name === 'baths'
          ? parseInt(value)
          : name === 'priceNumeric'
          ? parseInt(value)
          : value
    }))
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        if (editingId) {

            await api.put(
                `/property/edit/${editingId}`,
                formData
            );

        } else {

            await api.post(
                "/property/add",
                formData
            );

        }

        fetchProperties();

        handleCloseModal();

    } catch (error) {

        console.log(error);

    }

};

  const handleDelete = async (id) => {

    if (window.confirm("Are you sure you want to delete this property?")) {

        try {

            await api.delete(`/property/delete/${id}`);

            fetchProperties();

        } catch (error) {

            console.log(error);

        }

    }

};

  return (
    <div>
      <div className="admin-actions">
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Add New Property
        </button>
        <div className="stats">
          <div className="stat-card">
            <span className="stat-label">Total Properties</span>
            <span className="stat-value">{properties.length}</span>
          </div>
        </div>
      </div>

      <div className="properties-table-wrapper">
        <table className="properties-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Location</th>
              <th>Featured</th>
              <th>Beds</th>
              <th>Baths</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id}>
                <td>{property.name}</td>
                <td><span className="category-badge">{property.category}</span></td>
                <td>{property.price}</td>
                <td>{property.location}</td>
                <td>{property.isFeatured ? '★ Yes' : '—'}</td>
                <td>{property.beds}</td>
                <td>{property.baths}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => handleOpenModal(property)}
                      title="Edit"
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(property._id)}
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit Property' : 'Add New Property'}</h2>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>

            <form className="property-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Property Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    required
                  >
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Commercial</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price (Display) *</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="e.g., $2,500"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="priceNumeric">Price (Numeric) *</label>
                  <input
                    type="number"
                    id="priceNumeric"
                    name="priceNumeric"
                    value={formData.priceNumeric}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="beds">Bedrooms</label>
                  <input
                    type="number"
                    id="beds"
                    name="beds"
                    value={formData.beds}
                    onChange={handleFormChange}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="baths">Bathrooms</label>
                  <input
                    type="number"
                    id="baths"
                    name="baths"
                    value={formData.baths}
                    onChange={handleFormChange}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sqft">Square Feet</label>
                  <input
                    type="text"
                    id="sqft"
                    name="sqft"
                    value={formData.sqft}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="image">Image URL *</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={!!formData.isFeatured}
                    onChange={handleFormChange}
                  />
                  {' '}Show in Featured Properties (homepage)
                </label>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Property' : 'Add Property'}
                </button>
                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

/* ==================================================================
   FEATURED PROPERTIES — its own tab, but NOT its own data. It reads
   the same `properties` list from Admin, shows only the ones with
   isFeatured === true, and edits/deletes write back into that same
   full list. Adding a new one here defaults isFeatured to true.
================================================================== */

function FeaturedPropertiesManager({ properties, setProperties }) {
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    priceNumeric: 0,
    location: '',
    address: '',
    category: 'Apartment',
    beds: 0,
    baths: 1,
    sqft: '',
    description: '',
    image: '',
    isFeatured: true
  })

  const featured = properties.filter((p) => p.isFeatured)

  const handleOpenModal = (property = null) => {
    if (property) {
      setEditingId(property.id)
      setFormData(property)
    } else {
      setEditingId(null)
      setFormData({
        name: '',
        price: '',
        priceNumeric: 0,
        location: '',
        address: '',
        category: 'Apartment',
        beds: 0,
        baths: 1,
        sqft: '',
        description: '',
        image: '',
        isFeatured: true
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingId(null)
  }

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'beds' || name === 'baths'
          ? parseInt(value)
          : name === 'priceNumeric'
          ? parseInt(value)
          : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        if (editingId) {

            await api.put(
                `/testimonial/edit/${editingId}`,
                formData
            );

        } else {

            await api.post(
                "/testimonial/add",
                formData
            );

        }

        fetchTestimonials();
        handleCloseModal();

    } catch (error) {
        console.log(error);
    }
};

  const handleDelete = (id) => {
    if (window.confirm('Remove this property from Featured (and delete it entirely)?')) {
      setProperties(properties.filter((p) => p.id !== id))
    }
  }

  const handleUnfeature = (id) => {
    // Keeps the property, just un-checks isFeatured so it drops off
    // this tab and the homepage, without deleting it.
    setProperties(properties.map((p) =>
      p.id === id ? { ...p, isFeatured: false } : p
    ))
  }

  return (
    <div>
      <div className="admin-actions">
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Add New Featured Property
        </button>
        <div className="stats">
          <div className="stat-card">
            <span className="stat-label">Total Featured</span>
            <span className="stat-value">{featured.length}</span>
          </div>
        </div>
      </div>

      {featured.length === 0 ? (
        <div className="properties-table-wrapper">
          <p style={{ padding: '2rem', textAlign: 'center' }}>
            No featured properties yet. Add one above, or go to the Properties tab and check "Show in Featured Properties" on an existing one.
          </p>
        </div>
      ) : (
        <div className="properties-table-wrapper">
          <table className="properties-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {featured.map((property) => (
                <tr key={property.id}>
                  <td>#{property.id}</td>
                  <td>{property.name}</td>
                  <td><span className="category-badge">{property.category}</span></td>
                  <td>{property.price}</td>
                  <td>{property.location}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => handleOpenModal(property)}
                        title="Edit"
                      >
                        Edit
                      </button>
                      
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(property.id)}
                        title="Delete entirely"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit Featured Property' : 'Add New Featured Property'}</h2>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>

            <form className="property-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fp-name">Property Name *</label>
                  <input
                    type="text"
                    id="fp-name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fp-category">Category *</label>
                  <select
                    id="fp-category"
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    required
                  >
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Commercial</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fp-price">Price (Display) *</label>
                  <input
                    type="text"
                    id="fp-price"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="e.g., $2,500"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fp-priceNumeric">Price (Numeric) *</label>
                  <input
                    type="number"
                    id="fp-priceNumeric"
                    name="priceNumeric"
                    value={formData.priceNumeric}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fp-location">Location *</label>
                  <input
                    type="text"
                    id="fp-location"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fp-address">Address *</label>
                  <input
                    type="text"
                    id="fp-address"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fp-beds">Bedrooms</label>
                  <input
                    type="number"
                    id="fp-beds"
                    name="beds"
                    value={formData.beds}
                    onChange={handleFormChange}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fp-baths">Bathrooms</label>
                  <input
                    type="number"
                    id="fp-baths"
                    name="baths"
                    value={formData.baths}
                    onChange={handleFormChange}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fp-sqft">Square Feet</label>
                  <input
                    type="text"
                    id="fp-sqft"
                    name="sqft"
                    value={formData.sqft}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="fp-description">Description *</label>
                <textarea
                  id="fp-description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="fp-image">Image URL *</label>
                <input
                  type="url"
                  id="fp-image"
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Property' : 'Add Property'}
                </button>
                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

/* ==================================================================
   UPCOMING PROJECTS — same pattern as Properties, different fields:
   name, location, completion, units, description, image
================================================================== */

function UpcomingManager() {
const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    completion: '',
    units: 0,
    description: '',
    image: ''
  })
 useEffect(() => {
    fetchProjects();
}, []);
const fetchProjects = async () => {

    try {

        const res = await api.get("/project/get-all");

        setProjects(res.data.projects);

    }

    catch(error){

        console.log(error);

    }

}
  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingId(project._id)
      setFormData(project)
    } else {
      setEditingId(null)
      setFormData({
        name: '',
        location: '',
        completion: '',
        units: 0,
        description: '',
        image: ''
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingId(null)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'units' ? parseInt(value) : value
    }))
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    try{

        if(editingId){

            await api.put(
                `/project/edit/${editingId}`,
                formData
            );

        }

        else{

            await api.post(
                "/project/add",
                formData
            );

        }

        fetchProjects();

        handleCloseModal();

    }

    catch(error){

        console.log(error);

    }

}
const handleDelete = async(id)=>{

    if(window.confirm("Delete this project?")){

        await api.delete(`/project/delete/${_id}`);

        fetchProjects();

    }

}

  return (
    <div>
      <div className="admin-actions">
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          + Add New Project
        </button>
        <div className="stats">
          <div className="stat-card">
            <span className="stat-label">Total Upcoming Projects</span>
            <span className="stat-value">{projects.length}</span>
          </div>
        </div>
      </div>

      <div className="properties-table-wrapper">
        <table className="properties-table">
          <thead>
            <tr>
              
              <th>Name</th>
              <th>Location</th>
              <th>Completion</th>
              <th>Units</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
             
                <td>{project.name}</td>
                <td>{project.location}</td>
                <td>{project.completion}</td>
                <td>{project.units}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => handleOpenModal(project)}
                      title="Edit"
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(project._id)}
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>

            <form className="property-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Project Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="completion">Completion *</label>
                  <input
                    type="text"
                    id="completion"
                    name="completion"
                    value={formData.completion}
                    onChange={handleFormChange}
                    placeholder="e.g., Q3 2025"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="units">Units *</label>
                  <input
                    type="number"
                    id="units"
                    name="units"
                    value={formData.units}
                    onChange={handleFormChange}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="image">Image URL *</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Project' : 'Add Project'}
                </button>
                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

/* ==================================================================
   TESTIMONIALS — same pattern again, fields: name, property, rating, text
================================================================== */

function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    property: "",
    rating: 5,
    text: "",
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get("/testimonial/get-all");
      setTestimonials(res.data.testimonials);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = (testimonial = null) => {
    if (testimonial) {
      setEditingId(testimonial._id);
      setFormData(testimonial);
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        property: "",
        rating: 5,
        text: "",
      });
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/testimonial/edit/${editingId}`, formData);
      } else {
        await api.post("/testimonial/add", formData);
      }

      fetchTestimonials();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await api.delete(`/testimonial/delete/${id}`);
        fetchTestimonials();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="admin-actions">
        <button
          className="btn btn-primary"
          onClick={() => handleOpenModal()}
        >
          + Add New Testimonial
        </button>

        <div className="stats">
          <div className="stat-card">
            <span className="stat-label">Total Testimonials</span>
            <span className="stat-value">{testimonials.length}</span>
          </div>
        </div>
      </div>

      <div className="properties-table-wrapper">
        <table className="properties-table">
          <thead>
            <tr>
              
              <th>Client Name</th>
              <th>Property</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial._id}>
                
                <td>{testimonial.name}</td>
                <td>{testimonial.property}</td>
                <td>{"★".repeat(testimonial.rating)}</td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => handleOpenModal(testimonial)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(testimonial._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {editingId
                  ? "Edit Testimonial"
                  : "Add New Testimonial"}
              </h2>

              <button
                className="close-btn"
                onClick={handleCloseModal}
              >
                ×
              </button>
            </div>

            <form
              className="property-form"
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <div className="form-group">
                  <label>Client Name *</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Related Property *</label>

                  <input
                    type="text"
                    name="property"
                    value={formData.property}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Rating *</label>

                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleFormChange}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>

              <div className="form-group">
                <label>Testimonial *</label>

                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleFormChange}
                  rows="4"
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {editingId
                    ? "Update Testimonial"
                    : "Add Testimonial"}
                </button>

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default Admin 
