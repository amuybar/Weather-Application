// components/weather/SearchBox.tsx
"use client";

import { useState } from 'react';

interface SearchBoxProps {
  onSearch: (city: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        placeholder="Search city..."
        className="input input-bordered w-full"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button 
        type="submit" 
        className="btn btn-primary ml-2"
      >
        Go
      </button>
    </form>
  );
}