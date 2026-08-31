import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

type AnimatedParagraphProps = {
  text: string;
  className?: string;
};

function AnimatedLetter({
  char,
  progress,
  index,
  total,
}: {
  char: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const charProgress = index / total;
  const opacity = useTransform(progress, [Math.max(charProgress - 0.1, 0), Math.min(charProgress + 0.05, 1)], [0.2, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

export default function AnimatedParagraph({ text, className = '' }: AnimatedParagraphProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const shouldReduceMotion = useReducedMotion();
  const characters = text.split('');

  if (shouldReduceMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {characters.map((char, index) => (
        <AnimatedLetter key={index} char={char} progress={scrollYProgress} index={index} total={characters.length} />
      ))}
    </p>
  );
}
