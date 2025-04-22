
interface WeatherIconProps {
    type: string;
  }
  
/**
 * WeatherIcon component renders a weather icon SVG based on the provided weather type.
 *
 * @param {WeatherIconProps} props - The props for the WeatherIcon component.
 * @param {'sunny' | 'cloudy' | 'rainy'} props.type - The type of weather to display an icon for.
 * @returns {JSX.Element} The corresponding weather icon as a JSX element, or a fallback if the type is unknown.
 *
 * @example
 * <WeatherIcon type="sunny" />
 */
  const WeatherIcon: React.FC<WeatherIconProps> = ({ type }) => {
    const icons = {
      sunny: (
        <div className="text-4xl flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      ),
      cloudy: (
        <div className="text-4xl flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
            <path d="M19 18H6a4 4 0 1 1 0-8h.5a5.5 5.5 0 0 1 11 0H19a3 3 0 0 1 0 6z" />
          </svg>
        </div>
      ),
      rainy: (
        <div className="text-4xl flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
            <path d="M19 18H6a4 4 0 1 1 0-8h.5a5.5 5.5 0 0 1 11 0H19a3 3 0 0 1 0 6z" />
            <path d="M8 20v2M12 20v2M16 20v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      )
    };
  
    return icons[type as keyof typeof icons] || <div>No icon</div>;
  };
  
  export default WeatherIcon;