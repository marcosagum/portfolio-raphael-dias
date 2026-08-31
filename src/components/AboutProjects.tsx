import TextAnimate from './TextAnimate';
import ProjectSection from './ProjectSection';
import { PROJECTS } from '../data/projects.js';

export default function AboutProjects() {
  return (
    <section id="sobre" className="bg-black px-6 sm:px-10">
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 py-24 text-center">
        <TextAnimate animation="slideUp" by="word" className="w-full max-w-4xl text-2xl font-bold text-[#E1E0CC] sm:text-3xl md:text-4xl">
          Publicitário e designer no Rio de Janeiro, atuando na THNCE Comunicação. Cria landing pages, identidade de
          marca, interfaces para ambientes in-app e campanhas comerciais e institucionais para marcas como Kwai,
          Yamaha e TSE.
        </TextAnimate>
      </div>

      <div id="projetos" className="pb-12">
        {PROJECTS.map((project, index) => (
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
