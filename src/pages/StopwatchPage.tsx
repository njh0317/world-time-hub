import { useEffect, useState, useCallback, useRef } from 'react';
import { useStore } from '../store';
import { formatElapsedTime } from '../utils/format';
import { useTranslation } from '../i18n/useTranslation';

export function StopwatchPage() {
  const { t } = useTranslation();
  const {
    stopwatch,
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
    addLap,
  } = useStore();
  
  // Local state for display to avoid store updates every frame
  const [displayTime, setDisplayTime] = useState(stopwatch.elapsedMs);
  const startTimeRef = useRef<number | null>(stopwatch.startTime);

  useEffect(() => {
    startTimeRef.current = stopwatch.startTime;
    if (!stopwatch.isRunning) {
      setDisplayTime(stopwatch.elapsedMs);
    }
  }, [stopwatch.startTime, stopwatch.isRunning, stopwatch.elapsedMs]);

  useEffect(() => {
    let intervalId: number;
    if (stopwatch.isRunning && startTimeRef.current) {
      intervalId = window.setInterval(() => {
        if (startTimeRef.current) {
          setDisplayTime(Date.now() - startTimeRef.current);
        }
      }, 10); // Update every 10ms for smooth display
    }
    return () => clearInterval(intervalId);
  }, [stopwatch.isRunning]);

  const handleStop = useCallback(() => {
    // Sync display time to store when stopping
    if (startTimeRef.current) {
      const finalTime = Date.now() - startTimeRef.current;
      setDisplayTime(finalTime);
    }
    stopStopwatch();
  }, [stopStopwatch]);

  const handleAddLap = useCallback(() => {
    // Update store time before adding lap
    if (startTimeRef.current) {
      useStore.setState((state) => ({
        stopwatch: {
          ...state.stopwatch,
          elapsedMs: Date.now() - startTimeRef.current!,
        },
      }));
    }
    addLap();
  }, [addLap]);

  const getLapTime = (index: number): number => {
    if (index === 0) return stopwatch.laps[0];
    return stopwatch.laps[index] - stopwatch.laps[index - 1];
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
        {t.stopwatch.title}
      </h2>

      <div className="card text-center mb-4 sm:mb-6 p-4 sm:p-6">
        <div className="text-4xl sm:text-6xl md:text-7xl font-mono font-bold text-blue-600 dark:text-blue-400 py-4 sm:py-8">
          {formatElapsedTime(displayTime)}
        </div>

        <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
          {!stopwatch.isRunning ? (
            <button onClick={startStopwatch} className="btn-primary px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg">
              {displayTime > 0 ? t.common.continue : t.common.start}
            </button>
          ) : (
            <button onClick={handleStop} className="btn-secondary px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg">
              {t.common.stop}
            </button>
          )}
          {stopwatch.isRunning && (
            <button onClick={handleAddLap} className="btn-secondary px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg">
              {t.common.lap}
            </button>
          )}
          {!stopwatch.isRunning && displayTime > 0 && (
            <button onClick={resetStopwatch} className="btn-secondary px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg">
              {t.common.reset}
            </button>
          )}
        </div>
      </div>

      {stopwatch.laps.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t.stopwatch.lapRecords}
          </h3>
          <div className="space-y-2 max-h-64 overflow-auto">
            {[...stopwatch.laps].reverse().map((lap, reverseIndex) => {
              const index = stopwatch.laps.length - 1 - reverseIndex;
              return (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <span className="text-gray-600 dark:text-gray-400">
                    {t.common.lap} {index + 1}
                  </span>
                  <div className="text-right">
                    <span className="font-mono text-lg text-gray-900 dark:text-white">
                      {formatElapsedTime(lap)}
                    </span>
                    <span className="font-mono text-sm text-gray-500 dark:text-gray-400 ml-4">
                      +{formatElapsedTime(getLapTime(index))}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
