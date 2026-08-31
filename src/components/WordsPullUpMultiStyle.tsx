import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

type Segment = {
  text: string;
  className?: string;
};

type WordsPullUpMultiStyleProps = {
  segments: Segment[];
  className?: string;
};

export default function WordsPullUpMultiStyle({ segments, className = '' }: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();

  let wordIndex = 0;
  const rendered = segments.map((segment, segmentIndex) => {
    const words = segment.text.split(' ');
    return words.map((word, i) => {
      const currentIndex = wordIndex;
      wordIndex += 1;
      return (
        <span key={`${segmentIndex}-${i}`} className="overflow-hidden pb-1 pr-[0.25em]">
          <motion.span
            className={`inline-block ${segment.className || ''}`}
            initial={shouldReduceMotion ? false : { y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : currentIndex * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      );
    });
  });

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {rendered}
    </span>
  );
}
