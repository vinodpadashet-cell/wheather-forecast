import React, { useState } from 'react'
import './Locations.css'

function Locations({ data, onSelect }) {
  const [filter, setFilter] = useState('')

  if (!data || !data.request || !data.request.results) {
    return (
      <div className="locations-empty glass-card">
        <p>Search for a location to see autocomplete suggestions.</p>
      </div>
    )
  }

  const results = data.results || []

  const filteredResults = results.filter(location => {
    if (!filter) return true
    const searchTerm = filter.toLowerCase()
    return (
      location.name?.toLowerCase().includes(searchTerm) ||
      location.country?.toLowerCase().includes(searchTerm) ||
      location.region?.toLowerCase().includes(searchTerm)
    )
  })

  const getLocationType = (type) => {
    switch (type) {
      case 'city': return { label: 'City', icon: '🏙️' }
      case 'region': return { label: 'Region', icon: '🗺️' }
      case 'country': return { label: 'Country', icon: '🌍' }
      case 'timezone': return { label: 'Timezone', icon: '🕐' }
      default: return { label: 'Location', icon: '📍' }
    }
  }

  return (
    <div className="locations-container fade-in">
      <div className="locations-header">
        <div className="locations-title">
          <h2>Location Search</h2>
          <p className="locations-subtitle">{data.request.results} results found</p>
        </div>
        <div className="locations-filter">
          <div className="filter-input-wrapper">
            <svg className="filter-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              className="glass-input filter-input"
              placeholder="Filter results..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="locations-grid">
        {filteredResults.map((location, index) => {
          const typeInfo = getLocationType(location.type)
          
          return (
            <div 
              key={`${location.name}-${index}`} 
              className="location-card glass-card"
              onClick={() => onSelect(location.name)}
            >
              <div className="location-card-header">
                <span className="location-type-badge">
                  <span className="type-icon">{typeInfo.icon}</span>
                  <span className="type-label">{typeInfo.label}</span>
                </span>
                {location.timezone_id && (
                  <span className="timezone-badge">{location.timezone_id}</span>
                )}
              </div>

              <div className="location-card-body">
                <h3 className="location-name">{location.name}</h3>
                <p className="location-hierarchy">
                  {location.region && <span>{location.region}</span>}
                  {location.region && location.country && <span className="separator">•</span>}
                  {location.country && <span>{location.country}</span>}
                </p>
              </div>

              <div className="location-card-footer">
                <div className="location-coords">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 10C20 16 12 22 12 22C12 22 4 16 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>{location.lat?.toFixed(4)}°, {location.lon?.toFixed(4)}°</span>
                </div>
                <button className="select-button">
                  <span>Select</span>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {filteredResults.length === 0 && filter && (
        <div className="no-results glass-card">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 9L15 15M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p>No locations match your filter.</p>
          <button className="clear-filter" onClick={() => setFilter('')}>
            Clear Filter
          </button>
        </div>
      )}
    </div>
  )
}

export default Locations
