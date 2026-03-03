"use client";

import { useEffect, useState } from "react";
import StormWeather from "@/components/StormWeather";
import CalmWeather from "@/components/CalmWeather";
import { 
  getUserLocation, 
  getCurrentWeather, 
  isStormyWeather,
  getWeatherDescription 
} from "@/lib/weatherService";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [isStormy, setIsStormy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Get user's location
        const location = await getUserLocation();
        
        // Fetch current weather
        const weather = await getCurrentWeather(
          location.latitude, 
          location.longitude
        );
        
        if (weather) {
          setWeatherData(weather);
          setIsStormy(isStormyWeather(weather));
          
          // Log weather info for debugging
          console.log('Current Weather:', {
            description: getWeatherDescription(weather.weather_code),
            isStormy: isStormyWeather(weather),
            temperature: weather.temperature_2m,
            precipitation: weather.precipitation,
            windSpeed: weather.wind_speed_10m
          });
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError(err.message);
        setLoading(false);
        
        // Default to calm weather if location/weather fetch fails
        setIsStormy(false);
      }
    }

    fetchWeather();
    
    // Refresh weather every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-700">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400 mb-4"></div>
          <p className="text-white text-xl">Checking weather conditions...</p>
          <p className="text-blue-200 text-sm mt-2">Getting your location and current weather</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-700">
        <div className="text-center max-w-md p-8 bg-white/10 rounded-2xl backdrop-blur-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-4">Location Access Required</h2>
          <p className="text-blue-200 mb-6">
            This app needs your location to check if it's stormy in your area.
          </p>
          <p className="text-sm text-blue-300 mb-6">
            Error: {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
          >
            Try Again
          </button>
          
          <div className="mt-6 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
            <p className="text-yellow-200 text-sm">
              💡 Make sure to allow location access when prompted by your browser
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show appropriate weather view
  return isStormy ? (
    <StormWeather weatherData={weatherData} />
  ) : (
    <CalmWeather weatherData={weatherData} />
  );
}
