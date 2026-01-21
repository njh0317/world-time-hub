import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { CityCard } from '../components/CityCard';
import { CitySearch } from '../components/CitySearch';
import { useTranslation } from '../i18n/useTranslation';

export function WorldClockPage() {
  const { selectedCities } = useStore();
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t.worldClock.title}
        </h2>
        <div className="max-w-md">
          <CitySearch />
        </div>
      </div>
      
      {selectedCities.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          {t.worldClock.addCity}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {selectedCities.map((city) => (
            <CityCard key={city.id} city={city} currentTime={currentTime} />
          ))}
        </div>
      )}
    </div>
  );
}
