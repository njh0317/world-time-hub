import { useState, useEffect, useCallback } from 'react';
import { useStore } from '../store';
import { formatTime, formatDate } from '../utils/format';
import { useTranslation } from '../i18n/useTranslation';

export function OnlineClockPage() {
  const { t } = useTranslation();
  const { settings, updateSettings } = useStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleFormat = () => {
    updateSettings({ timeFormat: settings.timeFormat === '12h' ? '24h' : '12h' });
  };

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center ${isFullscreen ? 'min-h-screen bg-gray-900' : 'min-h-[60vh]'}`}>
      <div className="text-center px-4">
        <div className={`font-mono font-bold text-blue-600 dark:text-blue-400 ${
          isFullscreen ? 'text-6xl sm:text-[8rem] md:text-[12rem]' : 'text-5xl sm:text-6xl md:text-8xl lg:text-9xl'
        }`}>
          {formatTime(currentTime, settings.timeFormat)}
        </div>
        <div className={`text-gray-600 dark:text-gray-400 mt-2 sm:mt-4 ${
          isFullscreen ? 'text-xl sm:text-2xl md:text-4xl' : 'text-base sm:text-xl md:text-2xl'
        }`}>
          {formatDate(currentTime, settings.language)}
        </div>
      </div>

      <div className={`flex gap-2 sm:gap-4 ${isFullscreen ? 'mt-8 sm:mt-12' : 'mt-6 sm:mt-8'}`}>
        <button onClick={toggleFormat} className="btn-secondary text-sm sm:text-base px-3 sm:px-4 py-2">
          {settings.timeFormat === '12h' ? t.clock.format24 : t.clock.format12}
        </button>
        <button onClick={toggleFullscreen} className="btn-primary text-sm sm:text-base px-3 sm:px-4 py-2">
          {isFullscreen ? t.clock.exitFullscreen : t.clock.fullscreen}
        </button>
      </div>
    </div>
  );
}
