# Portfólio Raphael Dias Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, framework-free portfolio site for Raphael Dias (publicitário/designer) styled after the "Little Troop" two-color gallery system, adapted with an original monogram mark and abstract hero shape instead of the reference studio's specific brand assets.

**Architecture:** Plain HTML/CSS/JS, no build step. Pure logic (category filtering, card rendering) lives in small standalone JS files that export via `module.exports` when `module` exists, so the exact same files run unmodified as `<script>` tags in the browser and via Node's built-in test runner (`node --test`) with zero dependencies — no jsdom, no bundler, no package.json required. This expands the spec's single `js/script.js` sketch into `data.js` / `filter.js` / `render.js` / `main.js` so the logic that has real behavior (filtering, rendering) is unit-testable in isolation from DOM wiring.

**Tech Stack:** HTML5, CSS3 (custom properties, Grid, media queries), vanilla JS (no framework), Google Fonts (Barlow Condensed, Spectral), Node.js built-in test runner for JS logic tests.

## Global Constraints

- Paleta restrita a `#000000` e `#ffffff` — nenhuma terceira cor, sombra ou gradiente decorativo.
- Radius único de 50px em cards, tags e botões — nenhum canto reto.
- Tipografia funcional (nav, corpo, legendas, filtros, footer): Barlow Condensed, 14–16px.
- Tipografia display (hero): Spectral, peso 200–300, um único momento por página.
- HTML/CSS/JS puro — sem build, sem bundler, sem framework JS no runtime do site.
- Categorias de filtro fixas: `Todos`, `Landing Pages`, `Branding`, `UI/UX`, `Campanhas`, `Ilustração`.
- Todo card de projeto linka para `https://www.behance.net/lucasdiasb` até que links individuais de projeto sejam fornecidos.
- Grid de projetos responsivo: 5 colunas (desktop) → 2 colunas (<1024px) → 1 coluna (<640px).
- Contato no footer usa o LinkedIn público (`linkedin.com/in/lucas-dias-815073147/`) e o Behance (`behance.net/lucasdiasb`).
- Exatamente 2 projetos em `PROJECTS` devem ter `featured: true` — o CSS de `.spotlight-card` só define posição/rotação para `--1` e `--2`; um terceiro `featured` renderizaria sem posicionamento.

---

### Task 1: Static scaffold — markup, tokens, base styles

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `README.md`

**Interfaces:**
- Produces: DOM containers later tasks attach to — `#filter`, `#project-grid`, `#project-spotlight` — and CSS classes `.card`, `.card__frame`, `.card__image`, `.card__title`, `.card__description`, `.spotlight-card`, `.spotlight-card--1`, `.spotlight-card--2`, `.filter__item`, `.filter__item--active`, `.filter__dot` that Task 3/4's rendered HTML strings must match exactly.

- [ ] **Step 1: Write `index.html`**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Raphael Dias — Publicitário &amp; Designer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700&family=Spectral:wght@200;300&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="nav">
    <a href="#projetos" class="nav__item">Trabalhos</a>
    <a href="#sobre" class="nav__item">Sobre</a>
    <a href="#top" class="nav__mark">RD</a>
    <a href="#contato" class="nav__item">Contato</a>
  </header>

  <main>
    <section id="top" class="hero">
      <div class="hero__shape" aria-hidden="true"></div>
      <div class="hero__text">
        <h1 class="hero__headline">Raphael Dias</h1>
        <p class="hero__subline">Publicitário &amp; Designer — Rio de Janeiro · THNCE Comunicação</p>
      </div>
    </section>

    <section id="sobre" class="about">
      <h2 class="section-header">Sobre</h2>
      <p class="about__text">Publicitário e designer no Rio de Janeiro, atuando na THNCE Comunicação. Cria landing pages, identidade de marca, interfaces para ambientes in-app e campanhas comerciais e institucionais para marcas como Kwai, Yamaha e TSE.</p>
    </section>

    <section id="projetos" class="projects">
      <h2 class="section-header">Índice de Projetos</h2>
      <div class="filter" id="filter"></div>
      <div class="grid" id="project-grid"></div>
    </section>

    <section class="spotlight">
      <h2 class="section-header">Destaques</h2>
      <div class="spotlight__stack" id="project-spotlight"></div>
    </section>
  </main>

  <footer id="contato" class="footer">
    <p class="footer__bio">Raphael Dias é publicitário e designer no Rio de Janeiro, atuando com branding, landing pages e campanhas digitais.</p>
    <p class="footer__contact">LinkedIn: <a href="https://www.linkedin.com/in/lucas-dias-815073147/" target="_blank" rel="noopener">lucas-dias-815073147</a> · Behance: <a href="https://www.behance.net/lucasdiasb" target="_blank" rel="noopener">lucasdiasb</a></p>
  </footer>
</body>
</html>
```

- [ ] **Step 2: Write `css/style.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700&family=Spectral:wght@200;300&display=swap');

:root {
  --color-black: #000000;
  --color-white: #ffffff;
  --font-functional: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  --font-display: 'Spectral', Georgia, serif;
  --text-caption: 14px;
  --text-body: 16px;
  --text-display: 76px;
  --radius: 50px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-100: 100px;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background: var(--color-white);
  color: var(--color-black);
  font-family: var(--font-functional);
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-20) var(--spacing-100);
  font-size: var(--text-caption);
}

.nav__item {
  font-size: var(--text-caption);
}

.nav__mark {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 20px;
}

.hero {
  display: flex;
  align-items: center;
  gap: var(--spacing-100);
  padding: var(--spacing-100);
  min-height: 60vh;
}

.hero__shape {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #333333, var(--color-black) 60%);
  flex-shrink: 0;
}

.hero__headline {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: var(--text-display);
  line-height: 0.85;
  letter-spacing: -0.03em;
  margin: 0 0 var(--spacing-16);
}

.hero__subline {
  font-size: var(--text-body);
  margin: 0;
}

.section-header {
  font-family: var(--font-functional);
  font-size: var(--text-body);
  font-weight: 700;
  margin: 0 0 var(--spacing-20);
  padding: 0 var(--spacing-100);
}

.about {
  padding: var(--spacing-100) 0;
}

.about__text {
  padding: 0 var(--spacing-100);
  font-size: var(--text-body);
  max-width: 640px;
}

.projects {
  padding: var(--spacing-100) 0;
}

.filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-20);
  padding: 0 var(--spacing-100);
  margin-bottom: var(--spacing-100);
}

.filter__item {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-8);
  background: none;
  border: none;
  font-family: var(--font-functional);
  font-size: var(--text-caption);
  color: var(--color-black);
  cursor: pointer;
  padding: 0;
}

.filter__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid var(--color-black);
  display: inline-block;
}

.filter__item--active .filter__dot {
  background: var(--color-black);
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--spacing-20);
  padding: 0 var(--spacing-100);
}

.card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.card__frame {
  display: block;
  border-radius: var(--radius);
  overflow: hidden;
  aspect-ratio: 1 / 1;
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__title {
  font-size: var(--text-caption);
  font-weight: 700;
  margin: 0;
}

.card__description {
  font-size: var(--text-caption);
  margin: 0;
  opacity: 0.7;
}

.spotlight {
  padding: var(--spacing-100) 0 calc(var(--spacing-100) * 2);
}

.spotlight__stack {
  position: relative;
  padding: 0 var(--spacing-100);
  min-height: 480px;
}

.spotlight-card {
  position: absolute;
  width: 45%;
  max-width: 560px;
}

.spotlight-card__frame {
  display: block;
  border-radius: var(--radius);
  overflow: hidden;
  aspect-ratio: 4 / 3;
}

.spotlight-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spotlight-card__title {
  font-size: var(--text-caption);
  font-weight: 700;
  margin: var(--spacing-8) 0 0;
}

.spotlight-card--1 {
  left: var(--spacing-100);
  top: 0;
  transform: rotate(-2deg);
  z-index: 2;
}

.spotlight-card--2 {
  left: calc(var(--spacing-100) + 30%);
  top: 60px;
  transform: rotate(2deg);
  z-index: 1;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--spacing-20);
  padding: var(--spacing-100);
  font-size: var(--text-caption);
}

.footer__bio {
  max-width: 360px;
  margin: 0;
}

.footer__contact {
  margin: 0;
  text-align: right;
}

.footer__contact a {
  border-bottom: 1px solid var(--color-black);
}
```

- [ ] **Step 3: Write `README.md` stub**

```markdown
# Portfólio Raphael Dias

Site estático (HTML/CSS/JS puro, sem build) para o portfólio de Raphael Dias.

## Rodar localmente

Abra `index.html` diretamente no navegador, ou sirva a pasta com qualquer servidor estático.

## Rodar os testes de lógica (filtro e render)

Requer Node.js 18+.

    node --test tests/
```

- [ ] **Step 4: Verify in browser**

Open `index.html` directly in a browser (double-click or `start index.html` on Windows).
Expected: nav row visible (Trabalhos / Sobre / RD / Contato), hero with headline "Raphael Dias" next to a black gradient circle, "Sobre" paragraph, empty "Índice de Projetos" and "Destaques" sections (no cards yet — expected, wired in Task 4), footer with bio and LinkedIn/Behance links at the bottom corners. No layout overlap, no console errors.

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css README.md
git commit -m "feat: add static scaffold with design tokens and base layout"
```

---

### Task 2: Project data and category filter (TDD)

**Files:**
- Create: `js/data.js`
- Create: `js/filter.js`
- Test: `tests/filter.test.js`

**Interfaces:**
- Produces: global `PROJECTS` array (also `module.exports.PROJECTS` under Node) of objects shaped `{ id: string, title: string, description: string, category: string, image: string, link: string, featured: boolean }`. Global function `filterProjects(projects, category)` (also `module.exports.filterProjects`) — returns the full array when `category` is falsy or `'Todos'`, otherwise returns only projects whose `category` matches exactly.
- Consumes: nothing (pure, no DOM).

- [ ] **Step 1: Write the failing tests**

Create `tests/filter.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { filterProjects } = require('../js/filter.js');

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

Run: `node --test tests/filter.test.js`
Expected: FAIL — `Cannot find module '../js/filter.js'`

- [ ] **Step 3: Write minimal implementation**

Create `js/filter.js`:

```js
function filterProjects(projects, category) {
  if (!category || category === 'Todos') {
    return projects;
  }
  return projects.filter(function (project) {
    return project.category === category;
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { filterProjects };
}
```

Create `js/data.js` (seed data, expanded to the real dataset in Task 6):

```js
const PROJECTS = [
  {
    id: 'seed-1',
    title: 'Projeto Exemplo 1',
    description: 'Descrição temporária — substituída no Task 6.',
    category: 'Branding',
    image: 'assets/placeholder-pattern.svg',
    link: 'https://www.behance.net/lucasdiasb',
    featured: true,
  },
  {
    id: 'seed-2',
    title: 'Projeto Exemplo 2',
    description: 'Descrição temporária — substituída no Task 6.',
    category: 'UI/UX',
    image: 'assets/placeholder-pattern.svg',
    link: 'https://www.behance.net/lucasdiasb',
    featured: false,
  },
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test tests/filter.test.js`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add js/data.js js/filter.js tests/filter.test.js
git commit -m "feat: add seed project data and category filter logic"
```

---

### Task 3: Card rendering functions (TDD)

**Files:**
- Create: `js/render.js`
- Create: `assets/placeholder-pattern.svg`
- Test: `tests/render.test.js`

**Interfaces:**
- Consumes: project objects shaped as defined in Task 2 (`{ id, title, description, category, image, link, featured }`).
- Produces: global functions (also `module.exports` under Node) `renderProjectCard(project)` → HTML string matching `.card` / `.card__frame` / `.card__image` / `.card__title` / `.card__description` classes from Task 1's CSS; `renderGrid(projects)` → concatenated HTML string of `renderProjectCard` calls; `renderSpotlight(projects)` → HTML string using `.spotlight-card`, numbering each with `.spotlight-card--1`, `.spotlight-card--2`, etc. by position in the given array.

- [ ] **Step 1: Write the failing tests**

Create `tests/render.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { renderProjectCard, renderGrid, renderSpotlight } = require('../js/render.js');

const sampleProject = {
  id: 'kwai-landing',
  title: 'Kwai — Landing Page',
  description: 'Landing page de campanha para o app Kwai.',
  category: 'Landing Pages',
  image: 'assets/placeholder-pattern.svg',
  link: 'https://www.behance.net/lucasdiasb',
  featured: true,
};

test('renderProjectCard includes title, description, category and link', () => {
  const html = renderProjectCard(sampleProject);
  assert.match(html, /Kwai — Landing Page/);
  assert.match(html, /Landing page de campanha para o app Kwai\./);
  assert.match(html, /data-category="Landing Pages"/);
  assert.match(html, /href="https:\/\/www\.behance\.net\/lucasdiasb"/);
});

test('renderGrid concatenates one card per project', () => {
  const html = renderGrid([sampleProject, sampleProject]);
  const matches = html.match(/card__title/g);
  assert.equal(matches.length, 2);
});

test('renderSpotlight numbers each card by position', () => {
  const html = renderSpotlight([sampleProject, sampleProject]);
  assert.match(html, /spotlight-card--1/);
  assert.match(html, /spotlight-card--2/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/render.test.js`
Expected: FAIL — `Cannot find module '../js/render.js'`

- [ ] **Step 3: Write minimal implementation**

Create `js/render.js`:

```js
function renderProjectCard(project) {
  return (
    '<article class="card" data-category="' + project.category + '">' +
      '<a class="card__frame" href="' + project.link + '" target="_blank" rel="noopener">' +
        '<img class="card__image" src="' + project.image + '" alt="' + project.title + '">' +
      '</a>' +
      '<h3 class="card__title">' + project.title + '</h3>' +
      '<p class="card__description">' + project.description + '</p>' +
    '</article>'
  );
}

function renderGrid(projects) {
  return projects.map(renderProjectCard).join('');
}

function renderSpotlight(projects) {
  return projects.map(function (project, index) {
    return (
      '<article class="spotlight-card spotlight-card--' + (index + 1) + '">' +
        '<a class="spotlight-card__frame" href="' + project.link + '" target="_blank" rel="noopener">' +
          '<img class="spotlight-card__image" src="' + project.image + '" alt="' + project.title + '">' +
        '</a>' +
        '<h3 class="spotlight-card__title">' + project.title + '</h3>' +
      '</article>'
    );
  }).join('');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderProjectCard, renderGrid, renderSpotlight };
}
```

Create `assets/placeholder-pattern.svg` (shared placeholder graphic used by every project card until real images are provided):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
  <rect width="400" height="300" fill="#ffffff"/>
  <g stroke="#000000" stroke-width="6">
    <line x1="-100" y1="350" x2="300" y2="-50"/>
    <line x1="-50" y1="350" x2="350" y2="-50"/>
    <line x1="0" y1="350" x2="400" y2="-50"/>
    <line x1="50" y1="350" x2="450" y2="-50"/>
    <line x1="100" y1="350" x2="500" y2="-50"/>
    <line x1="150" y1="350" x2="550" y2="-50"/>
    <line x1="200" y1="350" x2="600" y2="-50"/>
    <line x1="250" y1="350" x2="650" y2="-50"/>
    <line x1="300" y1="350" x2="700" y2="-50"/>
  </g>
</svg>
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test tests/render.test.js`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add js/render.js assets/placeholder-pattern.svg tests/render.test.js
git commit -m "feat: add card and spotlight rendering functions"
```

---

### Task 4: Wire filter, grid and spotlight into the page

**Files:**
- Create: `js/main.js`
- Modify: `index.html` (add script tags before `</body>`)

**Interfaces:**
- Consumes: `PROJECTS` (Task 2), `filterProjects` (Task 2), `renderGrid` / `renderSpotlight` (Task 3), DOM containers `#filter` / `#project-grid` / `#project-spotlight` (Task 1).
- Produces: nothing consumed by later tasks (this is the wiring layer).

- [ ] **Step 1: Write `js/main.js`**

```js
document.addEventListener('DOMContentLoaded', function () {
  var filterEl = document.getElementById('filter');
  var gridEl = document.getElementById('project-grid');
  var spotlightEl = document.getElementById('project-spotlight');

  var categories = ['Todos', 'Landing Pages', 'Branding', 'UI/UX', 'Campanhas', 'Ilustração'];
  var activeCategory = 'Todos';

  function renderFilter() {
    filterEl.innerHTML = categories.map(function (category) {
      var activeClass = category === activeCategory ? ' filter__item--active' : '';
      return (
        '<button class="filter__item' + activeClass + '" data-category="' + category + '" type="button">' +
          '<span class="filter__dot"></span>' + category +
        '</button>'
      );
    }).join('');
  }

  function renderGridForCategory() {
    var visible = filterProjects(PROJECTS, activeCategory);
    gridEl.innerHTML = renderGrid(visible);
  }

  filterEl.addEventListener('click', function (event) {
    var button = event.target.closest('.filter__item');
    if (!button) return;
    activeCategory = button.getAttribute('data-category');
    renderFilter();
    renderGridForCategory();
  });

  renderFilter();
  renderGridForCategory();
  spotlightEl.innerHTML = renderSpotlight(PROJECTS.filter(function (project) {
    return project.featured;
  }));
});
```

- [ ] **Step 2: Modify `index.html`** — add before `</body>`:

```html
  <script src="js/data.js"></script>
  <script src="js/filter.js"></script>
  <script src="js/render.js"></script>
  <script src="js/main.js"></script>
</body>
```

(replaces the existing closing `</body>` tag)

- [ ] **Step 3: Verify in browser**

Open `index.html`. Expected: "Índice de Projetos" now shows filter buttons (Todos / Landing Pages / Branding / UI/UX / Campanhas / Ilustração) each with a hollow circle, and two seed project cards in the grid. "Destaques" shows one spotlight card (the seed project with `featured: true`). Click "Branding" — grid should shrink to only the Branding seed card and its filter dot should fill solid black. Click "Todos" — both cards return. Open the browser console — no errors.

- [ ] **Step 4: Commit**

```bash
git add js/main.js index.html
git commit -m "feat: wire category filter, grid and spotlight rendering"
```

---

### Task 5: Responsive layout

**Files:**
- Modify: `css/style.css` (append media queries)

**Interfaces:** None — pure CSS, no new interfaces.

- [ ] **Step 1: Append responsive rules to `css/style.css`**

```css
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .spotlight-card {
    width: 60%;
  }
}

@media (max-width: 640px) {
  .nav {
    flex-direction: column;
    gap: var(--spacing-12);
    padding: var(--spacing-20);
    text-align: center;
  }

  .hero {
    flex-direction: column;
    padding: var(--spacing-20);
    gap: var(--spacing-20);
    text-align: center;
  }

  .hero__shape {
    width: 200px;
    height: 200px;
  }

  .hero__headline {
    font-size: 40px;
  }

  .section-header,
  .about__text,
  .filter,
  .grid {
    padding-left: var(--spacing-20);
    padding-right: var(--spacing-20);
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .spotlight__stack {
    min-height: unset;
  }

  .spotlight-card {
    position: static;
    width: 100%;
    transform: none;
    margin-bottom: var(--spacing-20);
  }

  .footer {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .footer__contact {
    text-align: left;
  }
}
```

- [ ] **Step 2: Verify responsively in browser**

Open `index.html`, open devtools responsive mode. At 1024px width: grid shows 2 columns, spotlight cards are 60% width. At 640px width: nav stacks vertically and centers, hero stacks with a smaller 200px shape and 40px headline, grid becomes 1 column, spotlight cards stack in normal document flow (no overlap), footer blocks stack left-aligned. No horizontal scrollbar at any width.

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: add responsive breakpoints for grid, nav, hero and footer"
```

---

### Task 6: Final content pass

**Files:**
- Modify: `js/data.js` (replace seed data with the real dataset)
- Modify: `README.md` (finalize usage instructions)

**Interfaces:** None — same `PROJECTS` shape defined in Task 2, values only.

- [ ] **Step 1: Replace `js/data.js` contents**

```js
const PROJECTS = [
  {
    id: 'kwai-landing',
    title: 'Kwai — Landing Page',
    description: 'Landing page de campanha para o app Kwai.',
    category: 'Landing Pages',
    image: 'assets/placeholder-pattern.svg',
    link: 'https://www.behance.net/lucasdiasb',
    featured: true,
  },
  {
    id: 'kwai-inapp',
    title: 'Kwai — Ações In-App',
    description: 'Interface e conteúdo para atividades dentro do app Kwai.',
    category: 'UI/UX',
    image: 'assets/placeholder-pattern.svg',
    link: 'https://www.behance.net/lucasdiasb',
    featured: false,
  },
  {
    id: 'yamaha-branding',
    title: 'Yamaha — Identidade de Campanha',
    description: 'Branding e peças visuais para campanha comercial Yamaha.',
    category: 'Branding',
    image: 'assets/placeholder-pattern.svg',
    link: 'https://www.behance.net/lucasdiasb',
    featured: false,
  },
  {
    id: 'tse-campanha',
    title: 'TSE — Campanha Institucional',
    description: 'Peças de comunicação para campanha institucional do TSE.',
    category: 'Campanhas',
    image: 'assets/placeholder-pattern.svg',
    link: 'https://www.behance.net/lucasdiasb',
    featured: true,
  },
  {
    id: 'thnce-conteudo',
    title: 'THNCE — Conteúdo para Redes',
    description: 'Conteúdo ilustrado para redes sociais na THNCE Comunicação.',
    category: 'Ilustração',
    image: 'assets/placeholder-pattern.svg',
    link: 'https://www.behance.net/lucasdiasb',
    featured: false,
  },
  {
    id: 'reality-show-identidade',
    title: 'Reality Show — Identidade Visual',
    description: 'Branding para programa de reality show.',
    category: 'Branding',
    image: 'assets/placeholder-pattern.svg',
    link: 'https://www.behance.net/lucasdiasb',
    featured: false,
  },
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS };
}
```

- [ ] **Step 2: Run the full test suite**

Run: `node --test tests/`
Expected: PASS (7 tests total — 4 from `filter.test.js`, 3 from `render.test.js`; these tests use their own inline sample data, not `PROJECTS`, so they remain unaffected by the content change)

- [ ] **Step 3: Rewrite `README.md`**

```markdown
# Portfólio Raphael Dias

Site estático (HTML/CSS/JS puro, sem build) para o portfólio de Raphael Dias — publicitário/designer no Rio de Janeiro (THNCE Comunicação).

## Rodar localmente

Abra `index.html` diretamente no navegador, ou sirva a pasta com qualquer servidor estático (ex: `npx serve .`).

## Rodar os testes de lógica (filtro e render)

Requer Node.js 18+.

    node --test tests/

## Substituir conteúdo placeholder

- Imagens: troque `assets/placeholder-pattern.svg` pelas imagens reais de cada projeto em `js/data.js` (campo `image`).
- Links: troque `link` em cada projeto de `js/data.js` pela URL do projeto individual no Behance, quando disponível.
- Contato: o e-mail de contato ainda não está no footer — adicione um `<p>` com o e-mail real em `index.html` dentro de `.footer__contact` quando tiver a informação.
```

- [ ] **Step 4: Verify in browser**

Open `index.html`. Expected: grid shows 6 project cards (Kwai — Landing Page, Kwai — Ações In-App, Yamaha — Identidade de Campanha, TSE — Campanha Institucional, THNCE — Conteúdo para Redes, Reality Show — Identidade Visual). "Destaques" shows exactly 2 overlapping spotlight cards (Kwai — Landing Page and TSE — Campanha Institucional). Clicking each filter category shows only the matching cards. Footer shows the LinkedIn and Behance links, both opening in a new tab.

- [ ] **Step 5: Commit**

```bash
git add js/data.js README.md
git commit -m "feat: add real project content and finalize README"
```
