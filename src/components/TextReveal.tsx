import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

type TextRevealProps = {
  children: string;
  className?: string;
};

function RevealWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const x = useTransform(progress, [start, end], ['35vw', '0vw']);
  const skewX = useTransform(progress, [start, end], [-8, 0]);
  return (
    <motion.span style={{ opacity, x, skewX }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

export default function TextReveal({ children, className = '' }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'center center'] });
  const shouldReduceMotion = useReducedMotion();
  const words = children.trim().split(/\s+/);

  if (shouldReduceMotion) {
    return (
      <div ref={containerRef} className="flex h-screen w-full items-center justify-center px-6">
        <p className={`max-w-4xl text-center ${className}`}>{children}</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex h-screen w-full items-center justify-center overflow-x-hidden px-6">
      <p className={`flex max-w-4xl flex-wrap justify-center text-center ${className}`}>
        {words.map((word, i) => (
          <RevealWord key={i} word={word} index={i} total={words.length} progress={scrollYProgress} />
        ))}
      </p>
    </div>
  );
}
