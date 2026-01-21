import type { RemainingTime } from '../types';

export function calculateRemaining(targetDate: Date): RemainingTime {
  const now = new Date();
  const totalMs = targetDate.getTime() - now.getTime();
  
  if (totalMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
  }
  
  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return { days, hours, minutes, seconds, totalMs };
}

export function hasReached(targetDate: Date): boolean {
  return new Date() >= targetDate;
}

export function formatCountdown(remaining: RemainingTime): string {
  const parts: string[] = [];
  
  if (remaining.days > 0) parts.push(`${remaining.days}일`);
  if (remaining.hours > 0 || parts.length > 0) parts.push(`${remaining.hours}시간`);
  if (remaining.minutes > 0 || parts.length > 0) parts.push(`${remaining.minutes}분`);
  parts.push(`${remaining.seconds}초`);
  
  return parts.join(' ');
}
