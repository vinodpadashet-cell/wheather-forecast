import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import Historical from './components/Historical'
import Marine from './components/Marine'
import Locations from './components/Locations'
import TabNavigation from './components/TabNavigation'
import './App.css'

const API_KEY = '13982f3346ee6b56276e8870ab315538'
const BASE_URL = 'http://api.weatherstack.com'

function App() {
  const [activeTab, setActiveTab] = useState('current')
  const [searchQuery, setSearchQuery] = useState('New York')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [coordinates, setCoordinates] = useState({ lat: 40.7128, lon: -74.0060 })

  const fetchWeatherData = async (endpoint, params = {}) => {
    setLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams({
        access_key: API_KEY,
        query: searchQuery,
        ...params
      })
      const response = await fetch(`${BASE_URL}/${endpoint}?${queryParams}`)
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error.info || 'Failed to fetch weather data')
      }
      setWeatherData(data)
      if (data.location) {
        setCoordinates({
          lat: data.location.lat,
          lon: data.location.lon
        })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  useEffect(() => {
    if (activeTab === 'current') {
      fetchWeatherData('current')
    } else if (activeTab === 'forecast') {
      fetchWeatherData('forecast', { forecast_days: 14 })
    } else if (activeTab === 'historical') {
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const dateStr = yesterday.toISOString().split('T')[0]
      fetchWeatherData('historical', { historical_date: dateStr })
    } else if (activeTab === 'marine') {
      fetchWeatherData('marine', { query: `${coordinates.lat},${coordinates.lon}` })
    } else if (activeTab === 'locations') {
      fetchWeatherData('autocomplete', { query: searchQuery })
    }
  }, [activeTab, searchQuery])

  return (
    <div className="app">
      <div className="ambient-bg">
        <div className="ambient-orb orb-1"></div>
        <div className="ambient-orb orb-2"></div>
        <div className="ambient-orb orb-3"></div>
      </div>
      <div className="app-container">
        <Header />
        <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="main-content">
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading weather intelligence...</p>
            </div>
          )}
          
          {error && (
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
          )}
          
          {!loading && !error && weatherData && (
            <>
              {activeTab === 'current' && <CurrentWeather data={weatherData} />}
              {activeTab === 'forecast' && <Forecast data={weatherData} />}
              {activeTab === 'historical' && <Historical data={weatherData} />}
              {activeTab === 'marine' && <Marine data={weatherData} />}
              {activeTab === 'locations' && <Locations data={weatherData} onSelect={handleSearch} />}
            </>
          )}
        </main>
        
        <footer className="app-footer">
          <p>Powered by Weatherstack API | Premium Weather Intelligence Platform</p>
        </footer>
      </div>
    </div>
  )
}

export default App
