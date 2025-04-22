import { ForecastDay } from '@/types/weather';
import WeatherCard from './WeatherCard';

/**
 * Displays a section of weather forecast cards.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ForecastDay[]} props.forecast - Array of forecast data for each day.
 * @param {boolean} [props.loading=false] - Indicates if the forecast data is loading.
 * @returns {JSX.Element} The rendered forecast section or a loading state.
 */
interface ForecastSectionProps {
  forecast: ForecastDay[];
  loading?: boolean;
}

const ForecastSection: React.FC<ForecastSectionProps> = ({ loading,forecast  }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {loading
        ? Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-100 animate-pulse rounded-lg h-36 flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full mb-2"></div>
              <div className="h-4 w-16 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 w-12 bg-gray-200 rounded"></div>
            </div>
          ))
        : forecast.map((item, index) => (
            <WeatherCard
              key={index}
              day={item.day}
              temperature={item.temperature}
              weatherIcon={item.weatherIcon}
            />
          ))}
    </div>
  );
};

export default ForecastSection;