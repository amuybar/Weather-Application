// components/weather/ForecastSection.tsx
import { Forecast } from '@/types/weather';

interface ForecastSectionProps {
  forecast: Forecast[];
  unit: 'C' | 'F';
}

export default function ForecastSection({ forecast, unit }: ForecastSectionProps) {
  // Convert temperature if needed
  const convertTemp = (temp: number) => {
    return unit === 'F' 
      ? Math.round(temp * 9/5 + 32) 
      : Math.round(temp);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {forecast.map((day, index) => (
        <div key={index} className="card bg-base-100 shadow-sm">
          <div className="card-body p-4 flex flex-col items-center">
            <div className="card-title text-sm">{day.day}</div>
            
            <div className="text-4xl my-2">
              {/* Render weather icon */}
              {day.weatherIcon === 'sunny' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                </svg>
              )}
              {day.weatherIcon === 'cloudy' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                </svg>
              )}
              {/* Add more icon conditions as needed */}
            </div>
            
            <div className="text-sm">{convertTemp(day.temperature)} °{unit}</div>
          </div>
        </div>
      ))}
    </div>
  );
}