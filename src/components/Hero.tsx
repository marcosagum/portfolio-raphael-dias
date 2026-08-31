import TextRoll from './TextRoll';

const NAV_LINKS = [
  { label: 'Trabalhos', href: '#projetos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lucas-dias-815073147/' },
  { label: 'Behance', href: 'https://www.behance.net/lucasdiasb' },
];

const FOCUS_RING = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream focus-visible:outline-offset-4';

export default function Hero() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black">
      <div className="anim-fade-in absolute inset-0 h-full w-full bg-black" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-6 text-center">
        <h1 className="anim-fade-up font-hn text-cream" style={{ animationDelay: '500ms' }}>
          <TextRoll center className="text-[12vw] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] sm:text-[9vw] lg:text-[7vw]">
            Raphael Dias
          </TextRoll>
        </h1>
        <p className="anim-fade-up font-hn text-cream/60" style={{ animationDelay: '700ms' }}>
          <TextRoll center className="text-[6vw] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] sm:text-[3.5vw] lg:text-[2.5vw]">
            Art
          </TextRoll>
        </p>
        <p className="anim-fade-up font-hn text-cream/60" style={{ animationDelay: '850ms' }}>
          <TextRoll center className="text-[6vw] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] sm:text-[3.5vw] lg:text-[2.5vw]">
            Portfolio
          </TextRoll>
        </p>
      </div>

      <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8">
        <a
          href="#top"
          className={`anim-fade-up font-hn text-lg tracking-wide text-cream ${FOCUS_RING}`}
          style={{ animationDelay: '800ms' }}
        >
          Raphael Dias
        </a>
        <div
          className="anim-fade-up flex flex-col items-end gap-3 sm:flex-row sm:items-start sm:gap-16 lg:gap-24"
          style={{ animationDelay: '900ms' }}
        >
          <span className="hidden font-hn text-sm text-cream sm:inline">2026</span>
          <nav className="flex flex-col gap-0.5 font-hn text-sm text-cream">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={`anim-fade-up transition-opacity duration-300 hover:opacity-60 ${FOCUS_RING}`}
                style={{ animationDelay: `${1000 + i * 80}ms` }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-0.5 font-hn text-sm text-cream">
            {SOCIAL_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`anim-fade-up transition-opacity duration-300 hover:opacity-60 ${FOCUS_RING}`}
                style={{ animationDelay: `${1150 + i * 80}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <div
        className="anim-line absolute inset-x-6 bottom-[5.5rem] z-10 h-0.5 bg-cream sm:inset-x-10 sm:bottom-28"
        style={{ animationDelay: '1200ms' }}
      />

      <footer className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-6 pb-5 font-hn text-xs leading-relaxed text-cream sm:px-10 sm:pb-8 sm:text-sm">
        <div className="anim-fade-up" style={{ animationDelay: '1400ms' }}>
          <p>Publicitário</p>
          <p>Designer</p>
          <p>Rio de Janeiro</p>
        </div>
        <div className="anim-fade-up text-right" style={{ animationDelay: '1550ms' }}>
          <p>Publicidade e design</p>
          <p>assinados por Raphael Dias</p>
        </div>
      </footer>
    </section>
  );
}
