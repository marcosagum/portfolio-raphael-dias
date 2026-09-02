import Hero from './components/Hero';
import AboutProjects from './components/AboutProjects';
import ClickSpark from './components/ClickSpark';
import FloatingContact from './components/FloatingContact';
import LanguageSwitcher from './components/LanguageSwitcher';
import { LanguageProvider } from './i18n/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <ClickSpark sparkColor="#ffffff" sparkSize={10} sparkRadius={25} sparkCount={8} duration={400}>
        <main>
          <Hero />
          <AboutProjects />
        </main>
        <FloatingContact />
        <LanguageSwitcher />
      </ClickSpark>
    </LanguageProvider>
  );
}
