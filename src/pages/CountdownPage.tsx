import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { calculateRemaining, hasReached, formatCountdown } from '../utils/countdown';
import type { CountdownEvent } from '../types';
import { formatDate } from '../utils/format';
import { useTranslation } from '../i18n/useTranslation';

export function CountdownPage() {
  const { countdownEvents, addCountdownEvent, removeCountdownEvent } = useStore();
  const { t, lang } = useTranslation();
  const [name, setName] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('12:00');
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAdd = () => {
    if (!name.trim() || !targetDate) return;
    const [year, month, day] = targetDate.split('-').map(Number);
    const [hours, minutes] = targetTime.split(':').map(Number);
    const target = new Date(year, month - 1, day, hours, minutes);
    const event: CountdownEvent = {
      id: Date.now().toString(),
      name: name.trim(),
      targetDate: target,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    addCountdownEvent(event);
    setName('');
    setTargetDate('');
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">{t.countdown.title}</h2>
      <div className="card mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">{t.countdown.addNew}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.countdown.eventName} className="input text-sm sm:text-base" />
          <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="input text-sm sm:text-base" />
          <input type="time" value={targetTime} onChange={(e) => setTargetTime(e.target.value)} className="input text-sm sm:text-base" />
          <button onClick={handleAdd} className="btn-primary text-sm sm:text-base">{t.common.add}</button>
        </div>
      </div>
      {countdownEvents.length === 0 ? (
        <div className="text-center py-8 sm:py-12 text-gray-500 dark:text-gray-400 text-sm sm:text-base">{t.countdown.addEvent}</div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {countdownEvents.map((event) => {
            const target = new Date(event.targetDate);
            const reached = hasReached(target);
            const remaining = calculateRemaining(target);
            return (
              <div key={event.id} className={`card ${reached ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">{event.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{formatDate(target, lang)}</p>
                    </div>
                    <button onClick={() => removeCountdownEvent(event.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg flex-shrink-0" aria-label={t.common.remove}>✕</button>
                  </div>
                  <div className="flex items-center justify-between">
                    {reached ? (
                      <span className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">{t.countdown.completed}</span>
                    ) : (
                      <div>
                        <div className="text-xl sm:text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">{formatCountdown(remaining)}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{t.countdown.remaining}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
