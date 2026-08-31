import Hero from './components/Hero';
import AboutProjects from './components/AboutProjects';
import SquiCircleFilter from './components/SquiCircleFilter';
import ClickSpark from './components/ClickSpark';

export default function App() {
  return (
    <ClickSpark sparkColor="#ffffff" sparkSize={10} sparkRadius={25} sparkCount={8} duration={400}>
      <main>
        <SquiCircleFilter />
        <Hero />
        <AboutProjects />
      </main>
    </ClickSpark>
  );
}
