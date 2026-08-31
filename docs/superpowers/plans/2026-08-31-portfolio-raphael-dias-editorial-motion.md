# Portfólio Raphael Dias — Editorial Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the static HTML/CSS/JS portfolio to a Vite + React + TypeScript + Tailwind + framer-motion app with an editorial black/cream design — a full-viewport hero with a giant scrolling name and a project-art overlay, followed by a Sobre + Projetos section with word-by-word and scroll-linked text reveals.

**Architecture:** A standard Vite React SPA. Pure data/logic (the 12 real projects and the category-filter function) live in plain `.js` ES modules with zero framework dependency, so they stay testable with Node's built-in test runner exactly as before (`node --test`) — no test framework, no jsdom, no ts-node. Everything React/animation-related is TypeScript (`.tsx`). Hero's entrance choreography is plain CSS `@keyframes` (matching how the reference concept was originally built); the Sobre/Projetos section's word-reveal, scroll-linked letter reveal, and card entrances use framer-motion. No literal third-party assets (photos, videos, or the unlicensed webfont) from the two reference designs are used — only the layout/animation concepts, with Raphael Dias's own real content and legitimately licensed fonts (Google Fonts Almarai/Instrument Serif, and the system Helvetica Neue/Helvetica/Arial stack for the hero).

**Tech Stack:** Vite 5, React 18, TypeScript 5, Tailwind CSS 3, framer-motion, lucide-react, Node's built-in test runner.

## Global Constraints

- Paleta: `cream` `#efeee9` (texto sobre o Hero), `primary` `#DEDBC8` (creme quente, seção Sobre/Projetos), texto inline `#E1E0CC` (nuance de creme usada em títulos/parágrafo), fundos `#000000` (global), `#101010` (cartão Sobre), `#212121` (cards de projeto). Sem violeta, sem gradiente decorativo, sem glow.
- Tipografia: Hero usa a stack de sistema `"Helvetica Neue", Helvetica, Arial, sans-serif` (token Tailwind `font-hn`). Seção Sobre/Projetos usa Almarai (pesos 300/400/700/800) como padrão e Instrument Serif itálico como destaque pontual — ambas via Google Fonts.
- Categorias de filtro fixas (inalteradas): `Todos`, `Landing Pages`, `Branding`, `UI/UX`, `Campanhas`, `Ilustração`.
- Os 12 projetos reais (conteúdo) não mudam — apenas o caminho da imagem muda de `assets/projects/*.png` para `/projects/*.png` (Vite serve `public/` na raiz).
- Exatamente 2 projetos têm `featured: true`: `tse-tudo-sobre-eleicoes` e `kwai-spiderman`.
- Nenhum asset de terceiros (foto de pessoa real, vídeo de outro site, fonte pirateada) é usado — a imagem do Hero é a arte de capa real do projeto `kwai-spiderman.png`.
- Sem framework de teste de componente (Vitest/RTL) neste plano — só `node --test` sobre os módulos de dados/lógica puros.
- `prefers-reduced-motion: reduce` é respeitado tanto nas animações CSS do Hero quanto no framer-motion da seção Sobre/Projetos.

---

### Task 1: Scaffold Vite + React + TypeScript + Tailwind, tema completo, remoção do site estático antigo

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`
- Create: `index.html` (raiz, entry point do Vite — substitui o antigo)
- Create: `src/main.tsx`, `src/App.tsx`, `src/index.css`
- Modify: `.gitignore` (já existe, não rastreado — adicionar `node_modules` e `dist`, mantendo `.vercel`)
- Delete: `css/` (diretório inteiro), `js/` (diretório inteiro), `tests/data.test.js`, `tests/filter.test.js`, `tests/render.test.js`, `tests/particles.test.js`
- Move: `assets/projects/*.png` (12 arquivos) → `public/projects/*.png`, depois remover o diretório `assets/` vazio

**Interfaces:**
- Produces: `--color-cream`/`--color-primary` via Tailwind (`cream`, `primary`), `font-hn`/`font-sans`/`font-serif` Tailwind font families, classes CSS `.marquee`, `.anim-fade-in`, `.anim-rise-in`, `.anim-fade-up`, `.anim-line` (usadas pela Task 4), e a estrutura de diretórios `src/data/`, `src/lib/`, `src/components/` que as Tasks 2–5 preenchem.

- [ ] **Step 1: Mover as imagens dos projetos**

```bash
mkdir -p public/projects
git mv assets/projects/isso-nao-e-uma-festa.png public/projects/isso-nao-e-uma-festa.png
git mv assets/projects/kwai-adorocinema-filme-premiado.png public/projects/kwai-adorocinema-filme-premiado.png
git mv assets/projects/kwai-casa-do-kwai-branding.png public/projects/kwai-casa-do-kwai-branding.png
git mv assets/projects/kwai-eleicoes-2026.png public/projects/kwai-eleicoes-2026.png
git mv assets/projects/kwai-in-app-activities.png public/projects/kwai-in-app-activities.png
git mv assets/projects/kwai-spiderman.png public/projects/kwai-spiderman.png
git mv assets/projects/kwai-tse-titulo-em-dia.png public/projects/kwai-tse-titulo-em-dia.png
git mv assets/projects/kwai-zico-landing-page.png public/projects/kwai-zico-landing-page.png
git mv assets/projects/salve-guanabara.png public/projects/salve-guanabara.png
git mv assets/projects/tse-tudo-sobre-eleicoes.png public/projects/tse-tudo-sobre-eleicoes.png
git mv assets/projects/wc2026-nao-transmissao.png public/projects/wc2026-nao-transmissao.png
git mv assets/projects/yamaha-black-friday.png public/projects/yamaha-black-friday.png
```

(`assets/` should now be empty — if `git mv` leaves an empty `assets/projects/` directory behind, that's expected; git doesn't track empty directories, so no further action is needed.)

- [ ] **Step 2: Delete the old static site files**

```bash
git rm -r css js tests/data.test.js tests/filter.test.js tests/render.test.js tests/particles.test.js
```

- [ ] **Step 3: Write `package.json`**

```json
{
  "name": "portfolio-raphael-dias",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "test": "node --test tests/"
  },
  "dependencies": {
    "framer-motion": "^11.11.17",
    "lucide-react": "^0.462.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "typescript": "^5.6.3",
    "vite": "^5.4.11"
  }
}
```

- [ ] **Step 4: Write `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

- [ ] **Step 5: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "allowJs": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

- [ ] **Step 6: Write `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#efeee9',
        primary: '#DEDBC8',
      },
      fontFamily: {
        hn: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['Almarai', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 7: Write `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 8: Write `src/index.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Instrument+Serif:ital@1&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  margin: 0;
  padding: 0;
  background: #000000;
  font-family: 'Almarai', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.marquee {
  animation: marquee 30s linear infinite;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.anim-fade-in {
  animation: fade-in 1.2s ease-out both;
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(4vh) scale(1.03);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.anim-rise-in {
  animation: rise-in 1.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.anim-fade-up {
  animation: fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes line-grow {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.anim-line {
  animation: line-grow 1.1s cubic-bezier(0.76, 0, 0.24, 1) both;
  transform-origin: left;
}

@media (prefers-reduced-motion: reduce) {
  .marquee,
  .anim-fade-in,
  .anim-rise-in,
  .anim-fade-up,
  .anim-line {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
  }
}
```

- [ ] **Step 9: Write `index.html`** (Vite entry point, at the project root)

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Raphael Dias — Publicitário &amp; Designer</title>
    <meta name="description" content="Portfólio de Raphael Dias, publicitário e designer no Rio de Janeiro (THNCE Comunicação), com landing pages, identidade de marca, UI/UX e campanhas para marcas como Kwai, Yamaha e TSE." />
    <meta property="og:title" content="Raphael Dias — Publicitário &amp; Designer" />
    <meta property="og:description" content="Portfólio de Raphael Dias, publicitário e designer no Rio de Janeiro (THNCE Comunicação), com landing pages, identidade de marca, UI/UX e campanhas para marcas como Kwai, Yamaha e TSE." />
    <meta property="og:type" content="website" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='black'/%3E%3Ctext x='32' y='44' font-family='Arial, sans-serif' font-size='24' font-weight='bold' fill='%23efeee9' text-anchor='middle'%3ERD%3C/text%3E%3C/svg%3E" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 10: Write `src/main.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 11: Write `src/App.tsx`** (placeholder — Task 5 replaces this with the real composition)

```tsx
export default function App() {
  return (
    <main className="bg-black text-cream">
      <p className="p-8">Portfólio Raphael Dias — em construção.</p>
    </main>
  );
}
```

- [ ] **Step 12: Update `.gitignore`**

Replace its contents with:

```
node_modules
dist
.vercel
```

- [ ] **Step 13: Install dependencies and verify the toolchain**

```bash
npm install
npm run build
```

Expected: `npm install` completes without error; `npm run build` produces a `dist/` directory with no TypeScript or build errors (the placeholder `App.tsx` is enough to build successfully).

- [ ] **Step 14: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React + TypeScript + Tailwind, remove static site"
```

---

### Task 2: Port project data and filter logic (TDD)

**Files:**
- Create: `src/data/projects.js`
- Create: `src/lib/filterProjects.js`
- Test: `tests/projects.test.js`
- Test: `tests/filterProjects.test.js`

**Interfaces:**
- Produces: `export const PROJECTS` (array of `{ id, title, description, category, image, link, featured }`, `image` paths starting with `/projects/`) from `src/data/projects.js`; `export function filterProjects(projects, category)` from `src/lib/filterProjects.js` — both consumed by Task 5's `AboutProjects.tsx`.

- [ ] **Step 1: Write the failing tests**

Create `tests/projects.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS } from '../src/data/projects.js';

const VALID_CATEGORIES = ['Landing Pages', 'Branding', 'UI/UX', 'Campanhas', 'Ilustração'];

test('exactly 2 projects are marked featured', () => {
  const featured = PROJECTS.filter((project) => project.featured === true);
  assert.equal(featured.length, 2);
});

test('every project category is one of the fixed categories, never "Todos"', () => {
  PROJECTS.forEach((project) => {
    assert.notEqual(project.category, 'Todos');
    assert.ok(VALID_CATEGORIES.includes(project.category), 'unexpected category: ' + project.category);
  });
});

test('every project id is unique', () => {
  const ids = PROJECTS.map((project) => project.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('every project has a non-empty Behance gallery link', () => {
  PROJECTS.forEach((project) => {
    assert.ok(typeof project.link === 'string' && project.link.length > 0);
    assert.ok(project.link.startsWith('https://www.behance.net/'), 'unexpected link: ' + project.link);
  });
});

test('every project image path is served from /projects/', () => {
  PROJECTS.forEach((project) => {
    assert.ok(project.image.startsWith('/projects/'), 'unexpected image path: ' + project.image);
  });
});
```

Create `tests/filterProjects.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProjects } from '../src/lib/filterProjects.js';

test('returns all projects when category is "Todos"', () => {
  const projects = [{ id: 1, category: 'Branding' }, { id: 2, category: 'UI/UX' }];
  assert.deepEqual(filterProjects(projects, 'Todos'), projects);
});

test('returns all projects when category is falsy', () => {
  const projects = [{ id: 1, category: 'Branding' }];
  assert.deepEqual(filterProjects(projects, null), projects);
});

test('filters projects matching the given category', () => {
  const projects = [
    { id: 1, category: 'Branding' },
    { id: 2, category: 'UI/UX' },
    { id: 3, category: 'Branding' },
  ];
  assert.deepEqual(filterProjects(projects, 'Branding'), [
    { id: 1, category: 'Branding' },
    { id: 3, category: 'Branding' },
  ]);
});

test('returns empty array when no project matches category', () => {
  const projects = [{ id: 1, category: 'Branding' }];
  assert.deepEqual(filterProjects(projects, 'Ilustração'), []);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module '../src/data/projects.js'` and `Cannot find module '../src/lib/filterProjects.js'`

- [ ] **Step 3: Write `src/data/projects.js`**

```js
export const PROJECTS = [
  {
    id: 'wc2026-nao-transmissao',
    title: 'Copa do Mundo 2026 — A Não Transmissão Oficial',
    description: 'Conteúdo de social media e assets in-app para uma campanha ligada à Copa do Mundo 2026.',
    category: 'Campanhas',
    image: '/projects/wc2026-nao-transmissao.png',
    link: 'https://www.behance.net/gallery/254376499/WC-2026-A-NAO-TRANSMISSAO-OFICIAL',
    featured: false,
  },
  {
    id: 'tse-tudo-sobre-eleicoes',
    title: 'TSE — Tudo Sobre as Eleições',
    description: 'Conteúdo educativo em campanha sobre o processo eleitoral para o TSE.',
    category: 'Campanhas',
    image: '/projects/tse-tudo-sobre-eleicoes.png',
    link: 'https://www.behance.net/gallery/254376415/TUDO-SOBRE-AS-ELEICOES-TSE',
    featured: true,
  },
  {
    id: 'kwai-eleicoes-2026',
    title: 'Kwai — Eleições 2026',
    description: 'Campanha sobre as Eleições 2026 dentro do aplicativo Kwai.',
    category: 'Campanhas',
    image: '/projects/kwai-eleicoes-2026.png',
    link: 'https://www.behance.net/gallery/254376261/ELEICOES-2026-KWAI',
    featured: false,
  },
  {
    id: 'kwai-spiderman',
    title: 'Kwai — Spider-Man: Brand New Day',
    description: 'Banners in-app para campanha promocional do filme Homem-Aranha em parceria com o Kwai.',
    category: 'Campanhas',
    image: '/projects/kwai-spiderman.png',
    link: 'https://www.behance.net/gallery/254375817/SPIDER-MAN-BRAND-NEW-DAY-X-KWAI',
    featured: true,
  },
  {
    id: 'kwai-in-app-activities',
    title: 'Kwai — Atividades In-App',
    description: 'Design gráfico e identidade visual para atividades dentro do aplicativo Kwai.',
    category: 'UI/UX',
    image: '/projects/kwai-in-app-activities.png',
    link: 'https://www.behance.net/gallery/249837793/IN-APP-ACTIVITIES-KWAI',
    featured: false,
  },
  {
    id: 'kwai-casa-do-kwai-branding',
    title: 'Kwai — Casa do Kwai (Branding de Reality Show)',
    description: 'Branding e identidade visual para o reality show Casa do Kwai.',
    category: 'Branding',
    image: '/projects/kwai-casa-do-kwai-branding.png',
    link: 'https://www.behance.net/gallery/249837553/CASA-DO-KWAI-REALITY-SHOW-BRANDING',
    featured: false,
  },
  {
    id: 'kwai-zico-landing-page',
    title: 'Kwai × Downtown Filmes — Zico (Landing Page)',
    description: 'Landing page de campanha para o documentário Zico, parceria Kwai e Downtown Filmes.',
    category: 'Landing Pages',
    image: '/projects/kwai-zico-landing-page.png',
    link: 'https://www.behance.net/gallery/249836529/ZICO-LANDING-PAGE-KWAI-X-DOWNTOWN-FILMES',
    featured: false,
  },
  {
    id: 'kwai-tse-titulo-em-dia',
    title: 'Kwai × TSE — Título em Dia (Landing Page)',
    description: 'Landing page da campanha Título em Dia, parceria entre Kwai e TSE.',
    category: 'Landing Pages',
    image: '/projects/kwai-tse-titulo-em-dia.png',
    link: 'https://www.behance.net/gallery/249836269/LANDING-PAGE-TITULO-EM-DIA-KWAI-X-TSE',
    featured: false,
  },
  {
    id: 'kwai-adorocinema-filme-premiado',
    title: 'Kwai × AdoroCinema — Filme Premiado',
    description: 'Campanha Filme Premiado com branding e posts para redes sociais, parceria Kwai e AdoroCinema.',
    category: 'Campanhas',
    image: '/projects/kwai-adorocinema-filme-premiado.png',
    link: 'https://www.behance.net/gallery/249836041/FILME-PREMIADO-KWAI-x-ADOROCINEMA',
    featured: false,
  },
  {
    id: 'salve-guanabara',
    title: 'Salve Guanabara',
    description: 'Identidade visual ilustrada do projeto Salve Guanabara.',
    category: 'Ilustração',
    image: '/projects/salve-guanabara.png',
    link: 'https://www.behance.net/gallery/239198943/Salve-Guanabara',
    featured: false,
  },
  {
    id: 'yamaha-black-friday',
    title: 'Yamaha — Black Friday',
    description: 'Campanha de Black Friday para a Yamaha, com motion design e peças para redes sociais.',
    category: 'Campanhas',
    image: '/projects/yamaha-black-friday.png',
    link: 'https://www.behance.net/gallery/238898687/BLACK-FRIDAY-YAMAHA',
    featured: false,
  },
  {
    id: 'isso-nao-e-uma-festa',
    title: 'Isso Não É Uma Festa',
    description: 'Peça de design para social media com conceito autoral.',
    category: 'Ilustração',
    image: '/projects/isso-nao-e-uma-festa.png',
    link: 'https://www.behance.net/gallery/237261799/ISSO-NAO-E-UMA-FESTA',
    featured: false,
  },
];
```

- [ ] **Step 4: Write `src/lib/filterProjects.js`**

```js
export function filterProjects(projects, category) {
  if (!category || category === 'Todos') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (9 tests — 5 in `projects.test.js`, 4 in `filterProjects.test.js`)

- [ ] **Step 6: Commit**

```bash
git add src/data/projects.js src/lib/filterProjects.js tests/projects.test.js tests/filterProjects.test.js
git commit -m "feat: port project data and category filter to ES modules"
```

---

### Task 3: Shared animation components (WordsPullUp, WordsPullUpMultiStyle, AnimatedParagraph)

**Files:**
- Create: `src/components/WordsPullUp.tsx`
- Create: `src/components/WordsPullUpMultiStyle.tsx`
- Create: `src/components/AnimatedParagraph.tsx`

**Interfaces:**
- Produces: `export default function WordsPullUp({ text, className? }: { text: string; className?: string })`, `export default function WordsPullUpMultiStyle({ segments, className? }: { segments: { text: string; className?: string }[]; className?: string })`, `export default function AnimatedParagraph({ text, className? }: { text: string; className?: string })` — all consumed by Task 5's `AboutProjects.tsx`. None of these read from `PROJECTS` or any other module — they only take text/segments as props.

- [ ] **Step 1: Write `src/components/WordsPullUp.tsx`**

```tsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type WordsPullUpProps = {
  text: string;
  className?: string;
};

export default function WordsPullUp({ text, className = '' }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden pb-1 pr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
```

- [ ] **Step 2: Write `src/components/WordsPullUpMultiStyle.tsx`**

```tsx
import { motion, useInView } from 'framer-motion';
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
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: currentIndex * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
```

- [ ] **Step 3: Write `src/components/AnimatedParagraph.tsx`**

```tsx
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
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
  const characters = text.split('');

  return (
    <p ref={ref} className={className}>
      {characters.map((char, index) => (
        <AnimatedLetter key={index} char={char} progress={scrollYProgress} index={index} total={characters.length} />
      ))}
    </p>
  );
}
```

- [ ] **Step 4: Verify the build**

Run: `npm run typecheck && npm run build`
Expected: both succeed with no TypeScript errors (these components aren't imported anywhere yet, but they must compile standalone — check that `framer-motion`'s `useInView`, `useScroll`, `useTransform`, and the `MotionValue` type all resolve, confirming the dependency installed correctly in Task 1).

- [ ] **Step 5: Commit**

```bash
git add src/components/WordsPullUp.tsx src/components/WordsPullUpMultiStyle.tsx src/components/AnimatedParagraph.tsx
git commit -m "feat: add shared word-reveal and scroll-linked text animation components"
```

---

### Task 4: Hero section

**Files:**
- Create: `src/components/Marquee.tsx`
- Create: `src/components/Hero.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: CSS classes `.marquee`, `.anim-fade-up`, `.anim-rise-in`, `.anim-fade-in`, `.anim-line` and Tailwind tokens `cream`, `font-hn` (from Task 1).
- Produces: `export default function Hero()` — a self-contained section with no props, consumed by `App.tsx` in this task and left untouched by Task 5.

- [ ] **Step 1: Write `src/components/Marquee.tsx`**

```tsx
type MarqueeProps = {
  text: string;
};

export default function Marquee({ text }: MarqueeProps) {
  return (
    <div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] leading-none text-cream sm:text-[26vh]">
      <span className="pr-[6vw]">{text}</span>
      <span className="pr-[6vw]">{text}</span>
    </div>
  );
}
```

- [ ] **Step 2: Write `src/components/Hero.tsx`**

```tsx
import Marquee from './Marquee';

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

      <div className="absolute inset-x-0 top-[16vh] z-10 overflow-hidden sm:top-[14vh]">
        <div className="anim-fade-up" style={{ animationDelay: '500ms' }}>
          <Marquee text="Raphael Dias" />
        </div>
      </div>

      <div
        className="anim-rise-in absolute left-1/2 top-1/2 z-20 h-[42vh] w-[70vw] max-w-[640px] -translate-x-1/2 -translate-y-[45%] overflow-hidden rounded-sm shadow-2xl sm:h-[54vh] sm:w-[46vw]"
        style={{ animationDelay: '300ms' }}
      >
        <img src="/projects/kwai-spiderman.png" alt="Kwai × Spider-Man: Brand New Day" className="h-full w-full object-cover" />
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
                rel="noopener"
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
```

- [ ] **Step 3: Modify `src/App.tsx`** — replace its contents with:

```tsx
import Hero from './components/Hero';

export default function App() {
  return <Hero />;
}
```

- [ ] **Step 4: Verify the build**

Run: `npm run typecheck && npm run build`
Expected: succeeds with no errors.

Manually re-verify (no GUI browser available — reason through the JSX): the `<img>` `src="/projects/kwai-spiderman.png"` matches the file moved to `public/projects/kwai-spiderman.png` in Task 1; every element with an `anim-*` class has a matching `@keyframes`/`.anim-*` rule defined in `src/index.css` (Task 1); the marquee text "Raphael Dias" appears twice inside `Marquee.tsx` for the seamless loop.

- [ ] **Step 5: Commit**

```bash
git add src/components/Marquee.tsx src/components/Hero.tsx src/App.tsx
git commit -m "feat: add editorial hero with scrolling name and project-art overlay"
```

---

### Task 5: Sobre + Projetos section

**Files:**
- Create: `src/components/CategoryFilter.tsx`
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/AboutProjects.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `PROJECTS` and `filterProjects` (Task 2), `WordsPullUpMultiStyle` and `AnimatedParagraph` (Task 3).
- Produces: `export default function AboutProjects()` — consumed by `App.tsx` in this task, rendered after `Hero`.

- [ ] **Step 1: Write `src/components/CategoryFilter.tsx`**

```tsx
type CategoryFilterProps = {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
};

export default function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div role="group" aria-label="Filtrar por categoria" className="mb-9 flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            aria-pressed={isActive}
            className={`rounded-full border px-4 py-2 font-sans text-xs uppercase tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 ${
              isActive
                ? 'border-primary bg-primary text-black'
                : 'border-gray-600 text-gray-400 hover:border-primary hover:text-primary'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Write `src/components/ProjectCard.tsx`**

```tsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  featured: boolean;
};

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col justify-between overflow-hidden rounded-lg bg-[#212121] p-4 ${
        project.featured ? 'sm:col-span-2' : ''
      }`}
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded">
        <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
      </div>
      <div className="mt-4">
        <p className="font-sans text-[10px] uppercase tracking-wide text-primary">{project.category}</p>
        <h3 className="mt-1 font-sans text-lg font-bold text-[#E1E0CC]">{project.title}</h3>
        <p className="mt-1 text-sm text-gray-400">{project.description}</p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener"
          className="mt-3 inline-flex items-center gap-2 font-sans text-sm text-primary hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
        >
          Ver no Behance
          <ArrowRight size={16} className="-rotate-45" />
        </a>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Write `src/components/AboutProjects.tsx`**

```tsx
import { useState } from 'react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';
import AnimatedParagraph from './AnimatedParagraph';
import CategoryFilter from './CategoryFilter';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../data/projects.js';
import { filterProjects } from '../lib/filterProjects.js';

const CATEGORIES = ['Todos', 'Landing Pages', 'Branding', 'UI/UX', 'Campanhas', 'Ilustração'];

export default function AboutProjects() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const visibleProjects = filterProjects(PROJECTS, activeCategory);

  return (
    <section id="sobre" className="bg-black px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl rounded-2xl bg-[#101010] px-6 py-16 text-center sm:px-12">
        <span className="text-[10px] uppercase tracking-wide text-primary sm:text-xs">Sobre</span>
        <div className="mx-auto mt-4 max-w-3xl text-3xl leading-[0.95] text-[#E1E0CC] sm:text-4xl sm:leading-[0.9] md:text-5xl">
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Publicitário e designer no Rio de Janeiro,', className: 'font-normal' },
              { text: 'criando com paixão', className: 'italic font-serif' },
              { text: 'para marcas como Kwai, Yamaha e TSE.', className: 'font-normal' },
            ]}
          />
        </div>
        <AnimatedParagraph
          text="Publicitário e designer no Rio de Janeiro, atuando na THNCE Comunicação. Cria landing pages, identidade de marca, interfaces para ambientes in-app e campanhas comerciais e institucionais."
          className="mx-auto mt-8 max-w-2xl text-xs text-[#DEDBC8] sm:text-sm md:text-base"
        />
      </div>

      <div id="projetos" className="mx-auto mt-20 max-w-6xl">
        <CategoryFilter categories={CATEGORIES} activeCategory={activeCategory} onSelect={setActiveCategory} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      <footer
        id="contato"
        className="mx-auto mt-24 flex max-w-6xl flex-col items-start justify-between gap-6 text-xs text-gray-400 sm:flex-row sm:items-end sm:text-sm"
      >
        <p className="max-w-xs">
          Raphael Dias é publicitário e designer no Rio de Janeiro, atuando com branding, landing pages e campanhas
          digitais.
        </p>
        <p className="text-right">
          LinkedIn:{' '}
          <a
            href="https://www.linkedin.com/in/lucas-dias-815073147/"
            target="_blank"
            rel="noopener"
            className="text-primary hover:opacity-80"
          >
            lucas-dias-815073147
          </a>{' '}
          · Behance:{' '}
          <a href="https://www.behance.net/lucasdiasb" target="_blank" rel="noopener" className="text-primary hover:opacity-80">
            lucasdiasb
          </a>
        </p>
      </footer>
    </section>
  );
}
```

- [ ] **Step 4: Modify `src/App.tsx`** — replace its contents with:

```tsx
import Hero from './components/Hero';
import AboutProjects from './components/AboutProjects';

export default function App() {
  return (
    <>
      <Hero />
      <AboutProjects />
    </>
  );
}
```

- [ ] **Step 5: Verify the build**

Run: `npm run typecheck && npm run build`
Expected: succeeds with no errors.

Manually re-verify: `CATEGORIES` in `AboutProjects.tsx` matches the Global Constraints' fixed category list exactly; the featured-project `sm:col-span-2` class in `ProjectCard.tsx` will apply to exactly 2 cards when `activeCategory` is `'Todos'` (both `featured: true` projects are in `Campanhas`, so they also both render at full featured size whenever the "Campanhas" filter is active — this is expected, not a bug).

- [ ] **Step 6: Commit**

```bash
git add src/components/CategoryFilter.tsx src/components/ProjectCard.tsx src/components/AboutProjects.tsx src/App.tsx
git commit -m "feat: add Sobre section and project grid with category filter"
```

---

### Task 6: README rewrite and final QA

**Files:**
- Modify: `README.md`

**Interfaces:** None.

- [ ] **Step 1: Replace `README.md` in full**

```markdown
# Portfólio Raphael Dias

Portfólio de Raphael Dias — publicitário/designer no Rio de Janeiro (THNCE Comunicação). Vite + React + TypeScript + Tailwind CSS + framer-motion. Hero editorial preto/creme com o nome rolando em destaque, seguido de uma seção Sobre + Projetos com revelação de texto animada.

## Rodar localmente

Requer Node.js 18+.

    npm install
    npm run dev

Abre em `http://localhost:5173` (ou a porta que o Vite indicar).

## Build de produção

    npm run build
    npm run preview

## Checagem de tipos

    npm run typecheck

## Rodar os testes de lógica (dados e filtro)

    npm test

## Conteúdo

Os 12 projetos em `src/data/projects.js` usam título, descrição, categoria, imagem e link reais, extraídos do perfil [behance.net/lucasdiasb](https://www.behance.net/lucasdiasb). As imagens ficam em `public/projects/` (servidas na raiz pelo Vite, ex: `/projects/kwai-spiderman.png`).

- Destaques: no máximo 2 projetos podem ter `featured: true` em `src/data/projects.js` — eles ganham um card maior (`sm:col-span-2`) na grade.
- Para adicionar um novo projeto: coloque a imagem de capa em `public/projects/`, adicione um objeto em `src/data/projects.js` seguindo o formato existente (`id`, `title`, `description`, `category`, `image`, `link`, `featured`) e rode os testes (`npm test`) para confirmar que os invariantes continuam válidos.
- A imagem de destaque do Hero (`src/components/Hero.tsx`) usa `/projects/kwai-spiderman.png` — troque o caminho ali se quiser destacar outra arte.
- Contato: os links de LinkedIn e Behance ficam no rodapé da seção Sobre + Projetos (`src/components/AboutProjects.tsx`).

## Deploy

O projeto está conectado ao Vercel (framework Vite detectado automaticamente a partir do `package.json`). Todo `git push` para `master` gera um novo deploy de produção automaticamente.
```

- [ ] **Step 2: Full QA pass**

Run: `npm test` — expect 9/9 passing (5 in `projects.test.js`, 4 in `filterProjects.test.js`).

Run: `npm run typecheck` — expect no errors.

Run: `npm run build` — expect success, `dist/` created.

Confirm via `Glob`/`Read` (no GUI browser available):
1. `public/projects/` contains exactly the 12 PNG files referenced by `src/data/projects.js`'s `image` fields.
2. `src/components/Hero.tsx`'s image `src` (`/projects/kwai-spiderman.png`) matches a real file in `public/projects/`.
3. No file under `src/` or the project root references the old paths `assets/projects/`, `js/`, or `css/style.css`.
4. `package.json`'s `dependencies` include `react`, `react-dom`, `framer-motion`, `lucide-react`, and `devDependencies` include `vite`, `typescript`, `tailwindcss`, `@vitejs/plugin-react`.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README for the Vite/React editorial redesign"
```
