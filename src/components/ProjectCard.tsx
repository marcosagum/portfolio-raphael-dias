import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  featured: boolean;
};

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col justify-between overflow-hidden rounded-lg bg-[#212121] p-4 ${
        project.featured ? 'sm:col-span-2' : ''
      }`}
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded">
        <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
      </div>
      <div className="mt-4">
        <p className="font-sans text-[10px] uppercase tracking-wide text-primary">{project.category}</p>
        <h3 className="mt-1 font-sans text-lg font-bold text-[#E1E0CC]">{project.title}</h3>
        <p className="mt-1 text-sm text-gray-400">{project.description}</p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener"
          className="mt-3 inline-flex items-center gap-2 font-sans text-sm text-primary hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
        >
          Ver no Behance
          <ArrowRight size={16} className="-rotate-45" />
        </a>
      </div>
    </motion.div>
  );
}
