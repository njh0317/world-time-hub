import { useState, useEffect } from 'react';
import { getTimezones } from '../data/timezones';
import { searchTimezones, sortTimezonesByOffset } from '../utils/search';
import { formatUtcOffset } from '../utils/timezone';
import { formatTime } from '../utils/format';
import { useStore } from '../store';
import { useTranslation } from '../i18n/useTranslation';

export function TimezoneListPage() {
  const { settings } = useStore();
  const { t, lang } = useTranslation();
  const [query, setQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const timezones = getTimezones(lang);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const filtered = searchTimezones(query, timezones);
  const sorted = sortTimezonesByOffset(filtered);

  const moreText = { ko: '외', en: 'and', ja: '他' };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
        {t.timezoneList.title}
      </h2>

      <div className="mb-4 sm:mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.timezoneList.searchTimezone}
          className="input w-full sm:max-w-md text-sm sm:text-base"
          aria-label={t.timezoneList.searchTimezone}
        />
      </div>

      <div className="space-y-2">
        {sorted.map((tz) => (
          <div
            key={tz.id}
            className="card flex flex-col gap-2 sm:gap-4 py-3 sm:py-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="font-mono text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {formatUtcOffset(tz.utcOffset)}
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
                    {tz.name}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    ({tz.abbreviation})
                  </span>
                </div>
                {tz.cities.length > 0 && (
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                    {tz.cities.slice(0, 3).join(', ')}
                    {tz.cities.length > 3 && ` ${moreText[lang]} ${tz.cities.length - 3}`}
                  </div>
                )}
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
                {formatTime(currentTime, settings.timeFormat, tz.id)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-8 sm:py-12 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          {t.common.noResults}
        </div>
      )}
    </div>
  );
}
