// components/weather/WindHumiditySection.tsx
interface WindHumidityProps {
    wind: {
      speed: number;
      direction: string;
    };
    humidity: number;
  }
  
  export default function WindHumiditySection({ wind, humidity }: WindHumidityProps) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body p-4">
            <h3 className="card-title text-sm mb-4">Wind Status</h3>
            <div className="flex justify-center items-center">
              <div className="text-3xl font-bold">{wind.speed} km/h</div>
            </div>
            <div className="flex justify-center mt-2 text-sm">
              Direction: {wind.direction}
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body p-4">
            <h3 className="card-title text-sm mb-4">Humidity</h3>
            <div className="flex justify-center items-center">
              <div className="text-3xl font-bold">{humidity}%</div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${humidity}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }