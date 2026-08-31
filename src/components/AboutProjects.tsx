import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Linkedin, Mail, MessageCircle, Palette } from 'lucide-react';
import TextAnimate from './TextAnimate';
import CategoryFilter from './CategoryFilter';
import ProjectSection from './ProjectSection';
import GooeyPillLink from './GooeyPillLink';
import { PROJECTS } from '../data/projects.js';
import { filterProjects } from '../lib/filterProjects.js';

const LINK_CLASSNAME =
  'inline-flex items-center gap-2 font-hn text-sm uppercase tracking-wide text-gray-400 transition-colors duration-200 hover:text-primary sm:text-base';

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
        className="mx-auto flex max-w-2xl flex-col items-center gap-8 px-6 pb-28 pt-8 text-center"
      >
        <p className="font-hn text-xs uppercase tracking-[0.2em] text-gray-500">Contato</p>
        <h2 className="font-hn text-3xl font-bold uppercase leading-tight text-[#E1E0CC] sm:text-4xl md:text-5xl">
          Vamos criar algo juntos?
        </h2>

        <GooeyPillLink
          href="https://wa.me/5521964391698"
          target="_blank"
          rel="noopener noreferrer"
          className="relative px-6 py-3.5 text-sm sm:text-base"
        >
          <MessageCircle size={18} />
          Chamar no WhatsApp
        </GooeyPillLink>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <a href="mailto:Lucas_raphaeld@hotmail.com" className={LINK_CLASSNAME}>
            <Mail size={16} />
            Lucas_raphaeld@hotmail.com
          </a>
          <a href="https://wa.me/5521964391698" target="_blank" rel="noopener noreferrer" className={LINK_CLASSNAME}>
            <MessageCircle size={16} />
            WhatsApp
          </a>
          <a href="https://www.linkedin.com/in/lucasdiasb/" target="_blank" rel="noopener noreferrer" className={LINK_CLASSNAME}>
            <Linkedin size={16} />
            LinkedIn
          </a>
          <a href="https://www.behance.net/lucasdiasb" target="_blank" rel="noopener noreferrer" className={LINK_CLASSNAME}>
            <Palette size={16} />
            Behance
          </a>
        </div>
      </footer>
    </section>
  );
}
