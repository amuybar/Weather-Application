/**
 * SearchBar component for entering a city name and triggering a search.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {(city: string) => void} props.onSearch - Callback when a city is submitted.
 * @returns {JSX.Element} The rendered search bar.
 */
import { useState, FormEvent, ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    if (trimmedCity) {
      onSearch(trimmedCity);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full" role="search" aria-label="City search">
      <input
        type="text"
        placeholder="Search city..."
        className="px-4 py-2 border rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={city}
        onChange={handleInputChange}
        aria-label="City name"
        autoComplete="off"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        disabled={!city.trim()}
        aria-label="Search"
      >
        Go
      </button>
    </form>
  );
};

export default SearchBar;