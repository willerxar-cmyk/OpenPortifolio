'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Locale, Translations } from '@/types';
import en from '@/data/locales/en.json';
import pt from '@/data/locales/pt.json';
import es from '@/data/locales/es.json';

const translations: Record<Locale, Translations> = { en, pt, es };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_locale', newLocale);
      document.documentElement.lang = newLocale;
    }
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}