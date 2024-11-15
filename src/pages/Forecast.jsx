import React, { useState, useEffect } from 'react';
import { fetchWeatherForecast } from '../api/weatherApi';
import { Container, Row, Col } from 'react-bootstrap';

const Forecast = () => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getForecast = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              const data = await fetchWeatherForecast(latitude, longitude);
              setForecast(data);
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
      } catch (error) {
        setError("Error loading forecast data.");
        setLoading(false);
      }
    };

    getForecast();
  }, []);

  if (loading) {
    return <p>Loading forecast...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Weather Forecast</h1>
      {forecast && forecast.list ? (
        <Row className="justify-content-center">
          {forecast.list.slice(0, 5).map((entry, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={2} className="text-center mb-4">
              <p>{new Date(entry.dt * 1000).toLocaleDateString("en-US", { weekday: 'long', hour: 'numeric' })}</p>
              <p>Temperature: {entry.main.temp}°C</p>
              <p>Condition: {entry.weather[0].description}</p>
              <img src={`http://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`} alt="Weather icon" />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No forecast data available.</p>
      )}
    </Container>
  );
};

export default Forecast;
