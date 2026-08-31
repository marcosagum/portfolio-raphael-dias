import Hero from './components/Hero';
import AboutProjects from './components/AboutProjects';
import SquiCircleFilter from './components/SquiCircleFilter';

export default function App() {
  return (
    <main>
      <SquiCircleFilter />
      <Hero />
      <AboutProjects />
    </main>
  );
}
