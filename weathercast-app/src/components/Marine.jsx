import React, { useState } from 'react'
import './Marine.css'

function Marine({ data }) {
  const [selectedHour, setSelectedHour] = useState(null)

  if (!data || !data.marine) {
    return (
      <div className="marine-empty glass-card">
        <div className="empty-content">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12C4 12 4 10 6 10C8 10 8 12 10 12C12 12 12 10 14 10C16 10 16 12 18 12C20 12 20 10 22 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M2 17C4 17 4 15 6 15C8 15 8 17 10 17C12 17 12 15 14 15C16 15 16 17 18 17C20 17 20 15 22 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M2 7C4 7 4 5 6 5C8 5 8 7 10 7C12 7 12 5 14 5C16 5 16 7 18 7C20 7 20 5 22 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p>No marine data available. Please check your subscription plan or search for a coastal location.</p>
        </div>
      </div>
    )
  }

  const { marine, location } = data

  const getSeaCondition = (waveHeight) => {
    if (waveHeight < 0.5) return { label: 'Calm', color: 'var(--accent-success)' }
    if (waveHeight < 1.0) return { label: 'Smooth', color: 'var(--accent-cool)' }
    if (waveHeight < 1.5) return { label: 'Slight', color: 'var(--accent-warm)' }
    if (waveHeight < 2.5) return { label: 'Moderate', color: 'var(--accent-warm)' }
    if (waveHeight < 4.0) return { label: 'Rough', color: 'var(--accent-danger)' }
    return { label: 'Very Rough', color: 'var(--accent-danger)' }
  }

  const getSwellQuality = (swellHeight, swellPeriod) => {
    if (swellHeight < 0.5) return 'Flat'
    if (swellPeriod < 8) return 'Choppy'
    if (swellPeriod < 12) return 'Fair'
    if (swellPeriod < 16) return 'Good'
    return 'Excellent'
  }

  const hourlyData = marine.hourly || []

  return (
    <div className="marine-container fade-in">
      <div className="marine-header">
        <div className="marine-title">
          <h2>Marine Weather</h2>
          <p className="marine-location">{location?.name}, {location?.country}</p>
          <p className="marine-coords">{location?.lat}°N, {location?.lon}°E</p>
        </div>
        {marine.water_temperature && (
          <div className="water-temp-badge">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3C7.5 3 4 6.5 4 11C4 15.5 8 21 12 21C16 21 20 15.5 20 11C20 6.5 16.5 3 12 3Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="1" fill="currentColor"/>
            </svg>
            <span>Water: {marine.water_temperature}°C</span>
          </div>
        )}
      </div>

      {hourlyData.length > 0 && (
        <div className="marine-content">
          <div className="marine-summary glass-card">
            <h3>Current Conditions</h3>
            <div className="summary-stats">
              {hourlyData[0] && (
                <>
                  <div className="summary-stat">
                    <span className="stat-icon">🌊</span>
                    <div>
                      <span className="stat-label">Wave Height</span>
                      <span className="stat-value">{hourlyData[0].wave_height} m</span>
                    </div>
                  </div>
                  <div className="summary-stat">
                    <span className="stat-icon">⏱️</span>
                    <div>
                      <span className="stat-label">Wave Period</span>
                      <span className="stat-value">{hourlyData[0].wave_period} s</span>
                    </div>
                  </div>
                  <div className="summary-stat">
                    <span className="stat-icon">🧭</span>
                    <div>
                      <span className="stat-label">Wave Direction</span>
                      <span className="stat-value">{hourlyData[0].wave_direction}°</span>
                    </div>
                  </div>
                  <div className="summary-stat">
                    <span className="stat-icon">💨</span>
                    <div>
                      <span className="stat-label">Wind Wave</span>
                      <span className="stat-value">{hourlyData[0].wind_wave_height || 'N/A'} m</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="hourly-marine">
            <h3>Hourly Forecast</h3>
            <div className="marine-hours">
              {hourlyData.map((hour, index) => {
                const condition = getSeaCondition(hour.wave_height)
                const swellQuality = getSwellQuality(hour.swell_wave_height, hour.swell_wave_period)
                
                return (
                  <div 
                    key={index} 
                    className={`marine-hour glass-card ${selectedHour === index ? 'selected' : ''}`}
                    onClick={() => setSelectedHour(selectedHour === index ? null : index)}
                  >
                    <div className="hour-header">
                      <span className="hour-time">{hour.time}</span>
                      <span 
                        className="condition-badge"
                        style={{ backgroundColor: `${condition.color}20`, color: condition.color }}
                      >
                        {condition.label}
                      </span>
                    </div>
                    
                    <div className="hour-main">
                      <span className="wave-height">{hour.wave_height}m</span>
                      <span className="wave-period">{hour.wave_period}s</span>
                    </div>

                    {selectedHour === index && (
                      <div className="hour-details">
                        <div className="detail-row">
                          <span>Swell Height</span>
                          <span>{hour.swell_wave_height} m</span>
                        </div>
                        <div className="detail-row">
                          <span>Swell Period</span>
                          <span>{hour.swell_wave_period} s</span>
                        </div>
                        <div className="detail-row">
                          <span>Swell Direction</span>
                          <span>{hour.swell_wave_direction}°</span>
                        </div>
                        <div className="detail-row">
                          <span>Wind Wave Height</span>
                          <span>{hour.wind_wave_height || 'N/A'} m</span>
                        </div>
                        <div className="detail-row">
                          <span>Wind Wave Period</span>
                          <span>{hour.wind_wave_period || 'N/A'} s</span>
                        </div>
                        <div className="detail-row">
                          <span>Swell Quality</span>
                          <span className="quality-badge">{swellQuality}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Marine
