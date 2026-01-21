import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';
import { TimeInput, PresetButtons } from '../components/TimeInput';
import { formatRemainingTime, parseTimeInput } from '../utils/format';
import { useTranslation } from '../i18n/useTranslation';

export function TimerPage() {
  const { t } = useTranslation();
  const { timer, setTimerDuration, startTimer, pauseTimer, resetTimer, updateTimerTime } = useStore();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let animationId: number;
    const update = () => {
      updateTimerTime();
      animationId = requestAnimationFrame(update);
    };
    if (timer.isRunning) {
      animationId = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(animationId);
  }, [timer.isRunning, updateTimerTime]);

  useEffect(() => {
    if (timer.initialMs > 0 && timer.remainingMs === 0 && !timer.isRunning) {
      setShowAlert(true);
      audioRef.current?.play().catch(() => {});
    }
  }, [timer.remainingMs, timer.isRunning, timer.initialMs]);

  const handleStart = () => {
    if (timer.remainingMs === 0) {
      const ms = parseTimeInput(hours, minutes, seconds);
      if (ms > 0) {
        setTimerDuration(ms);
        setTimeout(() => startTimer(), 0);
      }
    } else {
      startTimer();
    }
    setShowAlert(false);
  };

  const handlePreset = (ms: number) => {
    setTimerDuration(ms);
    const totalSeconds = ms / 1000;
    setHours(Math.floor(totalSeconds / 3600));
    setMinutes(Math.floor((totalSeconds % 3600) / 60));
    setSeconds(Math.floor(totalSeconds % 60));
  };

  const handleReset = () => {
    resetTimer();
    setShowAlert(false);
  };

  const handleClear = () => {
    setTimerDuration(0);
    setHours(0);
    setMinutes(5);
    setSeconds(0);
    setShowAlert(false);
  };

  const isIdle = timer.remainingMs === 0 && timer.initialMs === 0;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">{t.timer.title}</h2>
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQkAHIveli8AAAA=" />
      {showAlert && (
        <div className="card bg-green-100 dark:bg-green-900 border-green-500 mb-6 text-center">
          <p className="text-xl font-bold text-green-700 dark:text-green-300">{t.timer.complete}</p>
          <button onClick={() => setShowAlert(false)} className="btn-primary mt-4">{t.common.confirm}</button>
        </div>
      )}
      <div className="card text-center mb-4 sm:mb-6 p-4 sm:p-6">
        {isIdle ? (
          <div className="py-4 sm:py-8">
            <TimeInput hours={hours} minutes={minutes} seconds={seconds} onChange={(h, m, s) => { setHours(h); setMinutes(m); setSeconds(s); }} />
            <div className="mt-4 sm:mt-6"><PresetButtons onSelect={handlePreset} /></div>
          </div>
        ) : (
          <div className="text-4xl sm:text-6xl md:text-7xl font-mono font-bold text-blue-600 dark:text-blue-400 py-4 sm:py-8">{formatRemainingTime(timer.remainingMs)}</div>
        )}
        <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
          {!timer.isRunning ? (
            <button onClick={handleStart} className="btn-primary px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg">{timer.remainingMs > 0 ? t.common.continue : t.common.start}</button>
          ) : (
            <button onClick={pauseTimer} className="btn-secondary px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg">{t.common.pause}</button>
          )}
          {(timer.remainingMs > 0 || timer.initialMs > 0) && !timer.isRunning && (
            <>
              <button onClick={handleReset} className="btn-secondary px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg">{t.common.reset}</button>
              <button onClick={handleClear} className="btn-secondary px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg text-red-500">{t.common.newSetting}</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
