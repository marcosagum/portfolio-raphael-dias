import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

type Project = import('../data/projects.js').Project;

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();
  const staggerIndex = Math.min(index, 4);

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : staggerIndex * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group flex flex-col overflow-hidden rounded-xl border border-white/5 bg-[#212121] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_40px_-15px_rgba(222,219,200,0.15)] ${
        project.featured ? 'sm:col-span-2' : ''
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {project.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wide text-black">
            Destaque
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="font-sans text-[10px] uppercase tracking-wide text-primary">{project.category}</p>
        <h3 className="mt-1 font-sans text-lg font-bold text-[#E1E0CC]">{project.title}</h3>
        <p className="mt-1 text-sm text-gray-400">{project.description}</p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-fit items-center gap-2 font-sans text-sm text-primary transition-all duration-200 hover:gap-3 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
        >
          Ver no Behance
          <ArrowRight size={16} className="-rotate-45" />
        </a>
      </div>
    </motion.div>
  );
}
