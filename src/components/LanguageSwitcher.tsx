import type { ReactNode } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/translations';

function FlagBR() {
  return (
    <svg viewBox="0 0 24 16" className="h-full w-full">
      <rect width="24" height="16" fill="#009c3b" />
      <polygon points="12,2 22,8 12,14 2,8" fill="#ffdf00" />
      <circle cx="12" cy="8" r="4" fill="#002776" />
    </svg>
  );
}

function FlagUS() {
  const stripeHeight = 16 / 13;
  return (
    <svg viewBox="0 0 24 16" className="h-full w-full">
      <rect width="24" height="16" fill="#fff" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} y={2 * i * stripeHeight} width="24" height={stripeHeight} fill="#b22234" />
      ))}
      <rect width="10" height={stripeHeight * 7} fill="#3c3b6e" />
    </svg>
  );
}

function FlagES() {
  return (
    <svg viewBox="0 0 24 16" className="h-full w-full">
      <rect width="24" height="16" fill="#aa151b" />
      <rect y="4" width="24" height="8" fill="#f1bf00" />
    </svg>
  );
}

const OPTIONS: { code: Language; flag: ReactNode; label: string }[] = [
  { code: 'pt', flag: <FlagBR />, label: 'Português' },
  { code: 'en', flag: <FlagUS />, label: 'English' },
  { code: 'es', flag: <FlagES />, label: 'Español' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed left-4 top-4 z-50 flex items-center gap-1.5 rounded-full bg-black/50 p-1.5 backdrop-blur-sm sm:left-6 sm:top-6">
      {OPTIONS.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLanguage(option.code)}
          aria-label={option.label}
          aria-pressed={language === option.code}
          className={`h-5 w-7 overflow-hidden rounded-[3px] ring-1 ring-white/30 transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream focus-visible:outline-offset-2 ${
            language === option.code ? 'opacity-100' : 'opacity-50 hover:opacity-80'
          }`}
        >
          {option.flag}
        </button>
      ))}
    </div>
  );
}
