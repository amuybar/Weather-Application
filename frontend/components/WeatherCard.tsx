/**
 * Displays a weather card for a specific day, showing the day, temperature, and weather icon.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.day - The day label (e.g., 'Mon', 'Tue').
 * @param {number} props.temperature - The temperature in Celsius.
 * @param {string} props.weatherIcon - The weather icon code (e.g., '01d').
 * @returns {JSX.Element} The rendered weather card.
 */
import WeatherIcon from './WeatherIcon';

interface WeatherCardProps {
  day: string;
  temperature: number;
  weatherIcon: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ day, temperature, weatherIcon }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
      <div className="text-center font-medium mb-2">{day}</div>
      <div className="transition-transform duration-300 hover:scale-110">
        <WeatherIcon type={weatherIcon} />
      </div>
      <div
        className="text-center mt-2 text-lg font-bold"
        aria-label={`Temperature is ${temperature} degrees Celsius`}
      >
        {temperature}°C
      </div>
    </div>
  );
};

export default WeatherCard;