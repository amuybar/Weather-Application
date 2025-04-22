/**
 * Displays the current humidity as a percentage and a progress bar.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number | undefined} props.humidity - The current humidity percentage (0-100).
 * @param {boolean} [props.loading=false] - Indicates if the humidity data is loading.
 * @returns {JSX.Element} The rendered humidity status or a loading state.
 */
interface HumidityStatusProps {
    humidity?: number;
    loading?: boolean;
  }
  
  const HumidityStatus: React.FC<HumidityStatusProps> = ({ humidity, loading = false }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm" aria-busy={loading} aria-live="polite">
        <div className="text-center font-medium mb-4">Humidity</div>
        {loading ? (
          <div className="text-center text-xl animate-pulse mb-4">Loading...</div>
        ) : (
          <>
            <div className="text-center text-3xl font-bold mb-4">
              {humidity !== undefined ? `${humidity}%` : '--'}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-400 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${humidity ?? 0}%` }}
                aria-valuenow={humidity ?? 0}
                aria-valuemin={0}
                aria-valuemax={100}
                role="progressbar"
              ></div>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default HumidityStatus;