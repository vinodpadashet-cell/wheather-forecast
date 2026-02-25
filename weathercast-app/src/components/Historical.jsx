import React, { useState } from 'react'
import './Historical.css'

function Historical({ data }) {
  const [selectedDate, setSelectedDate] = useState('')

  if (!data || !data.historical) {
    return (
      <div className="historical-empty glass-card">
        <p>No historical data available. Please check your subscription plan.</p>
      </div>
    )
  }

  const { historical, location } = data
  const historicalDates = Object.entries(historical).sort(([a], [b]) => b.localeCompare(a))

  const getWeatherIcon = (code) => {
    if (code <= 113) return '☀️'
    if (code <= 116) return '⛅'
    if (code <= 122) return '☁️'
    if (code <= 143) return '🌫️'
    if (code <= 176) return '🌦️'
    if (code <= 200) return '⛈️'
    if (code <= 227) return '🌨️'
    if (code <= 248) return '☁️'
    if (code <= 260) return '🌫️'
    if (code <= 281) return '🌧️'
    if (code <= 293) return '🌦️'
    if (code <= 299) return '🌧️'
    if (code <= 314) return '🌧️'
    if (code <= 326) return '🌨️'
    if (code <= 335) return '❄️'
    if (code <= 350) return '🧊'
    if (code <= 359) return '🌧️'
    if (code <= 377) return '🌨️'
    if (code <= 386) return '⛈️'
    if (code <= 395) return '❄️'
    return '🌡️'
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return {
      full: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      short: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
  }

  const filteredDates = selectedDate 
    ? historicalDates.filter(([dateStr]) => dateStr === selectedDate)
    : historicalDates

  return (
    <div className="historical-container fade-in">
      <div className="historical-header">
        <div className="historical-title">
          <h2>Historical Weather Data</h2>
          <p className="historical-location">{location?.name}, {location?.country}</p>
        </div>
        <div className="historical-filter">
          <label htmlFor="date-filter">Filter by Date:</label>
          <select 
            id="date-filter"
            className="glass-input date-select"
            value={selectedDate}
            onChange={handleDateChange}
          >
            <option value="">All Available Dates</option>
            {historicalDates.map(([dateStr]) => (
              <option key={dateStr} value={dateStr}>
                {formatDate(dateStr).full}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="historical-grid">
        {filteredDates.map(([dateStr, dayData]) => {
          const { full } = formatDate(dateStr)
          
          return (
            <div key={dateStr} className="historical-day glass-card">
              <div className="historical-day-header">
                <h3>{full}</h3>
                <div className="day-summary">
                  <span className="summary-icon">{getWeatherIcon(dayData.weather_code)}</span>
                  <span className="summary-temp">{dayData.avgtemp}° avg</span>
                </div>
              </div>

              <div className="historical-overview">
                <div className="overview-stat">
                  <span className="stat-label">Max Temp</span>
                  <span className="stat-value">{dayData.maxtemp}°</span>
                </div>
                <div className="overview-stat">
                  <span className="stat-label">Min Temp</span>
                  <span className="stat-value">{dayData.mintemp}°</span>
                </div>
                <div className="overview-stat">
                  <span className="stat-label">Avg Humidity</span>
                  <span className="stat-value">{dayData.avghumidity}%</span>
                </div>
                <div className="overview-stat">
                  <span className="stat-label">Total Precip</span>
                  <span className="stat-value">{dayData.totalprecip} mm</span>
                </div>
              </div>

              {dayData.hourly && (
                <div className="hourly-data">
                  <h4>Hourly Breakdown</h4>
                  <div className="hourly-grid">
                    {dayData.hourly.map((hour, index) => (
                      <div key={index} className="hour-item">
                        <span className="hour-time">{hour.time}</span>
                        <span className="hour-icon">{getWeatherIcon(hour.weather_code)}</span>
                        <span className="hour-temp">{hour.temperature}°</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="astro-data">
                <h4>Astronomical Data</h4>
                <div className="astro-grid">
                  <div className="astro-item">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 4.93L16.24 7.76M16.24 16.24L19.07 19.07M4.93 4.93L7.76 7.76M7.76 16.24L4.93 19.07" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <div>
                      <span className="astro-label">Sunrise</span>
                      <span className="astro-value">{dayData.sunrise || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="astro-item">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 18C17 16.4087 16.3679 14.8826 15.2426 13.7574C14.1174 12.6321 12.5913 12 11 12C9.4087 12 7.88258 12.6321 6.75736 13.7574C5.63214 14.8826 5 16.4087 5 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 2V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <div>
                      <span className="astro-label">Sunset</span>
                      <span className="astro-value">{dayData.sunset || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="astro-item">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 6V12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <div>
                      <span className="astro-label">Moon Phase</span>
                      <span className="astro-value">{dayData.moon_phase || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="astro-item">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3C7.5 3 4 6.5 4 11C4 15.5 8 21 12 21C16 21 20 15.5 20 11C20 6.5 16.5 3 12 3Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 8V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <div>
                      <span className="astro-label">Moon Illum</span>
                      <span className="astro-value">{dayData.moon_illumination || 'N/A'}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Historical
