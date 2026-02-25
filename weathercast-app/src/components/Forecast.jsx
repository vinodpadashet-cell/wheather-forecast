import React, { useState } from 'react'
import './Forecast.css'

function Forecast({ data }) {
  const [filter, setFilter] = useState('all')

  if (!data || !data.forecast) {
    return (
      <div className="forecast-empty glass-card">
        <p>No forecast data available. Please check your subscription plan.</p>
      </div>
    )
  }

  const { forecast, location } = data
  const forecastDays = Object.entries(forecast).sort(([a], [b]) => a.localeCompare(b))

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
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  const getDayType = (dateStr) => {
    const date = new Date(dateStr)
    const today = new Date()
    const diffTime = date - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'today'
    if (diffDays === 1) return 'tomorrow'
    if (diffDays <= 7) return 'week'
    return 'extended'
  }

  const filteredDays = forecastDays.filter(([dateStr]) => {
    if (filter === 'all') return true
    if (filter === 'today') return getDayType(dateStr) === 'today'
    if (filter === 'week') return getDayType(dateStr) === 'today' || getDayType(dateStr) === 'tomorrow' || getDayType(dateStr) === 'week'
    return true
  })

  return (
    <div className="forecast-container fade-in">
      <div className="forecast-header">
        <div className="forecast-title">
          <h2>14-Day Forecast</h2>
          <p className="forecast-location">{location?.name}, {location?.country}</p>
        </div>
        <div className="forecast-filters">
          <button 
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Days
          </button>
          <button 
            className={`filter-button ${filter === 'today' ? 'active' : ''}`}
            onClick={() => setFilter('today')}
          >
            Today
          </button>
          <button 
            className={`filter-button ${filter === 'week' ? 'active' : ''}`}
            onClick={() => setFilter('week')}
          >
            This Week
          </button>
        </div>
      </div>

      <div className="forecast-grid">
        {filteredDays.map(([dateStr, dayData]) => {
          const { day, date } = formatDate(dateStr)
          const dayType = getDayType(dateStr)
          
          return (
            <div key={dateStr} className={`forecast-day glass-card ${dayType}`}>
              <div className="day-header">
                <span className="day-name">{day}</span>
                <span className="day-date">{date}</span>
                {dayType === 'today' && <span className="day-badge">Today</span>}
                {dayType === 'tomorrow' && <span className="day-badge tomorrow">Tomorrow</span>}
              </div>
              
              <div className="day-weather">
                <span className="day-icon">{getWeatherIcon(dayData.weather_code)}</span>
                <div className="day-temps">
                  <span className="temp-max">{dayData.maxtemp}°</span>
                  <span className="temp-min">{dayData.mintemp}°</span>
                </div>
              </div>
              
              <div className="day-details">
                <div className="detail-row">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3C7.5 3 4 6.5 4 11C4 15.5 8 21 12 21C16 21 20 15.5 20 11C20 6.5 16.5 3 12 3Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                  </svg>
                  <span>{dayData.avghumidity}% humidity</span>
                </div>
                <div className="detail-row">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.59 4.59A2 2 0 1111 8H2M12.59 12.59A2 2 0 1114 16H2M15.59 20.59A2 2 0 1117 24H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>{dayData.maxwind_speed} km/h wind</span>
                </div>
                <div className="detail-row">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12H22M2 12C2 17.52 6.48 22 12 22M2 12C2 6.48 6.48 2 12 2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>{dayData.avgvisibility} km visibility</span>
                </div>
                <div className="detail-row">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>UV: {dayData.uv_index}</span>
                </div>
              </div>
              
              <div className="sun-times">
                <div className="sun-time">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 4.93L16.24 7.76M16.24 16.24L19.07 19.07M4.93 4.93L7.76 7.76M7.76 16.24L4.93 19.07" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>Sunrise: {dayData.sunrise || 'N/A'}</span>
                </div>
                <div className="sun-time">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 18C17 16.4087 16.3679 14.8826 15.2426 13.7574C14.1174 12.6321 12.5913 12 11 12C9.4087 12 7.88258 12.6321 6.75736 13.7574C5.63214 14.8826 5 16.4087 5 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 2V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 12L8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Sunset: {dayData.sunset || 'N/A'}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Forecast
