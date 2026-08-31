import { useState } from 'react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';
import AnimatedParagraph from './AnimatedParagraph';
import CategoryFilter from './CategoryFilter';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../data/projects.js';
import { filterProjects } from '../lib/filterProjects.js';

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  featured: boolean;
};

const CATEGORIES = ['Todos', 'Landing Pages', 'Branding', 'UI/UX', 'Campanhas', 'Ilustração'];

export default function AboutProjects() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const visibleProjects: Project[] = filterProjects(PROJECTS, activeCategory);

  return (
    <section id="sobre" className="bg-black px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl rounded-2xl bg-[#101010] px-6 py-16 text-center sm:px-12">
        <span className="text-[10px] uppercase tracking-wide text-primary sm:text-xs">Sobre</span>
        <div className="mx-auto mt-4 max-w-3xl text-3xl leading-[0.95] text-[#E1E0CC] sm:text-4xl sm:leading-[0.9] md:text-5xl">
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Publicitário e designer no Rio de Janeiro,', className: 'font-normal' },
              { text: 'criando com paixão', className: 'italic font-serif' },
              { text: 'para marcas como Kwai, Yamaha e TSE.', className: 'font-normal' },
            ]}
          />
        </div>
        <AnimatedParagraph
          text="Publicitário e designer no Rio de Janeiro, atuando na THNCE Comunicação. Cria landing pages, identidade de marca, interfaces para ambientes in-app e campanhas comerciais e institucionais."
          className="mx-auto mt-8 max-w-2xl text-xs text-[#DEDBC8] sm:text-sm md:text-base"
        />
      </div>

      <div id="projetos" className="mx-auto mt-20 max-w-6xl">
        <CategoryFilter categories={CATEGORIES} activeCategory={activeCategory} onSelect={setActiveCategory} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      <footer
        id="contato"
        className="mx-auto mt-24 flex max-w-6xl flex-col items-start justify-between gap-6 text-xs text-gray-400 sm:flex-row sm:items-end sm:text-sm"
      >
        <p className="max-w-xs">
          Raphael Dias é publicitário e designer no Rio de Janeiro, atuando com branding, landing pages e campanhas
          digitais.
        </p>
        <p className="text-right">
          LinkedIn:{' '}
          <a
            href="https://www.linkedin.com/in/lucas-dias-815073147/"
            target="_blank"
            rel="noopener"
            className="text-primary hover:opacity-80"
          >
            lucas-dias-815073147
          </a>{' '}
          · Behance:{' '}
          <a href="https://www.behance.net/lucasdiasb" target="_blank" rel="noopener" className="text-primary hover:opacity-80">
            lucasdiasb
          </a>
        </p>
      </footer>
    </section>
  );
}
