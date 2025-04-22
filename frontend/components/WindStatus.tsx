/**
 * Displays the current wind speed and direction.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number | undefined} props.speed - The wind speed in km/h.
 * @param {string | undefined} props.direction - The wind direction (e.g., 'N', 'NE').
 * @param {boolean} [props.loading=false] - Indicates if the wind data is loading.
 * @returns {JSX.Element} The rendered wind status or a loading state.
 */
interface WindStatusProps {
  speed?: number;
  direction?: string;
  loading?: boolean;
}

const WindStatus: React.FC<WindStatusProps> = ({ speed, direction, loading = false }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm" aria-busy={loading} aria-live="polite">
      <div className="text-center font-medium mb-4">Wind Status</div>
      {loading ? (
        <div className="text-center text-xl animate-pulse mb-4">Loading...</div>
      ) : (
        <>
          <div className="text-center text-3xl font-bold mb-4">
            {speed !== undefined ? `${speed} km/h` : '--'}
          </div>
          <div className="flex justify-center">
            <div className="bg-gray-200 rounded-full p-2">
              <span>{direction || '--'}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WindStatus;