import axios from 'axios';

// OpenWeatherMap API key
const API_KEY = "66c61925b9e24f5b9bbf9ce4f4da3686";

// Nykyisen säädatan haku koordinaattien perusteella
export const fetchWeatherDataByCoordinates = async (latitude, longitude) => {
  try {
    console.log("Fetching weather data for coordinates:", latitude, longitude);
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY,
          units: 'metric', // Celsius-asteet
        }
      }
    );
    console.log("Weather data response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data by coordinates:", error);
    return null;
  }
};

// Ennusteen haku koordinaattien perusteella
export const fetchWeatherForecast = async (latitude, longitude) => {
  try {
    console.log("Fetching weather forecast for coordinates:", latitude, longitude);
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY,
          units: 'metric',
        }
      }
    );
    console.log("Weather forecast response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    return null;
  }
};