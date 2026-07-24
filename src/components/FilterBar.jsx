import React from 'react'
import './FilterBar.css'

function FilterBar({ filters, onFilterChange }) {
  const handleCategoryChange = (category) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? '' : category
    })
  }

  const handlePriceChange = (e) => {
    onFilterChange({
      ...filters,
      maxPrice: e.target.value
    })
  }

  const handleLocationChange = (e) => {
    onFilterChange({
      ...filters,
      location: e.target.value
    })
  }

 const handleResetFilters = () => {
    onFilterChange({
        category: "",
        maxPrice: 200000,
        location: ""
    });
};

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Category</label>
        <div className="category-filters">
          {['Apartment', 'Villa', 'Commercial' , 'Office','Others ' ].map((cat) => (
            <button
              key={cat}
              className={`category-btn ${filters.category === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="max-price">Max Price</label>
        <div className="price-input-group">
        <input
    type="range"
    id="max-price"
    min="5000"
    max="200000"
    step="1000"
    value={filters.maxPrice}
    onChange={handlePriceChange}
/>
          <span className="price-value">₹{filters.maxPrice}</span>
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          placeholder="Search location..."
          value={filters.location}
          onChange={handleLocationChange}
        />
      </div>

      <button className="btn btn-outline" onClick={handleResetFilters}>
        Reset Filters
      </button>
    </div>
  )
}

export default FilterBar
