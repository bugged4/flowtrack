// lib/weatherService.js
// This service fetches real-time weather data and determines if it's stormy

export async function getCurrentWeather(latitude, longitude) {
  try {
    // Using Open-Meteo API (free, no API key required)
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,precipitation,wind_speed_10m&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error('Weather fetch failed');
    }
    
    const data = await response.json();
    return data.current;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}

export function isStormyWeather(weatherData) {
  if (!weatherData) return false;
  
  const { weather_code, precipitation, wind_speed_10m } = weatherData;
  
  // WMO Weather codes for stormy conditions
  // 95, 96, 99: Thunderstorm
  // 80-82: Rain showers
  // 85-86: Snow showers
  // 51-67: Drizzle and rain
  const stormyCodes = [
    51, 53, 55, 56, 57, // Drizzle
    61, 63, 65, 66, 67, // Rain
    80, 81, 82, // Rain showers
    85, 86, // Snow showers
    95, 96, 99 // Thunderstorms
  ];
  
  const isStormyCode = stormyCodes.includes(weather_code);
  const hasHeavyPrecipitation = precipitation > 2.5; // mm/hour
  const hasStrongWind = wind_speed_10m > 30; // km/h
  
  // Consider it stormy if weather code indicates storm OR heavy precipitation/wind
  return isStormyCode || hasHeavyPrecipitation || hasStrongWind;
}

export function getWeatherDescription(weatherCode) {
  const weatherDescriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  
  return weatherDescriptions[weatherCode] || 'Unknown';
}

// Get user's geolocation
export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}
