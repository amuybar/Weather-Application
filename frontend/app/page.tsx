'use client';

import { useState, useEffect } from 'react';
import { WeatherData } from '@/types/weather';
import ForecastSection from '@/components/ForecastSection';
import HumidityStatus from '@/components/HumidityStatus';
import SearchBar from '@/components/SearchBar';
import WindStatus from '@/components/WindStatus';
import CurrentWeather from '@/components/CurrentWeather';

/**
 * Home Component
 * 
 * Main weather dashboard that displays current weather, forecast,
 * wind status, and humidity information. Allows searching for 
 * weather data by city and toggling between temperature units.
 */
export default function Home() {
  // State management
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches weather data from the API
   * @param city - The city name to fetch weather data for (defaults to 'Nakuru')
   */
  const fetchWeatherData = async (city: string = 'Nakuru') => {
    try {
      setLoading(true);
      setError(null);
      
      // Build the API query with city parameter
      const queryParam = city ? `?city=${encodeURIComponent(city)}` : '';
      const res = await fetch(`/api/weather${queryParam}`);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch weather data: ${res.statusText}`);
      }
      
      const data: WeatherData = await res.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the search submission from the SearchBar component
   * @param city - The city name entered in the search bar
   */
  const handleSearch = (city: string) => {
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  /**
   * Toggles between Celsius and Fahrenheit temperature units
   */
  const toggleTempUnit = () => {
    setTempUnit(tempUnit === 'C' ? 'F' : 'C');
  };

  /**
   * Converts temperature to the selected unit
   * @param temp - Temperature in Celsius
   * @returns Temperature in the selected unit (Celsius or Fahrenheit)
   */
  const convertTemp = (temp: number): number => {
    if (tempUnit === 'F') {
      return Math.round((temp * 9/5) + 32);
    }
    return temp;
  };

  // Fetch weather data on component mount
  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Loading state UI
  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-screen-lg">
        <div className="bg-white shadow-lg rounded-lg p-6 min-h-[500px]">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-slate-200 h-24 w-24 mb-4"></div>
              <div className="h-6 bg-slate-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-1/4 mb-6"></div>
              
              {/* Pulse animation for forecast cards */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-slate-200 rounded-lg h-32"></div>
                ))}
              </div>
              
              {/* Pulse animation for status widgets */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="bg-slate-200 rounded-lg h-24"></div>
                <div className="bg-slate-200 rounded-lg h-24"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  // No data state UI
  if (!weatherData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
          No weather data available. Please try searching for a city.
        </div>
      </div>
    );
  }

  // Main UI with weather data
  return (
    <div className="container mx-auto my-auto p-4 max-w-screen-lg">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Main content grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left column - Current weather and location */}
          <div className="md:col-span-1 border-b md:border-b-0 md:border-r pr-0 md:pr-4 pb-4 md:pb-0">
            <CurrentWeather 
              loading={loading}
              temperature={convertTemp(weatherData.temperature)}
              description={weatherData.weatherDescription}
              icon={weatherData.weatherIcon}
            />
            <div className="mt-6 text-center">
              <div className="text-lg">{weatherData.date}</div>
              <div className="text-lg font-medium">{weatherData.location}</div>
            </div>
          </div>

          {/* Right column - Search, forecast, and status widgets */}
          <div className="md:col-span-3">
            {/* Search bar and temperature unit toggle */}
            <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-3">
              <SearchBar onSearch={handleSearch} />
              <button 
                onClick={toggleTempUnit}
                className="ml-0 sm:ml-4 px-3 py-2 border rounded-lg hover:bg-gray-100 transition-colors"
                aria-label={`Switch to degrees ${tempUnit === 'C' ? 'Fahrenheit' : 'Celsius'}`}
              >
                °{tempUnit}
              </button>
            </div>

            {/* Weather forecast section */}
            <div className="mb-6">
              <ForecastSection 
                loading={loading}
                forecast={weatherData.forecast.map(day => ({
                  ...day,
                  temperature: convertTemp(day.temperature)
                }))} 
              />
            </div>

            {/* Wind and humidity status widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <WindStatus 
                loading={loading}
                speed={weatherData.wind.speed} 
                direction={weatherData.wind.direction} 
              />
              <HumidityStatus 
                loading={loading} 
                humidity={weatherData.humidity} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}