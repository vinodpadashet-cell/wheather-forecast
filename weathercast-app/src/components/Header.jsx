import React from 'react'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2Z" fill="currentColor"/>
            <path d="M12 18C10.9 18 10 18.9 10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20C14 18.9 13.1 18 12 18Z" fill="currentColor"/>
            <path d="M6 12C6 10.9 5.1 10 4 10C2.9 10 2 10.9 2 12C2 13.1 2.9 14 4 14C5.1 14 6 13.1 6 12Z" fill="currentColor"/>
            <path d="M20 10C18.9 10 18 10.9 18 12C18 13.1 18.9 14 20 14C21.1 14 22 13.1 22 12C22 10.9 21.1 10 20 10Z" fill="currentColor"/>
            <path d="M16.24 17.24L17.66 18.66C18.44 17.88 18.44 16.62 17.66 15.84L16.24 17.24Z" fill="currentColor"/>
            <path d="M5.34 6.34L6.76 7.76C7.54 6.98 7.54 5.72 6.76 4.94L5.34 6.34Z" fill="currentColor"/>
            <path d="M18.66 5.34L17.24 6.76C18.02 7.54 19.28 7.54 20.06 6.76L18.66 5.34Z" fill="currentColor"/>
            <path d="M7.76 16.24L6.34 17.66C5.56 16.88 5.56 15.62 6.34 14.84L7.76 16.24Z" fill="currentColor"/>
            <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.3"/>
          </svg>
        </div>
        <div className="brand-text">
          <h1>WeatherCast</h1>
          <span className="tagline">Premium Weather Intelligence</span>
        </div>
      </div>
      <div className="header-actions">
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span className="status-text">Live Data</span>
        </div>
      </div>
    </header>
  )
}

export default Header
