// Open-Meteo API service for weather data
interface GeocodeResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

interface WeatherResult {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}

// Weather code descriptions for Open-Meteo
const getWeatherDescription = (code: number): string => {
  const descriptions: { [key: number]: string } = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
  };
  return descriptions[code] || "Unknown conditions";
};

const getWeatherCondition = (code: number): string => {
  if (code === 0 || code === 1) return "clear";
  if (code === 2 || code === 3) return "cloudy";
  if (code >= 51 && code <= 82) return "rain";
  if (code >= 95) return "storm";
  return "cloudy";
};

export const searchCity = async (cityName: string): Promise<GeocodeResult | null> => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
    );
    
    if (!response.ok) {
      throw new Error("Failed to search city");
    }
    
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return null;
    }
    
    return data.results[0];
  } catch (error) {
    console.error("Error searching city:", error);
    throw new Error("Failed to find city");
  }
};

export const getWeatherData = async (latitude: number, longitude: number): Promise<WeatherResult> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to get weather data");
  }
};

export const getWeatherForCity = async (cityName: string) => {
  const cityData = await searchCity(cityName);
  
  if (!cityData) {
    throw new Error("City not found");
  }
  
  const weatherData = await getWeatherData(cityData.latitude, cityData.longitude);
  
  return {
    city: `${cityData.name}, ${cityData.country}`,
    temperature: weatherData.current.temperature_2m,
    description: getWeatherDescription(weatherData.current.weather_code),
    humidity: weatherData.current.relative_humidity_2m,
    windSpeed: Math.round(weatherData.current.wind_speed_10m),
    condition: getWeatherCondition(weatherData.current.weather_code)
  };
};
