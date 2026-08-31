import { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { spawnGooeyBurst } from './gooeyBurst';

export function useGooeyBurst<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const shouldReduceMotion = useReducedMotion();

  function burst() {
    if (!shouldReduceMotion && ref.current) {
      spawnGooeyBurst(ref.current);
    }
  }

  return { ref, burst };
}
