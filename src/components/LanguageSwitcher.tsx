'use client';

import { useI18n } from '@/contexts/I18nContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
] as const;

export function LanguageSwitcher({ showLabel = false }: { showLabel?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  const currentLang = languages.find(l => l.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size={showLabel ? "default" : "icon"} 
          className={showLabel ? "gap-2 px-3" : "h-9 w-9"}
        >
          <span className="text-lg leading-none">{currentLang?.flag}</span>
          {showLabel && (
            <span className="text-sm font-medium">
              {currentLang?.flag} {currentLang?.label}
            </span>
          )}
          <span className="sr-only">{t('common.language') || 'Switch language'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </span>
            {locale === lang.code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}