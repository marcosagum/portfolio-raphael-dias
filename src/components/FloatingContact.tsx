import { Mail } from 'lucide-react';
import GooeyPillLink from './GooeyPillLink';
import { useLanguage } from '../i18n/LanguageContext';
import { UI_TEXT } from '../i18n/translations';

export default function FloatingContact() {
  const { language } = useLanguage();

  return (
    <GooeyPillLink
      href="#contato"
      className="fixed bottom-6 right-6 z-50 py-3 pl-4 pr-5 text-sm sm:bottom-8 sm:right-8"
    >
      <Mail size={18} className="transition-transform duration-300 group-hover:rotate-6" />
      {UI_TEXT[language].contato}
    </GooeyPillLink>
  );
}
