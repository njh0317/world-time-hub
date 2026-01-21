import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { ko, enUS, ja } from 'date-fns/locale';

const locales: Record<string, typeof ko> = { ko, en: enUS, ja };
const datePatterns: Record<string, string> = {
  ko: 'yyyy년 MM월 dd일 EEEE',
  en: 'EEEE, MMMM d, yyyy',
  ja: 'yyyy年MM月dd日 EEEE',
};

export function formatTime(date: Date, timeFormat: '12h' | '24h', timezone?: string): string {
  const pattern = timeFormat === '12h' ? 'hh:mm:ss a' : 'HH:mm:ss';
  if (timezone) {
    return formatInTimeZone(date, timezone, pattern);
  }
  return format(date, pattern);
}

export function formatDate(date: Date, lang: string = 'ko', timezone?: string): string {
  const pattern = datePatterns[lang] || datePatterns.ko;
  const locale = locales[lang] || locales.ko;
  if (timezone) {
    return formatInTimeZone(date, timezone, pattern, { locale });
  }
  return format(date, pattern, { locale });
}

export function formatElapsedTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

export function formatRemainingTime(ms: number): string {
  if (ms <= 0) return '00:00:00';
  
  const totalSeconds = Math.ceil(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function parseTimeInput(hours: number, minutes: number, seconds: number): number {
  return (hours * 3600 + minutes * 60 + seconds) * 1000;
}

export function formatTimeOnly(date: Date, timeFormat: '12h' | '24h', timezone?: string): string {
  const pattern = timeFormat === '12h' ? 'hh:mm a' : 'HH:mm';
  if (timezone) {
    return formatInTimeZone(date, timezone, pattern);
  }
  return format(date, pattern);
}
