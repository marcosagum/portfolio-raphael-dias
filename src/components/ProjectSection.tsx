import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import TextAnimate from './TextAnimate';

type Project = import('../data/projects.js').Project;

type ProjectSectionProps = {
  project: Project;
};

const LINK_CLASSNAME =
  'mt-6 inline-flex items-center gap-2 font-sans text-sm text-primary transition-all duration-200 hover:gap-3 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4';

export default function ProjectSection({ project }: ProjectSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const isFeatured = project.featured;

  return (
    <div
      ref={ref}
      className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-8 px-6 py-20 text-center sm:px-10"
    >
      <p className="font-sans text-[10px] uppercase tracking-wide text-primary sm:text-xs">
        {project.category}
        {isFeatured ? ' · Destaque' : ''}
      </p>
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
        transition={{ duration: isFeatured ? 1 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto aspect-[4/3] w-full overflow-hidden rounded-sm bg-black ${isFeatured ? 'max-w-2xl' : 'max-w-lg'}`}
      >
        <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-contain" />
      </motion.div>
      <h3>
        <TextAnimate
          animation="slideUp"
          by="word"
          className={`font-bold text-[#E1E0CC] ${isFeatured ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-2xl sm:text-3xl md:text-4xl'}`}
        >
          {project.title}
        </TextAnimate>
      </h3>
      <p className={`text-sm text-gray-400 sm:text-base ${isFeatured ? 'max-w-xl' : 'max-w-md'}`}>{project.description}</p>
      <a href={project.link} target="_blank" rel="noopener noreferrer" className={LINK_CLASSNAME}>
        Ver no Behance
        <ArrowRight size={16} className="-rotate-45" />
      </a>
    </div>
  );
}
