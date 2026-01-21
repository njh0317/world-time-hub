import { getTimezones } from '../data/timezones';
import { formatUtcOffset } from '../utils/timezone';
import { useTranslation } from '../i18n/useTranslation';

interface TimezoneSelectProps {
  value: string;
  onChange: (timezone: string) => void;
}

export function TimezoneSelect({ value, onChange }: TimezoneSelectProps) {
  const { lang, t } = useTranslation();
  const timezones = getTimezones(lang);
  const sortedTimezones = [...timezones].sort((a, b) => a.utcOffset - b.utcOffset);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input"
      aria-label={t.converter.timezone}
    >
      {sortedTimezones.map((tz) => (
        <option key={tz.id} value={tz.id}>
          {formatUtcOffset(tz.utcOffset)} - {tz.name} ({tz.abbreviation})
        </option>
      ))}
    </select>
  );
}
