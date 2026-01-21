export interface DateChangeResult {
  hasChanged: boolean;
  daysDiff: number;
  direction: 'same' | 'next' | 'previous';
}

export function detectDateChange(originalDate: Date, convertedDate: Date): DateChangeResult {
  const originalDay = new Date(originalDate.getFullYear(), originalDate.getMonth(), originalDate.getDate());
  const convertedDay = new Date(convertedDate.getFullYear(), convertedDate.getMonth(), convertedDate.getDate());
  
  const diffTime = convertedDay.getTime() - originalDay.getTime();
  const daysDiff = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 0) {
    return { hasChanged: false, daysDiff: 0, direction: 'same' };
  }
  
  return {
    hasChanged: true,
    daysDiff: Math.abs(daysDiff),
    direction: daysDiff > 0 ? 'next' : 'previous',
  };
}

export function formatDateChangeMessage(result: DateChangeResult): string {
  if (!result.hasChanged) return '';
  
  if (result.direction === 'next') {
    return result.daysDiff === 1 ? '(다음 날)' : `(+${result.daysDiff}일)`;
  }
  return result.daysDiff === 1 ? '(전날)' : `(-${result.daysDiff}일)`;
}
