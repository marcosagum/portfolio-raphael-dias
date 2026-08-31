import { Mail } from 'lucide-react';
import { useGooeyBurst } from '../lib/useGooeyBurst';

export default function FloatingContact() {
  const { ref, burst } = useGooeyBurst<HTMLSpanElement>();

  return (
    <a
      href="#contato"
      onClick={burst}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-cream py-3 pl-4 pr-5 font-hn text-sm font-semibold text-black shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream focus-visible:outline-offset-4 sm:bottom-8 sm:right-8"
    >
      <Mail size={18} className="transition-transform duration-300 group-hover:rotate-6" />
      Contato
      <span ref={ref} className="gooey-particle-layer" aria-hidden="true" />
    </a>
  );
}
