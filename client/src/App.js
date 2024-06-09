import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getBackgroundClass = () => {
      if (!weatherData) return 'default';
      const main = weatherData.weather[0].main.toLowerCase();
      if (main.includes('cloud')) return 'cloudy';
      if (main.includes('rain')) return 'rainy';
      if (main.includes('clear')) return 'sunny';
      return 'default';
    };

    const backgroundClass = getBackgroundClass();
    document.body.className = backgroundClass;
  }, [weatherData]);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather/${city}`);
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Error fetching weather data. Please try again.');
      setWeatherData(null);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather App</h1>
      </header>
      <main className="app-main">
        <div className="search-container">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="search-input"
          />
          <button onClick={fetchWeather} className="search-button">Get Weather</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p className="weather-main">{weatherData.weather[0].main}</p>
            <p className="weather-description">{weatherData.weather[0].description}</p>
            <p className="temperature">Temperature: {weatherData.main.temp}°C</p>
            <p className="humidity">Humidity: {weatherData.main.humidity}%</p>
            <p className="wind-speed">Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 Weather App</p>
      </footer>
    </div>
  );
}

export default App;
