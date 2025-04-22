import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  loading: boolean;
  temperature?: number;
  description?: string;
  icon?: string;
}

/**
 * Displays the current weather information including temperature, description, and icon.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.loading - Indicates if the weather data is currently loading.
 * @param {number | undefined} props.temperature - The current temperature in Celsius.
 * @param {string | undefined} props.description - A short description of the current weather.
 * @param {string | undefined} props.icon - The weather icon code (e.g., '01d').
 *
 * @returns {JSX.Element} The rendered component showing weather details or a loading state.
 *

 */
const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  loading,
  temperature,
  description,
  icon,
}) => {
  return (
    <div
      className="flex flex-col items-center p-4"
      aria-busy={loading}
      aria-live="polite"
    >
      {loading ? (
        <div className="text-xl animate-pulse">Loading...</div>
      ) : (
        <>
          <div className="transition-transform duration-300 hover:scale-110">
            <WeatherIcon type={icon || '01d'} />
          </div>
          <div
            className="text-3xl font-bold mt-2"
            aria-label={
              temperature !== undefined
                ? `Current temperature is ${temperature} degrees Celsius`
                : 'Temperature unavailable'
            }
          >
            {temperature !== undefined ? `${temperature} °C` : '--'}
          </div>
          <div className="text-xl mt-1">
            {description || 'No description available'}
          </div>
        </>
      )}
    </div>
  );
};

export default CurrentWeather;