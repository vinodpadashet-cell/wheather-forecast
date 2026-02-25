import React from 'react'
import './TabNavigation.css'

const tabs = [
  { id: 'current', label: 'Current', icon: 'sun' },
  { id: 'forecast', label: 'Forecast', icon: 'calendar' },
  { id: 'historical', label: 'Historical', icon: 'clock' },
  { id: 'marine', label: 'Marine', icon: 'waves' },
  { id: 'locations', label: 'Locations', icon: 'map' },
]

const icons = {
  sun: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  waves: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 12C4 12 4 10 6 10C8 10 8 12 10 12C12 12 12 10 14 10C16 10 16 12 18 12C20 12 20 10 22 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M2 17C4 17 4 15 6 15C8 15 8 17 10 17C12 17 12 15 14 15C16 15 16 17 18 17C20 17 20 15 22 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M2 7C4 7 4 5 6 5C8 5 8 7 10 7C12 7 12 5 14 5C16 5 16 7 18 7C20 7 20 5 22 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 10C20 16 12 22 12 22C12 22 4 16 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
}

function TabNavigation({ activeTab, onTabChange }) {
  return (
    <nav className="tab-navigation">
      <div className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">{icons[tab.icon]}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default TabNavigation
