import { useTranslation } from '../i18n/useTranslation';

interface TimeInputProps {
  hours: number;
  minutes: number;
  seconds: number;
  onChange: (hours: number, minutes: number, seconds: number) => void;
  disabled?: boolean;
}

export function TimeInput({ hours, minutes, seconds, onChange, disabled }: TimeInputProps) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      <input
        type="number"
        min={0}
        max={99}
        value={hours.toString().padStart(2, '0')}
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0), minutes, seconds)}
        className="input w-14 sm:w-20 text-center text-xl sm:text-2xl font-mono px-1 sm:px-3"
        disabled={disabled}
        aria-label="hours"
      />
      <span className="text-2xl sm:text-3xl font-bold text-gray-600 dark:text-gray-400">:</span>
      <input
        type="number"
        min={0}
        max={59}
        value={minutes.toString().padStart(2, '0')}
        onChange={(e) => onChange(hours, Math.min(59, Math.max(0, parseInt(e.target.value) || 0)), seconds)}
        className="input w-14 sm:w-20 text-center text-xl sm:text-2xl font-mono px-1 sm:px-3"
        disabled={disabled}
        aria-label="minutes"
      />
      <span className="text-2xl sm:text-3xl font-bold text-gray-600 dark:text-gray-400">:</span>
      <input
        type="number"
        min={0}
        max={59}
        value={seconds.toString().padStart(2, '0')}
        onChange={(e) => onChange(hours, minutes, Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
        className="input w-14 sm:w-20 text-center text-xl sm:text-2xl font-mono px-1 sm:px-3"
        disabled={disabled}
        aria-label="seconds"
      />
    </div>
  );
}

const presetMinutes = [1, 5, 10, 15, 30];

interface PresetButtonsProps {
  onSelect: (ms: number) => void;
  disabled?: boolean;
}

export function PresetButtons({ onSelect, disabled }: PresetButtonsProps) {
  const { lang } = useTranslation();
  const minLabel = { ko: '분', en: 'min', ja: '分' };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {presetMinutes.map((min) => (
        <button
          key={min}
          onClick={() => onSelect(min * 60 * 1000)}
          className="btn-secondary text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2"
          disabled={disabled}
        >
          {min}{minLabel[lang]}
        </button>
      ))}
    </div>
  );
}
