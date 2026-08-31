import { motion, useReducedMotion } from 'framer-motion';

const STAGGER = 0.035;

type TextRollProps = {
  children: string;
  className?: string;
  center?: boolean;
};

function letterClassName(letter: string) {
  return letter === ' ' ? 'inline-block w-[0.3em]' : 'inline-block';
}

export default function TextRoll({ children, className = '', center = false }: TextRollProps) {
  const shouldReduceMotion = useReducedMotion();
  const letters = children.split('');

  if (shouldReduceMotion) {
    return <span className={`relative block ${className}`}>{children}</span>;
  }

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={`relative block cursor-default overflow-hidden ${className}`}
      style={{ lineHeight: 0.85 }}
    >
      <div>
        {letters.map((letter, i) => {
          const delay = center ? STAGGER * Math.abs(i - (letters.length - 1) / 2) : STAGGER * i;
          return (
            <motion.span
              key={i}
              variants={{ initial: { y: 0 }, hovered: { y: '-100%' } }}
              transition={{ ease: 'easeInOut', delay }}
              className={letterClassName(letter)}
            >
              {letter}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {letters.map((letter, i) => {
          const delay = center ? STAGGER * Math.abs(i - (letters.length - 1) / 2) : STAGGER * i;
          return (
            <motion.span
              key={i}
              variants={{ initial: { y: '100%' }, hovered: { y: 0 } }}
              transition={{ ease: 'easeInOut', delay }}
              className={letterClassName(letter)}
            >
              {letter}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
}
