import type { DSTInfo } from '../types';
import { dstRegions } from '../data/timezones';
import { getTimezoneOffset } from 'date-fns-tz';

export function isDstActive(timezone: string, date: Date = new Date()): boolean {
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  
  const janOffset = getTimezoneOffset(timezone, jan);
  const julOffset = getTimezoneOffset(timezone, jul);
  const currentOffset = getTimezoneOffset(timezone, date);
  
  const standardOffset = Math.min(janOffset, julOffset);
  return currentOffset !== standardOffset;
}

export function getDstInfo(timezone: string): DSTInfo {
  const region = dstRegions.find(r => r.timezone === timezone);
  
  if (!region || !region.hasDst) {
    return {
      timezone,
      hasDst: false,
      dstStart: null,
      dstEnd: null,
      offsetChange: 0,
    };
  }
  
  const now = new Date();
  const year = now.getFullYear();
  
  const dstStart = getDstTransitionDate(year, region.startMonth, region.startWeek);
  const dstEnd = getDstTransitionDate(year, region.endMonth, region.endWeek);
  
  return {
    timezone,
    hasDst: true,
    dstStart,
    dstEnd,
    offsetChange: region.offsetMinutes,
  };
}

function getDstTransitionDate(year: number, month: number, week: number): Date {
  if (week === -1) {
    const lastDay = new Date(year, month, 0);
    const dayOfWeek = lastDay.getDay();
    const lastSunday = lastDay.getDate() - dayOfWeek;
    return new Date(year, month - 1, lastSunday, 2, 0, 0);
  }
  
  const firstDay = new Date(year, month - 1, 1);
  const firstSunday = 1 + (7 - firstDay.getDay()) % 7;
  const targetSunday = firstSunday + (week - 1) * 7;
  return new Date(year, month - 1, targetSunday, 2, 0, 0);
}

export function getNextDstTransition(timezone: string, date: Date = new Date()): Date | null {
  const info = getDstInfo(timezone);
  
  if (!info.hasDst || !info.dstStart || !info.dstEnd) {
    return null;
  }
  
  if (date < info.dstStart) return info.dstStart;
  if (date < info.dstEnd) return info.dstEnd;
  
  const nextYear = date.getFullYear() + 1;
  const region = dstRegions.find(r => r.timezone === timezone);
  if (!region) return null;
  
  return getDstTransitionDate(nextYear, region.startMonth, region.startWeek);
}
