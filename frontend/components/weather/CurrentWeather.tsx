// components/weather/CurrentWeather.tsx
interface CurrentWeatherProps {
    icon: string;
    temperature: number;
    description: string;
    date: string;
    location: string;
    unit: 'C' | 'F';
  }
  
  export default function CurrentWeather({
    icon,
    temperature,
    description,
    date,
    location,
    unit
  }: CurrentWeatherProps) {
    // Convert temperature if needed
    const displayTemp = unit === 'F' 
      ? Math.round(temperature * 9/5 + 32) 
      : Math.round(temperature);
  
    return (
      <div className="flex flex-col items-center p-4">
        <div className="text-6xl mb-2">
          {/* Render appropriate weather icon based on the icon code */}
          {icon === 'sunny' && (
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
              </svg>
            </div>
          )}
          {icon === 'cloudy' && (
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
              </svg>
            </div>
          )}
          {/* Add more icon conditions as needed */}
        </div>
        <div className="text-3xl font-bold mt-2">{displayTemp} °{unit}</div>
        <div className="text-xl mt-1">{description}</div>
        <div className="mt-4 text-gray-600">
          <div>{date}</div>
          <div>{location}</div>
        </div>
      </div>
    );
  }