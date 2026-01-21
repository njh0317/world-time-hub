import { useState, useRef, useEffect, useMemo } from 'react';
import type { City } from '../types';
import { getCities } from '../data/cities';
import { searchCities } from '../utils/search';
import { useStore } from '../store';
import { useTranslation } from '../i18n/useTranslation';

export function CitySearch() {
  const { t, lang } = useTranslation();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<City[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { addCity, selectedCities } = useStore();

  // Memoize cities to prevent infinite loop
  const cities = useMemo(() => getCities(lang), [lang]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchCities(query, cities).filter(
        (c) => !selectedCities.find((sc) => sc.id === c.id)
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, selectedCities, cities]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: City) => {
    addCity(city);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.worldClock.searchCity}
        className="input"
        aria-label={t.worldClock.searchCity}
      />
      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto"
        >
          {results.map((city) => (
            <button
              key={city.id}
              onClick={() => handleSelect(city)}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex justify-between items-center"
            >
              <span className="font-medium text-gray-900 dark:text-white">
                {city.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {city.country}
              </span>
            </button>
          ))}
        </div>
      )}
      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-center text-gray-500 dark:text-gray-400">
          {t.common.noResults}
        </div>
      )}
    </div>
  );
}
