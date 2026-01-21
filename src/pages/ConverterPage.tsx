import { useState } from 'react';
import { TimePicker } from '../components/TimePicker';
import { TimezoneSelect } from '../components/TimezoneSelect';
import { convertTime } from '../utils/timezone';
import { detectDateChange } from '../utils/dateChange';
import type { DateChangeResult } from '../utils/dateChange';
import { formatTimeOnly, formatDate } from '../utils/format';
import { useStore } from '../store';
import { useTranslation } from '../i18n/useTranslation';

export function ConverterPage() {
  const { settings } = useStore();
  const { t, lang } = useTranslation();
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [fromTimezone, setFromTimezone] = useState('Asia/Seoul');
  const [toTimezones, setToTimezones] = useState<string[]>(['America/New_York']);

  const sourceDate = new Date();
  sourceDate.setHours(hours, minutes, 0, 0);

  const addTargetTimezone = () => {
    setToTimezones([...toTimezones, 'Europe/London']);
  };

  const removeTargetTimezone = (index: number) => {
    setToTimezones(toTimezones.filter((_, i) => i !== index));
  };

  const updateTargetTimezone = (index: number, timezone: string) => {
    const updated = [...toTimezones];
    updated[index] = timezone;
    setToTimezones(updated);
  };

  const getDateChangeMsg = (result: DateChangeResult) => {
    if (!result.hasChanged) return null;
    if (result.direction === 'next') return t.converter.nextDay;
    return t.converter.prevDay;
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
        {t.converter.title}
      </h2>

      <div className="card mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
          {t.converter.sourceTime}
        </h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">{t.converter.time}</label>
            <TimePicker
              hours={hours}
              minutes={minutes}
              onChange={(h, m) => { setHours(h); setMinutes(m); }}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">{t.converter.timezone}</label>
            <TimezoneSelect value={fromTimezone} onChange={setFromTimezone} />
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            {t.converter.result}
          </h3>
          <button onClick={addTargetTimezone} className="btn-primary text-sm sm:text-base">
            {t.converter.addTimezone}
          </button>
        </div>

        {toTimezones.map((tz, index) => {
          const converted = convertTime(sourceDate, fromTimezone, tz);
          const dateChange = detectDateChange(sourceDate, converted);
          const dateChangeMsg = getDateChangeMsg(dateChange);

          return (
            <div key={index} className="card">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <TimezoneSelect
                      value={tz}
                      onChange={(newTz) => updateTargetTimezone(index, newTz)}
                    />
                  </div>
                  {toTimezones.length > 1 && (
                    <button
                      onClick={() => removeTargetTimezone(index)}
                      className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors flex-shrink-0"
                      aria-label={t.common.remove}
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-blue-600 dark:text-blue-400">
                    {formatTimeOnly(converted, settings.timeFormat, tz)}
                    {dateChangeMsg && (
                      <span className="text-xs sm:text-sm font-normal text-orange-500 ml-2">
                        {dateChangeMsg}
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {formatDate(converted, lang, tz)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
