import { Outlet, NavLink } from 'react-router-dom';
import { useStore } from '../store';
import { useEffect, useState } from 'react';
import { useTranslation, detectBrowserLanguage } from '../i18n/useTranslation';
import type { Language } from '../i18n/translations';

const langLabels: Record<Language, string> = {
  ko: '🇰🇷 한국어',
  en: '🇺🇸 English',
  ja: '🇯🇵 日本語',
};

const themeLabels = {
  ko: { light: '라이트', dark: '다크', system: '시스템' },
  en: { light: 'Light', dark: 'Dark', system: 'System' },
  ja: { light: 'ライト', dark: 'ダーク', system: 'システム' },
};

export function Layout() {
  const { settings, updateSettings } = useStore();
  const { t, lang, setLang } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('world-time-hub-storage')) {
      const detectedLang = detectBrowserLanguage();
      updateSettings({ language: detectedLang });
    }
  }, [updateSettings]);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'light') {
      root.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    }
  }, [settings.theme]);

  const navItems = [
    { path: '/', label: t.nav.worldClock, icon: '🌍' },
    { path: '/map', label: t.nav.timezoneMap, icon: '🗺️' },
    { path: '/converter', label: t.nav.converter, icon: '🔄' },
    { path: '/dst', label: t.nav.dst, icon: '☀️' },
    { path: '/timezones', label: t.nav.timezoneList, icon: '📋' },
    { path: '/clock', label: t.nav.clock, icon: '🕐' },
    { path: '/stopwatch', label: t.nav.stopwatch, icon: '⏱️' },
    { path: '/timer', label: t.nav.timer, icon: '⏲️' },
    { path: '/countdown', label: t.nav.countdown, icon: '🎯' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-4 lg:space-x-8">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Menu"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
              <h1 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                <span className="hidden sm:inline">World Time Hub</span>
                <span className="sm:hidden">WTH</span>
              </h1>
              <div className="hidden lg:flex space-x-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="grid grid-cols-3 gap-1 p-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex flex-col items-center p-3 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <span className="text-xl mb-1">{item.icon}</span>
                  <span className="text-center leading-tight">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-8">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © 2026 World Time Hub
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">🌐</span>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value as Language)}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm border-none outline-none cursor-pointer"
                  aria-label="Language"
                >
                  {Object.entries(langLabels).map(([code, label]) => (
                    <option key={code} value={code}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {settings.theme === 'light' ? '☀️' : settings.theme === 'dark' ? '🌙' : '🖥️'}
                </span>
                <select
                  value={settings.theme}
                  onChange={(e) => updateSettings({ theme: e.target.value as 'light' | 'dark' | 'system' })}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm border-none outline-none cursor-pointer"
                  aria-label="Theme"
                >
                  <option value="light">{themeLabels[lang].light}</option>
                  <option value="dark">{themeLabels[lang].dark}</option>
                  <option value="system">{themeLabels[lang].system}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
