import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useGooeyBurst } from '../lib/useGooeyBurst';

type GooeyPillLinkProps = {
  children: ReactNode;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function GooeyPillLink({ children, className = '', onClick, ...props }: GooeyPillLinkProps) {
  const { ref, burst } = useGooeyBurst<HTMLSpanElement>();

  return (
    <a
      onClick={(e) => {
        burst();
        onClick?.(e);
      }}
      className={`group relative inline-flex items-center gap-2 rounded-full bg-cream font-hn font-semibold text-black shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream focus-visible:outline-offset-4 ${className}`}
      {...props}
    >
      {children}
      <span ref={ref} className="gooey-particle-layer" aria-hidden="true" />
    </a>
  );
}
