import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import TextAnimate from './TextAnimate';
import CategoryFilter from './CategoryFilter';
import ProjectSection from './ProjectSection';
import { PROJECTS } from '../data/projects.js';
import { filterProjects } from '../lib/filterProjects.js';

type Project = import('../data/projects.js').Project;

const CATEGORIES = ['Todos', 'Landing Pages', 'Branding', 'UI/UX', 'Campanhas', 'Ilustração'];

export default function AboutProjects() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const visibleProjects: Project[] = filterProjects(PROJECTS, activeCategory);
  const bioRef = useRef<HTMLDivElement>(null);
  const isBioInView = useInView(bioRef, { margin: '-50px' });

  return (
    <section id="sobre" className="bg-black px-6 sm:px-10">
      <div
        ref={bioRef}
        className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-6 py-24 text-center"
      >
        <TextAnimate
          animation="slideUp"
          by="word"
          inView={isBioInView}
          className="w-full text-lg font-medium text-[#E1E0CC] sm:text-xl md:text-2xl"
        >
          Design pra mim nunca foi só sobre fazer bonito, é sobre fazer sentido. Sou designer gráfico e motion
          designer há mais de 6 anos, e ao longo desse tempo passei por redações, employer branding, campanhas
          institucionais e hoje lidero a direção criativa do Kwai, traduzindo estratégia global em conteúdo que
          realmente conversa com o público brasileiro.
        </TextAnimate>
        <TextAnimate
          animation="slideUp"
          by="word"
          inView={isBioInView}
          className="w-full text-lg font-medium text-[#E1E0CC] sm:text-xl md:text-2xl"
        >
          Comecei no Grupo Globo, ainda aprendendo a diferença entre uma peça bonita e uma peça que funciona. De lá
          pra cá, passei pela V.tal e pela Órama Investimentos, sempre no cruzamento entre marca, comunicação e
          conteúdo digital, e hoje boa parte do meu processo criativo já nasce integrado a ferramentas de
          inteligência artificial generativa, não como muleta, mas como extensão da minha criatividade.
        </TextAnimate>
      </div>

      <div id="projetos" className="pb-12">
        <div className="mx-auto mb-16 max-w-4xl px-6">
          <CategoryFilter categories={CATEGORIES} activeCategory={activeCategory} onSelect={setActiveCategory} />
        </div>
        {visibleProjects.map((project, index) => (
          <ProjectSection key={project.id} project={project} index={index} />
        ))}
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
