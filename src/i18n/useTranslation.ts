import { useStore } from '../store';
import { translations } from './translations';
import type { Language } from './translations';

type TranslationKeys = typeof translations.ko;

export function useTranslation(): { t: TranslationKeys; lang: Language; setLang: (lang: Language) => void } {
  const { settings, updateSettings } = useStore();
  const lang = (settings.language as Language) || 'ko';
  const t = translations[lang] as TranslationKeys;

  const setLang = (newLang: Language) => {
    updateSettings({ language: newLang });
  };

  return { t, lang, setLang };
}

// 브라우저 언어 감지
export function detectBrowserLanguage(): Language {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('ko')) return 'ko';
  if (browserLang.startsWith('ja')) return 'ja';
  return 'en';
}
