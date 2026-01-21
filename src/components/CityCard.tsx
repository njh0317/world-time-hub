import type { City } from '../types';
import { useStore } from '../store';
import { formatTime, formatDate } from '../utils/format';
import { getUtcOffset, formatUtcOffset } from '../utils/timezone';
import { getCityById } from '../data/cities';
import { useTranslation } from '../i18n/useTranslation';

interface CityCardProps {
  city: City;
  currentTime: Date;
}

export function CityCard({ city, currentTime }: CityCardProps) {
  const { settings, removeCity } = useStore();
  const { lang, t } = useTranslation();
  const offset = getUtcOffset(city.timezone, currentTime);
  
  // Get localized city data
  const localizedCity = getCityById(city.id, lang) || city;

  return (
    <div className="card relative group p-4 sm:p-6">
      <button
        onClick={() => removeCity(city.id)}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-100 sm:opacity-0 group-hover:opacity-100 p-1.5 sm:p-1 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-all text-sm"
        aria-label={`${t.common.remove} ${localizedCity.name}`}
      >
        ✕
      </button>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-1 sm:mb-2 pr-8">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
            {localizedCity.name}
          </h3>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 shrink-0">
            {localizedCity.country}
          </span>
        </div>
        <div className="text-3xl sm:text-4xl font-mono font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">
          {formatTime(currentTime, settings.timeFormat, city.timezone)}
        </div>
        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          {formatDate(currentTime, lang, city.timezone)}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          {formatUtcOffset(offset)}
        </div>
      </div>
    </div>
  );
}
