// 도시 정보
export interface City {
  id: string;
  name: string;
  country: string;
  timezone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// 시간대 정보
export interface TimezoneInfo {
  id: string;
  name: string;
  abbreviation: string;
  utcOffset: number;
  dstOffset: number;
  isDst: boolean;
  cities: string[];
  country: string;
}

// DST 정보
export interface DSTInfo {
  timezone: string;
  hasDst: boolean;
  dstStart: Date | null;
  dstEnd: Date | null;
  offsetChange: number;
}

// 스톱워치 상태
export interface StopwatchState {
  isRunning: boolean;
  elapsedMs: number;
  laps: number[];
  startTime: number | null;
}

// 타이머 상태
export interface TimerState {
  isRunning: boolean;
  remainingMs: number;
  initialMs: number;
  endTime: number | null;
}

// 카운트다운 이벤트
export interface CountdownEvent {
  id: string;
  name: string;
  targetDate: Date;
  timezone: string;
}

// 사용자 설정
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  timeFormat: '12h' | '24h';
  favoriteCities: string[];
  language: string;
}

// 카운트다운 남은 시간
export interface RemainingTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}
