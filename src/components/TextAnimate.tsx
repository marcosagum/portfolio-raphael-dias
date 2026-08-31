import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { useRef } from 'react';

type AnimationPreset = 'fadeIn' | 'slideUp' | 'blurIn';
type SplitBy = 'text' | 'word' | 'character' | 'line';

type TextAnimateProps = {
  children: string;
  animation?: AnimationPreset;
  by?: SplitBy;
  className?: string;
  delay?: number;
  once?: boolean;
  inView?: boolean;
};

const ANIMATION_VARIANTS: Record<AnimationPreset, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(8px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
};

function splitText(text: string, by: SplitBy): string[] {
  if (by === 'character') return text.split('');
  if (by === 'line') return text.split('\n');
  if (by === 'text') return [text];
  return text.trim().split(/\s+/);
}

export default function TextAnimate({
  children,
  animation = 'fadeIn',
  by = 'word',
  className = '',
  delay = 0,
  once = false,
  inView,
}: TextAnimateProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const trackedInView = useInView(ref, { once, margin: '-50px' });
  const isInView = inView ?? trackedInView;
  const shouldReduceMotion = useReducedMotion();
  const segments = splitText(children, by);
  const variants = ANIMATION_VARIANTS[animation];
  const staggerGap = by === 'character' ? 0.03 : 0.06;

  if (shouldReduceMotion) {
    return (
      <span ref={ref} className={className}>
        {children}
      </span>
    );
  }

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {segments.map((segment, i) => (
        <motion.span
          key={i}
          className={by === 'character' ? 'inline-block' : by === 'line' ? 'block' : 'mr-[0.25em] inline-block'}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 0.5, delay: delay + i * staggerGap, ease: [0.22, 1, 0.36, 1] }}
        >
          {segment}
        </motion.span>
      ))}
    </span>
  );
}
