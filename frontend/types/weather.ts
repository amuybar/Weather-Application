
export interface ForecastDay {
  day: string;
  temperature: number;
  weatherIcon: string;
}

export interface Wind {
  speed: number;
  direction: string;
}

export interface WeatherData {
  city: string;
  temperature: number;
  weatherDescription: string;
  weatherIcon: string;
  forecast: ForecastDay[];
  wind: Wind;
  humidity: number;
  date: string;
  location: string;
}