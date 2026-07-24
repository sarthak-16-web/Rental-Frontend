import { useSearchParams } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import FilterBar from '../components/FilterBar'
import React, { useState, useMemo, useEffect } from 'react'
import api from "../api/axios";
import './Properties.css'

function Properties() {
  const [searchParams] = useSearchParams()
  const initialLocation = searchParams.get('location') || ''
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
  const [filters, setFilters] = useState({
    category: '',
    maxPrice: 10000000,
    location: initialLocation
  })

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesCategory = !filters.category || property.category === filters.category
      const matchesPrice = property.priceNumeric <= filters.maxPrice
      const matchesLocation = !filters.location || 
        property.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.address.toLowerCase().includes(filters.location.toLowerCase())

      return matchesCategory && matchesPrice && matchesLocation
    })
  }, [properties ,    filters])

  return (
    <div className="properties-page">
      <div className="page-header">
        <div className="container">
          <h1>Our Properties</h1>
          <p>Browse our extensive collection of premium rental properties</p>
        </div>
      </div>

      <div className="container">
        <FilterBar filters={filters} onFilterChange={setFilters} />

        {filteredProperties.length > 0 ? (
          <>
            <div className="results-info">
              <p>Found <strong>{filteredProperties.length}</strong> properties matching your criteria</p>
            </div>
            <div className="properties-grid grid-3">
              {filteredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </>
        ) : (
          <div className="no-results">
            <p>No properties found matching your filters.</p>
            <p>Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Properties
