import { useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';

const SPRING = { damping: 30, stiffness: 100, mass: 2 };

type TiltedCardProps = {
  children: ReactNode;
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
};

export default function TiltedCard({
  children,
  className = '',
  rotateAmplitude = 10,
  scaleOnHover = 1.04,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);
  const scale = useSpring(1, SPRING);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
