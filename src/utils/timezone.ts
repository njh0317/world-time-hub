import { toZonedTime, fromZonedTime, getTimezoneOffset } from 'date-fns-tz';

export function convertTime(date: Date, fromTz: string, toTz: string): Date {
  const utcDate = fromZonedTime(date, fromTz);
  return toZonedTime(utcDate, toTz);
}

export function getUtcOffset(timezone: string, date: Date = new Date()): number {
  return getTimezoneOffset(timezone, date) / (1000 * 60);
}

export function formatUtcOffset(offsetMinutes: number): string {
  const hours = Math.floor(Math.abs(offsetMinutes) / 60);
  const minutes = Math.abs(offsetMinutes) % 60;
  const sign = offsetMinutes >= 0 ? '+' : '-';
  return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function getTimezoneAbbreviation(timezone: string, date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'short',
    });
    const parts = formatter.formatToParts(date);
    const tzPart = parts.find(p => p.type === 'timeZoneName');
    return tzPart?.value || timezone;
  } catch {
    return timezone;
  }
}

export function getCurrentTimeInTimezone(timezone: string): Date {
  return toZonedTime(new Date(), timezone);
}
