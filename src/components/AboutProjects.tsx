import { useState } from 'react';
import TextReveal from './TextReveal';
import TextAnimate from './TextAnimate';
import CategoryFilter from './CategoryFilter';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../data/projects.js';
import { filterProjects } from '../lib/filterProjects.js';

type Project = import('../data/projects.js').Project;

const CATEGORIES = ['Todos', 'Landing Pages', 'Branding', 'UI/UX', 'Campanhas', 'Ilustração'];

export default function AboutProjects() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const visibleProjects: Project[] = filterProjects(PROJECTS, activeCategory);

  return (
    <section id="sobre" className="bg-black px-6 sm:px-10">
      <div className="pt-16 text-center">
        <TextAnimate animation="slideUp" by="word" className="text-[10px] uppercase tracking-wide text-primary sm:text-xs">
          Sobre mim
        </TextAnimate>
      </div>
      <TextReveal className="text-2xl font-bold text-[#E1E0CC] sm:text-3xl md:text-4xl">
        Publicitário e designer no Rio de Janeiro, atuando na THNCE Comunicação. Cria landing pages, identidade de
        marca, interfaces para ambientes in-app e campanhas comerciais e institucionais para marcas como Kwai, Yamaha
        e TSE.
      </TextReveal>

      <div id="projetos" className="mx-auto max-w-6xl pb-24">
        <CategoryFilter categories={CATEGORIES} activeCategory={activeCategory} onSelect={setActiveCategory} />
        <div className="grid grid-flow-row-dense grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      <footer
        id="contato"
        className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 pb-24 text-xs text-gray-400 sm:flex-row sm:items-end sm:text-sm"
      >
        <p className="max-w-xs">
          Raphael Dias é publicitário e designer no Rio de Janeiro, atuando com branding, landing pages e campanhas
          digitais.
        </p>
        <p className="text-right">
          LinkedIn:{' '}
          <a
            href="https://www.linkedin.com/in/lucasdiasb/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:opacity-80"
          >
            lucasdiasb
          </a>{' '}
          · Behance:{' '}
          <a
            href="https://www.behance.net/lucasdiasb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:opacity-80"
          >
            lucasdiasb
          </a>
        </p>
      </footer>
    </section>
  );
}
