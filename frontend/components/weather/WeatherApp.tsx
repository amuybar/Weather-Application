// components/weather/WeatherApp.tsx
"use client";

import { useState, useEffect } from 'react';
import { WeatherData } from '@/types/weather';
import CurrentWeather from './CurrentWeather';
import ForecastSection from './ForecastSection';
import SearchBox from './SearchBox';
import WindHumiditySection from './WindHumiditySection';

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Replace with your actual PHP backend URL
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError('Error fetching weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  useEffect(() => {
    // Default city on load
    fetchWeatherData('Nairobi');
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="card bg-white shadow-lg">
        <div className="flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="w-1/4">
              {/* Logo placeholder */}
            </div>
            <div className="w-2/4">
              <SearchBox onSearch={fetchWeatherData} />
            </div>
            <div className="w-1/4 flex justify-end">
              <button 
                className="btn btn-sm" 
                onClick={toggleUnit}
              >
                °{unit}
              </button>
            </div>
          </div>
          
          {loading && (
            <div className="flex justify-center items-center h-60">
              <div className="spinner-circle"></div>
            </div>
          )}
          
          {error && (
            <div className="alert alert-error">{error}</div>
          )}
          
          {weatherData && !loading && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <CurrentWeather 
                    icon={weatherData.weatherIcon}
                    temperature={weatherData.temperature}
                    description={weatherData.weatherDescription}
                    date={weatherData.date}
                    location={weatherData.location}
                    unit={unit}
                  />
                </div>
                <div className="col-span-2">
                  <ForecastSection forecast={weatherData.forecast} unit={unit} />
                </div>
              </div>
              
              <div className="mt-4">
                <WindHumiditySection 
                  wind={weatherData.wind} 
                  humidity={weatherData.humidity} 
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


