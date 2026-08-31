import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import TextAnimate from './TextAnimate';

type Project = import('../data/projects.js').Project;

type ProjectSectionProps = {
  project: Project;
  index: number;
};

const LINK_CLASSNAME =
  'mt-6 inline-flex items-center gap-2 font-sans text-sm text-primary transition-all duration-200 hover:gap-3 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4';

export default function ProjectSection({ project, index }: ProjectSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const number = String(index + 1).padStart(2, '0');

  if (project.featured) {
    return (
      <div
        ref={ref}
        className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-8 px-6 py-20 text-center sm:px-10"
      >
        <p className="font-sans text-[10px] uppercase tracking-wide text-primary sm:text-xs">{project.category} · Destaque</p>
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="aspect-[16/9] w-full overflow-hidden rounded-sm"
        >
          <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover" />
        </motion.div>
        <h3>
          <TextAnimate animation="slideUp" by="word" className="text-3xl font-bold text-[#E1E0CC] sm:text-4xl md:text-5xl">
            {project.title}
          </TextAnimate>
        </h3>
        <p className="max-w-xl text-sm text-gray-400 sm:text-base">{project.description}</p>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className={LINK_CLASSNAME}>
          Ver no Behance
          <ArrowRight size={16} className="-rotate-45" />
        </a>
      </div>
    );
  }

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-10 px-6 py-20 sm:px-10 md:gap-16 lg:flex-row ${
        isEven ? '' : 'lg:flex-row-reverse'
      }`}
    >
      <div className="relative w-full lg:w-3/5">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-2 -top-10 select-none font-hn text-[6rem] font-extrabold leading-none text-white/5 sm:-top-16 sm:text-[10rem]"
        >
          {number}
        </span>
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-sm"
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
      </div>

      <div className="w-full text-center lg:w-2/5 lg:text-left">
        <p className="font-sans text-[10px] uppercase tracking-wide text-primary sm:text-xs">{project.category}</p>
        <h3 className="mt-3">
          <TextAnimate animation="slideUp" by="word" className="text-2xl font-bold text-[#E1E0CC] sm:text-3xl md:text-4xl">
            {project.title}
          </TextAnimate>
        </h3>
        <p className="mt-4 text-sm text-gray-400 sm:text-base">{project.description}</p>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className={LINK_CLASSNAME}>
          Ver no Behance
          <ArrowRight size={16} className="-rotate-45" />
        </a>
      </div>
    </div>
  );
}
