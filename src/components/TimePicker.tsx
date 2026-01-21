interface TimePickerProps {
  hours: number;
  minutes: number;
  onChange: (hours: number, minutes: number) => void;
}

export function TimePicker({ hours, minutes, onChange }: TimePickerProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        min={0}
        max={23}
        value={hours.toString().padStart(2, '0')}
        onChange={(e) => onChange(Math.min(23, Math.max(0, parseInt(e.target.value) || 0)), minutes)}
        className="input w-20 text-center text-xl font-mono"
        aria-label="시"
      />
      <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">:</span>
      <input
        type="number"
        min={0}
        max={59}
        value={minutes.toString().padStart(2, '0')}
        onChange={(e) => onChange(hours, Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
        className="input w-20 text-center text-xl font-mono"
        aria-label="분"
      />
    </div>
  );
}
