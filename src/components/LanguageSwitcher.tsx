import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/translations';

const OPTIONS: { code: Language; flag: string; label: string }[] = [
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-1 rounded-full bg-black/50 p-1.5 backdrop-blur-sm sm:right-6 sm:top-6">
      {OPTIONS.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLanguage(option.code)}
          aria-label={option.label}
          aria-pressed={language === option.code}
          className={`flex h-7 w-7 items-center justify-center rounded-full text-base leading-none transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream focus-visible:outline-offset-2 ${
            language === option.code ? 'opacity-100' : 'opacity-40 hover:opacity-80'
          }`}
        >
          <span aria-hidden="true">{option.flag}</span>
        </button>
      ))}
    </div>
  );
}
