import React from 'react'
import './CurrentWeather.css'

function CurrentWeather({ data }) {
  if (!data || !data.current || !data.location) {
    return null
  }

  const { current, location } = data

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

  const formatTime = (timeStr) => {
    return new Date(timeStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (timeStr) => {
    return new Date(timeStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="current-weather fade-in">
      <div className="location-header">
        <div className="location-info">
          <h2 className="location-name">{location.name}</h2>
          <p className="location-details">{location.region}, {location.country}</p>
          <p className="local-time">{formatDate(location.localtime)}</p>
        </div>
        <div className="location-meta">
          <span className="timezone">{location.timezone_id}</span>
          <span className="coordinates">{location.lat}°, {location.lon}°</span>
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature-display glass-card">
          <div className="weather-icon-large">{getWeatherIcon(current.weather_code)}</div>
          <div className="temperature-value">{current.temperature}°</div>
          <div className="weather-description">{current.weather_descriptions?.[0] || 'Clear'}</div>
        </div>

        <div className="weather-details-grid">
          <div className="detail-card glass-card">
            <div className="detail-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3V21M12 3L7 8M12 3L17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="detail-content">
              <span className="detail-label">Feels Like</span>
              <span className="detail-value">{current.feelslike}°</span>
            </div>
          </div>

          <div className="detail-card glass-card">
            <div className="detail-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="detail-content">
              <span className="detail-label">Observation Time</span>
              <span className="detail-value">{current.observation_time}</span>
            </div>
          </div>

          <div className="detail-card glass-card">
            <div className="detail-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3C7.5 3 4 6.5 4 11C4 15.5 8 21 12 21C16 21 20 15.5 20 11C20 6.5 16.5 3 12 3Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="1" fill="currentColor"/>
              </svg>
            </div>
            <div className="detail-content">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{current.humidity}%</span>
            </div>
          </div>

          <div className="detail-card glass-card">
            <div className="detail-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.59 4.59A2 2 0 1111 8H2M12.59 12.59A2 2 0 1114 16H2M15.59 20.59A2 2 0 1117 24H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="detail-content">
              <span className="detail-label">Wind Speed</span>
              <span className="detail-value">{current.wind_speed} km/h</span>
            </div>
          </div>

          <div className="detail-card glass-card">
            <div className="detail-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="detail-content">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{current.pressure} mb</span>
            </div>
          </div>

          <div className="detail-card glass-card">
            <div className="detail-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12H22M2 12C2 17.52 6.48 22 12 22M2 12C2 6.48 6.48 2 12 2" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="detail-content">
              <span className="detail-label">Visibility</span>
              <span className="detail-value">{current.visibility} km</span>
            </div>
          </div>

          <div className="detail-card glass-card">
            <div className="detail-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="detail-content">
              <span className="detail-label">UV Index</span>
              <span className="detail-value">{current.uv_index}</span>
            </div>
          </div>

          <div className="detail-card glass-card">
            <div className="detail-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 4.93L16.24 7.76M16.24 16.24L19.07 19.07M4.93 4.93L7.76 7.76M7.76 16.24L4.93 19.07" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="detail-content">
              <span className="detail-label">Cloud Cover</span>
              <span className="detail-value">{current.cloudcover}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
