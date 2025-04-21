// types/weather.ts
export interface WeatherData {
    city: string;
    temperature: number;
    weatherDescription: string;
    weatherIcon: string;
    forecast: Forecast[];
    wind: {
      speed: number;
      direction: string;
    };
    humidity: number;
    date: string;
    location: string;
  }
  
  export interface Forecast {
    day: string;
    temperature: number;
    weatherIcon: string;
  }