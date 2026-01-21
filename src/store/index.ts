import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { City, UserSettings, CountdownEvent, StopwatchState, TimerState } from '../types';
import { cities, defaultCities } from '../data/cities';

interface AppStore {
  // 사용자 설정
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
  
  // 세계 시계
  selectedCities: City[];
  addCity: (city: City) => void;
  removeCity: (cityId: string) => void;
  
  // 카운트다운 이벤트
  countdownEvents: CountdownEvent[];
  addCountdownEvent: (event: CountdownEvent) => void;
  removeCountdownEvent: (eventId: string) => void;
  
  // 스톱워치
  stopwatch: StopwatchState;
  startStopwatch: () => void;
  stopStopwatch: () => void;
  resetStopwatch: () => void;
  addLap: () => void;
  updateStopwatchTime: () => void;
  
  // 타이머
  timer: TimerState;
  setTimerDuration: (ms: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  updateTimerTime: () => void;
}

const getDefaultCities = (): City[] => {
  return cities.filter(c => defaultCities.includes(c.id));
};

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // 사용자 설정
      settings: {
        theme: 'system',
        timeFormat: '24h',
        favoriteCities: defaultCities,
        language: 'ko',
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      
      // 세계 시계
      selectedCities: getDefaultCities(),
      addCity: (city) =>
        set((state) => {
          if (state.selectedCities.find(c => c.id === city.id)) return state;
          return { selectedCities: [...state.selectedCities, city] };
        }),
      removeCity: (cityId) =>
        set((state) => ({
          selectedCities: state.selectedCities.filter(c => c.id !== cityId),
        })),
      
      // 카운트다운 이벤트
      countdownEvents: [],
      addCountdownEvent: (event) =>
        set((state) => ({
          countdownEvents: [...state.countdownEvents, event],
        })),
      removeCountdownEvent: (eventId) =>
        set((state) => ({
          countdownEvents: state.countdownEvents.filter(e => e.id !== eventId),
        })),
      
      // 스톱워치
      stopwatch: {
        isRunning: false,
        elapsedMs: 0,
        laps: [],
        startTime: null,
      },
      startStopwatch: () =>
        set((state) => ({
          stopwatch: {
            ...state.stopwatch,
            isRunning: true,
            startTime: Date.now() - state.stopwatch.elapsedMs,
          },
        })),
      stopStopwatch: () =>
        set((state) => ({
          stopwatch: {
            ...state.stopwatch,
            isRunning: false,
          },
        })),
      resetStopwatch: () =>
        set(() => ({
          stopwatch: {
            isRunning: false,
            elapsedMs: 0,
            laps: [],
            startTime: null,
          },
        })),
      addLap: () =>
        set((state) => ({
          stopwatch: {
            ...state.stopwatch,
            laps: [...state.stopwatch.laps, state.stopwatch.elapsedMs],
          },
        })),
      updateStopwatchTime: () => {
        const state = get();
        if (state.stopwatch.isRunning && state.stopwatch.startTime) {
          set({
            stopwatch: {
              ...state.stopwatch,
              elapsedMs: Date.now() - state.stopwatch.startTime,
            },
          });
        }
      },
      
      // 타이머
      timer: {
        isRunning: false,
        remainingMs: 0,
        initialMs: 0,
        endTime: null,
      },
      setTimerDuration: (ms) =>
        set(() => ({
          timer: {
            isRunning: false,
            remainingMs: ms,
            initialMs: ms,
            endTime: null,
          },
        })),
      startTimer: () =>
        set((state) => ({
          timer: {
            ...state.timer,
            isRunning: true,
            endTime: Date.now() + state.timer.remainingMs,
          },
        })),
      pauseTimer: () =>
        set((state) => ({
          timer: {
            ...state.timer,
            isRunning: false,
            endTime: null,
          },
        })),
      resetTimer: () =>
        set((state) => ({
          timer: {
            ...state.timer,
            isRunning: false,
            remainingMs: state.timer.initialMs,
            endTime: null,
          },
        })),
      updateTimerTime: () => {
        const state = get();
        if (state.timer.isRunning && state.timer.endTime) {
          const remaining = Math.max(0, state.timer.endTime - Date.now());
          set({
            timer: {
              ...state.timer,
              remainingMs: remaining,
              isRunning: remaining > 0,
            },
          });
        }
      },
    }),
    {
      name: 'world-time-hub-storage',
      partialize: (state) => ({
        settings: state.settings,
        selectedCities: state.selectedCities,
        countdownEvents: state.countdownEvents,
      }),
    }
  )
);
