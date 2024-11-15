import React, { useState, useEffect } from 'react';
import { fetchWeatherDataByCoordinates } from '../api/weatherApi';

const Home = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError("Failed to get your location.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const getWeather = async () => {
      if (!location.latitude || !location.longitude) return;

      setLoading(true);
      console.log("Requesting weather data with coordinates:", location.latitude, location.longitude);
      const data = await fetchWeatherDataByCoordinates(location.latitude, location.longitude);
      if (data && data.main) {
        setWeather(data);
      } else {
        console.error("Invalid data received or no data returned from API");
        setError("Failed to load weather data.");
      }
      setLoading(false);
    };

    if (location.latitude && location.longitude) {
      getWeather();
    }
  }, [location]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="weather-content">
      <h1>Current Weather</h1>
      {weather ? (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
