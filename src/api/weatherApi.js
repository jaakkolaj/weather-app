import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
console.log("API key:", API_KEY);



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