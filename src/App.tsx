import Hero from './components/Hero';
import AboutProjects from './components/AboutProjects';
import ClickSpark from './components/ClickSpark';
import FloatingContact from './components/FloatingContact';

export default function App() {
  return (
    <ClickSpark sparkColor="#ffffff" sparkSize={10} sparkRadius={25} sparkCount={8} duration={400}>
      <main>
        <Hero />
        <AboutProjects />
      </main>
      <FloatingContact />
    </ClickSpark>
  );
}
