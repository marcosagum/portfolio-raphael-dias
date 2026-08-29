# Portfólio Raphael Dias — Motion Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current static black/white gallery portfolio with a dark, motion-driven, interactive version — animated particle background, GSAP scroll-reveal, and hover motion — while keeping the existing real project data untouched.

**Architecture:** Same static HTML/CSS/JS approach, no build step. The data layer (`js/data.js`, `js/filter.js`, and their tests) is untouched — this redesign only touches presentation (`index.html`, `css/style.css`, `js/render.js`, `js/main.js`) and adds two new pieces: a hand-written Canvas 2D particle system (`js/particles.js`, pure functions unit-tested the same dual-export way as the rest of the codebase) and GSAP + ScrollTrigger loaded from cdnjs as classic `<script>` tags (no npm/build). `js/render.js` needs only a one-line change (the old "dot" filter indicator is dropped in favor of a solid pill fill) — the card/spotlight markup itself does not need to change, since only CSS tokens (radius, color) differ between the two visual systems.

**Tech Stack:** HTML5, CSS3 (custom properties, Grid, Flexbox, media queries), vanilla JS (Canvas 2D for particles), GSAP 3 + ScrollTrigger via cdnjs CDN, Google Fonts (Inter), Node's built-in test runner for JS logic tests.

## Global Constraints

- Paleta: `#000000` (void, fundo de toda seção) · `#ffffff` (texto primário) · `#9a9a9a` (nav/labels secundários) · `#bdbdbd` (corpo de texto terciário) · `#8052ff` (ação primária, glow de hover, uma das cores de partícula) · `#ffb829` (label/destaque pontual, uma das cores de partícula) · `#15846e` (acento secundário sutil, uma das cores de partícula).
- Tipografia: Inter via Google Fonts. Peso 200 para corpo de texto (18px). Peso 400 para headlines grandes (42–113px) com tracking bem negativo. Peso 600 uppercase para nav/labels (14px).
- Radius: 24px em cards e nav; pill (9999px) em botões e tags de filtro. Sem sombra ou fundo próprio em cards — só a imagem com radius.
- Categorias de filtro fixas (inalteradas): `Todos`, `Landing Pages`, `Branding`, `UI/UX`, `Campanhas`, `Ilustração`.
- `js/data.js` (12 projetos reais) e `js/filter.js` não são modificados por este plano.
- GSAP e ScrollTrigger carregados via cdnjs como `<script>` clássico — sem npm, sem build, versão fixada em `3.12.5`.
- O campo de partículas deve respeitar `prefers-reduced-motion: reduce`: quando ativo, desenha um quadro estático (sem `requestAnimationFrame` contínuo) e as animações GSAP reduzem a fade simples sem translação/stagger.
- As partículas ficam dispersas organicamente — nenhuma silhueta reconhecível (não replicar a "constelação-cérebro" específica do sistema de referência).

---

### Task 1: HTML shell + base dark theme CSS

**Files:**
- Modify: `index.html` (full replacement)
- Modify: `css/style.css` (full replacement)

**Interfaces:**
- Produces: DOM containers `#filter`, `#project-grid`, `#project-spotlight` (same ids the existing `js/main.js` pattern will reuse in Task 2), canvas element `#particle-canvas` (consumed by Task 3's `js/particles.js`), CSS utility classes `.label-accent`, `.section-heading`, `.body-text`, `.button-pill` and CSS custom properties (`--color-*`, `--text-*`, `--spacing-*`, `--radius`, `--radius-pill`, `--max-width`) that later tasks' CSS additions rely on.
- No `<script>` tags yet — this task is markup and CSS only, so opening `index.html` in a browser shows the static (unpopulated) shell with no console errors.

- [ ] **Step 1: Replace `index.html` in full**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Raphael Dias — Publicitário &amp; Designer</title>
  <meta name="description" content="Portfólio de Raphael Dias, publicitário e designer no Rio de Janeiro (THNCE Comunicação), com landing pages, identidade de marca, UI/UX e campanhas para marcas como Kwai, Yamaha e TSE.">
  <meta property="og:title" content="Raphael Dias — Publicitário &amp; Designer">
  <meta property="og:description" content="Portfólio de Raphael Dias, publicitário e designer no Rio de Janeiro (THNCE Comunicação), com landing pages, identidade de marca, UI/UX e campanhas para marcas como Kwai, Yamaha e TSE.">
  <meta property="og:type" content="website">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='black'/%3E%3Ctext x='32' y='44' font-family='Arial, sans-serif' font-size='24' font-weight='bold' fill='%238052ff' text-anchor='middle'%3ERD%3C/text%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <canvas id="particle-canvas" aria-hidden="true"></canvas>

  <header class="nav">
    <a href="#top" class="nav__mark">RD</a>
    <nav class="nav__links">
      <a href="#projetos" class="nav__item">Trabalhos</a>
      <a href="#sobre" class="nav__item">Sobre</a>
      <a href="#contato" class="nav__item">Contato</a>
    </nav>
    <a href="https://www.behance.net/lucasdiasb" target="_blank" rel="noopener" class="button-pill">Ver no Behance</a>
  </header>

  <main>
    <section id="top" class="hero">
      <div class="hero__text">
        <h1 class="hero__headline">Raphael Dias</h1>
        <p class="hero__subline">Publicitário &amp; Designer — Rio de Janeiro · THNCE Comunicação</p>
        <a href="#projetos" class="button-pill">Ver Projetos</a>
      </div>
    </section>

    <section id="sobre" class="about">
      <div class="about__grid">
        <div class="about__copy">
          <span class="label-accent">Sobre</span>
          <h2 class="section-heading">Publicidade e design com um pé em cada tela.</h2>
          <p class="body-text">Publicitário e designer no Rio de Janeiro, atuando na THNCE Comunicação. Cria landing pages, identidade de marca, interfaces para ambientes in-app e campanhas comerciais e institucionais para marcas como Kwai, Yamaha e TSE.</p>
        </div>
      </div>
    </section>

    <section id="projetos" class="projects">
      <span class="label-accent">Índice de Projetos</span>
      <div class="filter" id="filter" role="group" aria-label="Filtrar por categoria"></div>
      <div class="grid" id="project-grid"></div>
    </section>

    <section class="spotlight">
      <span class="label-accent">Destaques</span>
      <div class="spotlight__grid" id="project-spotlight"></div>
    </section>
  </main>

  <footer id="contato" class="footer">
    <p class="footer__bio">Raphael Dias é publicitário e designer no Rio de Janeiro, atuando com branding, landing pages e campanhas digitais.</p>
    <p class="footer__contact">LinkedIn: <a href="https://www.linkedin.com/in/lucas-dias-815073147/" target="_blank" rel="noopener">lucas-dias-815073147</a> · Behance: <a href="https://www.behance.net/lucasdiasb" target="_blank" rel="noopener">lucasdiasb</a></p>
  </footer>
</body>
</html>
```

- [ ] **Step 2: Replace `css/style.css` in full**

```css
:root {
  --color-void: #000000;
  --color-bone-white: #ffffff;
  --color-ash-gray: #9a9a9a;
  --color-silver-mist: #bdbdbd;
  --color-electric-iris: #8052ff;
  --color-saffron-spark: #ffb829;
  --color-deep-verdant: #15846e;

  --font-primary: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --text-body: 18px;
  --text-nav: 14px;
  --text-heading-xs: 27px;
  --text-heading-sm: 42px;
  --text-heading: 48px;
  --text-heading-lg: 78px;
  --text-display: 113px;

  --spacing-6: 6px;
  --spacing-12: 12px;
  --spacing-18: 18px;
  --spacing-24: 24px;
  --spacing-30: 30px;
  --spacing-36: 36px;
  --spacing-60: 60px;
  --spacing-96: 96px;
  --spacing-120: 120px;

  --radius: 24px;
  --radius-pill: 9999px;

  --max-width: 1280px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

html, body {
  margin: 0;
  padding: 0;
  color: var(--color-bone-white);
  font-family: var(--font-primary);
  font-weight: 200;
}

body {
  background: var(--color-void);
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

#particle-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  display: block;
}

header.nav,
main,
footer.footer {
  position: relative;
  z-index: 1;
}

.label-accent {
  display: block;
  font-size: var(--text-nav);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.35px;
  color: var(--color-saffron-spark);
  margin-bottom: var(--spacing-18);
}

.section-heading {
  font-weight: 400;
  font-size: var(--text-heading-sm);
  line-height: 1.2;
  letter-spacing: -1.68px;
  margin: 0 0 var(--spacing-24);
  max-width: 720px;
}

.body-text {
  font-weight: 200;
  font-size: var(--text-body);
  line-height: 1.5;
  color: var(--color-silver-mist);
  max-width: 520px;
  margin: 0;
}

.button-pill {
  display: inline-block;
  background: var(--color-electric-iris);
  color: var(--color-bone-white);
  font-size: var(--text-nav);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  padding: 14.4px 24px;
  border-radius: var(--radius-pill);
  border: none;
  cursor: pointer;
}

.button-pill:focus-visible {
  outline: 2px solid var(--color-bone-white);
  outline-offset: 4px;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-24);
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-24) var(--spacing-36);
}

.nav__mark {
  font-size: 24px;
  font-weight: 400;
  color: var(--color-bone-white);
}

.nav__links {
  display: flex;
  gap: var(--spacing-30);
}

.nav__item {
  font-size: var(--text-nav);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  color: var(--color-ash-gray);
}

.nav__item:hover,
.nav__item:focus-visible {
  color: var(--color-bone-white);
}

.nav__item:focus-visible {
  outline: 2px solid var(--color-bone-white);
  outline-offset: 4px;
}

.hero {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-120) var(--spacing-36);
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.hero__text {
  max-width: 720px;
}

.hero__headline {
  font-weight: 400;
  font-size: var(--text-display);
  line-height: 1.1;
  letter-spacing: -4.52px;
  margin: 0 0 var(--spacing-24);
}

.hero__subline {
  font-weight: 200;
  font-size: var(--text-body);
  color: var(--color-silver-mist);
  margin: 0 0 var(--spacing-36);
}

.about {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-96) var(--spacing-36);
}

.about__grid {
  display: flex;
}

.about__copy {
  max-width: 720px;
}

.projects {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-96) var(--spacing-36);
}

.spotlight {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-36) var(--spacing-120);
}

.footer {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-96) var(--spacing-36) var(--spacing-60);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--spacing-24);
  font-size: var(--text-nav);
}

.footer__bio {
  max-width: 360px;
  color: var(--color-silver-mist);
  margin: 0;
}

.footer__contact {
  margin: 0;
  text-align: right;
  color: var(--color-ash-gray);
}

.footer__contact a {
  color: var(--color-saffron-spark);
}
```

- [ ] **Step 3: Verify in browser**

Open `index.html` directly. Expected: pure black page, "RD" mark + nav links + violet "Ver no Behance" pill at the top, huge white "Raphael Dias" headline in the hero with a violet "Ver Projetos" pill below it, an About paragraph, empty "Índice de Projetos" and "Destaques" sections (no cards yet — expected, wired in Task 2), and a footer with bio + LinkedIn/Behance links. No console errors (no scripts are loaded yet, so none are expected to run).

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: rebuild HTML shell and base CSS for dark motion redesign"
```

---

### Task 2: Project grid/filter CSS, render.js tweak, and main.js wiring

**Files:**
- Modify: `css/style.css` (append filter/grid/card/spotlight rules)
- Modify: `js/render.js` (drop the obsolete filter-dot indicator)
- Create: `js/main.js`
- Modify: `index.html` (add script tags)

**Interfaces:**
- Consumes: `PROJECTS` and `filterProjects` (from existing, unmodified `js/data.js` / `js/filter.js`), `renderGrid` / `renderSpotlight` / `renderFilterBar` (from `js/render.js`), DOM containers `#filter` / `#project-grid` / `#project-spotlight` (from Task 1).
- Produces: nothing new for later tasks — Task 4 will later replace this task's `js/main.js` in full with a version that adds GSAP.

- [ ] **Step 1: Append to `css/style.css`**

```css
.filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-12);
  margin-bottom: var(--spacing-36);
}

.filter__item {
  display: inline-flex;
  align-items: center;
  background: transparent;
  border: 1px solid var(--color-ash-gray);
  color: var(--color-ash-gray);
  font-family: var(--font-primary);
  font-size: var(--text-nav);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  padding: var(--spacing-12) var(--spacing-18);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.filter__item:hover {
  color: var(--color-bone-white);
  border-color: var(--color-bone-white);
}

.filter__item:focus-visible {
  outline: 2px solid var(--color-bone-white);
  outline-offset: 4px;
}

.filter__item--active {
  background: var(--color-electric-iris);
  border-color: var(--color-electric-iris);
  color: var(--color-bone-white);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-30);
}

.card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-12);
}

.card__frame {
  display: block;
  border-radius: var(--radius);
  overflow: hidden;
  aspect-ratio: 1 / 1;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card__frame:hover,
.card__frame:focus-visible {
  transform: scale(1.03);
  box-shadow: 0 0 40px rgba(128, 82, 255, 0.45);
}

.card__frame:focus-visible {
  outline: 2px solid var(--color-electric-iris);
  outline-offset: 4px;
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__title {
  font-size: var(--text-nav);
  font-weight: 600;
  color: var(--color-bone-white);
  margin: 0;
}

.card__description {
  font-size: var(--text-nav);
  font-weight: 200;
  color: var(--color-silver-mist);
  margin: 0;
}

.spotlight__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-30);
}

.spotlight-card__frame {
  display: block;
  border-radius: var(--radius);
  overflow: hidden;
  aspect-ratio: 4 / 3;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.spotlight-card__frame:hover,
.spotlight-card__frame:focus-visible {
  transform: scale(1.02);
  box-shadow: 0 0 60px rgba(128, 82, 255, 0.5);
}

.spotlight-card__frame:focus-visible {
  outline: 2px solid var(--color-electric-iris);
  outline-offset: 4px;
}

.spotlight-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spotlight-card__title {
  font-size: var(--text-heading-xs);
  font-weight: 400;
  color: var(--color-bone-white);
  margin: var(--spacing-12) 0 0;
}
```

- [ ] **Step 2: Modify `js/render.js`** — in `renderFilterBar`, remove the `<span class="filter__dot"></span>` element (the new design shows the active state as a solid filled pill on the button itself, not a separate dot). Find:

```js
    return (
      '<button class="filter__item' + activeClass + '" data-category="' + escapeHtml(category) + '" type="button" aria-pressed="' + (isActive ? 'true' : 'false') + '">' +
        '<span class="filter__dot"></span>' + escapeHtml(category) +
      '</button>'
    );
```

Replace with:

```js
    return (
      '<button class="filter__item' + activeClass + '" data-category="' + escapeHtml(category) + '" type="button" aria-pressed="' + (isActive ? 'true' : 'false') + '">' +
        escapeHtml(category) +
      '</button>'
    );
```

No other changes to `js/render.js`. Do not modify `tests/render.test.js` — none of its assertions check for `.filter__dot`, so the existing suite still passes unmodified; run it to confirm (Step 5).

- [ ] **Step 3: Create `js/main.js`**

```js
document.addEventListener('DOMContentLoaded', function () {
  var filterEl = document.getElementById('filter');
  var gridEl = document.getElementById('project-grid');
  var spotlightEl = document.getElementById('project-spotlight');

  var categories = ['Todos', 'Landing Pages', 'Branding', 'UI/UX', 'Campanhas', 'Ilustração'];
  var activeCategory = 'Todos';

  function renderFilter() {
    filterEl.innerHTML = renderFilterBar(categories, activeCategory);
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

- [ ] **Step 4: Modify `index.html`** — add before `</body>`:

```html
  <script src="js/data.js"></script>
  <script src="js/filter.js"></script>
  <script src="js/render.js"></script>
  <script src="js/main.js"></script>
</body>
```

(replaces the existing closing `</body>` tag)

- [ ] **Step 5: Run the existing test suite and verify in browser**

Run: `node --test` — expected: all existing tests still pass (13 tests: `data.test.js`, `filter.test.js`, `render.test.js` — none of their assertions depend on the removed dot span).

Open `index.html`. Expected: "Índice de Projetos" now shows 6 pill-shaped filter buttons (Todos / Landing Pages / Branding / UI/UX / Campanhas / Ilustração), with "Todos" shown as a solid violet pill (active) and the rest as outlined gray pills. The grid shows all 12 real projects as square image cards with white titles and gray descriptions below. "Destaques" shows the 2 featured projects as larger cards side by side. Clicking a filter button switches which cards show and which pill is violet. Hovering a card scales it up slightly with a violet glow. Console shows no errors.

- [ ] **Step 6: Commit**

```bash
git add css/style.css js/render.js js/main.js index.html
git commit -m "feat: wire project grid, filter and spotlight into the dark redesign"
```

---

### Task 3: Particle canvas system

**Files:**
- Create: `js/particles.js`
- Create: `tests/particles.test.js`
- Modify: `index.html` (add script tag)

**Interfaces:**
- Produces: global functions (also `module.exports` under Node, same dual-export pattern as the rest of the codebase) `createParticle(width, height, colors)`, `initParticles(width, height, count, colors)`, `updateParticle(particle, width, height, mouseX, mouseY)`, `drawParticle(context, particle)`. Not consumed by any other file's logic — this is a self-contained visual system. Task 5 will modify the DOM-wiring block at the bottom of this same file (particle count based on viewport width), not the exported functions' signatures.

- [ ] **Step 1: Write the failing tests**

Create `tests/particles.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { createParticle, initParticles, updateParticle, drawParticle } = require('../js/particles.js');

test('createParticle returns a particle within the given bounds using an allowed color', () => {
  const colors = ['#8052ff', '#ffb829'];
  const particle = createParticle(200, 100, colors);
  assert.ok(particle.x >= 0 && particle.x <= 200);
  assert.ok(particle.y >= 0 && particle.y <= 100);
  assert.ok(colors.includes(particle.color));
  assert.ok(particle.size >= 4 && particle.size <= 10);
});

test('initParticles creates exactly count particles', () => {
  const list = initParticles(200, 100, 15, ['#8052ff']);
  assert.equal(list.length, 15);
});

test('updateParticle wraps a particle back into view when it drifts past the left edge', () => {
  const particle = { x: -25, y: 50, size: 5, color: '#8052ff', angle: Math.PI, speed: 0.1, rotation: 0, rotationSpeed: 0 };
  const updated = updateParticle(particle, 200, 100, null, null);
  assert.equal(updated.x, 220);
});

test('updateParticle pushes a particle away from a nearby mouse position', () => {
  const particle = { x: 100, y: 100, size: 5, color: '#8052ff', angle: 0, speed: 0, rotation: 0, rotationSpeed: 0 };
  const before = { x: particle.x, y: particle.y };
  updateParticle(particle, 200, 200, 110, 100);
  assert.ok(particle.x < before.x, 'particle should move away from the mouse on the x axis');
});

test('drawParticle issues the expected canvas drawing calls on the given context', () => {
  const calls = [];
  const fakeContext = {
    save: () => calls.push('save'),
    translate: () => calls.push('translate'),
    rotate: () => calls.push('rotate'),
    beginPath: () => calls.push('beginPath'),
    moveTo: () => calls.push('moveTo'),
    lineTo: () => calls.push('lineTo'),
    closePath: () => calls.push('closePath'),
    stroke: () => calls.push('stroke'),
    restore: () => calls.push('restore'),
    set strokeStyle(value) {},
    set lineWidth(value) {},
  };
  drawParticle(fakeContext, { x: 0, y: 0, size: 5, color: '#8052ff', rotation: 0 });
  assert.deepEqual(calls, ['save', 'translate', 'rotate', 'beginPath', 'moveTo', 'lineTo', 'lineTo', 'closePath', 'stroke', 'restore']);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/particles.test.js`
Expected: FAIL — `Cannot find module '../js/particles.js'`

- [ ] **Step 3: Write `js/particles.js`**

```js
function createParticle(width, height, colors) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: 4 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    angle: Math.random() * Math.PI * 2,
    speed: 0.1 + Math.random() * 0.2,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.01,
  };
}

function initParticles(width, height, count, colors) {
  var list = [];
  for (var i = 0; i < count; i++) {
    list.push(createParticle(width, height, colors));
  }
  return list;
}

function updateParticle(particle, width, height, mouseX, mouseY) {
  particle.x += Math.cos(particle.angle) * particle.speed;
  particle.y += Math.sin(particle.angle) * particle.speed;
  particle.rotation += particle.rotationSpeed;

  if (particle.x < -20) particle.x = width + 20;
  if (particle.x > width + 20) particle.x = -20;
  if (particle.y < -20) particle.y = height + 20;
  if (particle.y > height + 20) particle.y = -20;

  if (mouseX !== null && mouseX !== undefined && mouseY !== null && mouseY !== undefined) {
    var dx = particle.x - mouseX;
    var dy = particle.y - mouseY;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var repelRadius = 120;
    if (distance < repelRadius && distance > 0) {
      var force = (repelRadius - distance) / repelRadius;
      particle.x += (dx / distance) * force * 4;
      particle.y += (dy / distance) * force * 4;
    }
  }

  return particle;
}

function drawParticle(context, particle) {
  context.save();
  context.translate(particle.x, particle.y);
  context.rotate(particle.rotation);
  context.strokeStyle = particle.color;
  context.lineWidth = 1.5;
  context.beginPath();
  context.moveTo(0, -particle.size);
  context.lineTo(particle.size, particle.size);
  context.lineTo(-particle.size, particle.size);
  context.closePath();
  context.stroke();
  context.restore();
  return context;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createParticle, initParticles, updateParticle, drawParticle };
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  (function () {
    var canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var COLORS = ['#8052ff', '#ffb829', '#15846e', '#bdbdbd'];
    var mouse = { x: null, y: null };
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function renderFrame() {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < particles.length; i++) {
        if (!reduceMotion) {
          updateParticle(particles[i], canvas.width, canvas.height, mouse.x, mouse.y);
        }
        drawParticle(ctx, particles[i]);
      }
    }

    function tick() {
      renderFrame();
      if (!reduceMotion) {
        requestAnimationFrame(tick);
      }
    }

    window.addEventListener('resize', function () {
      resize();
      particles = initParticles(canvas.width, canvas.height, reduceMotion ? 40 : 120, COLORS);
    });

    window.addEventListener('mousemove', function (event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    window.addEventListener('mouseleave', function () {
      mouse.x = null;
      mouse.y = null;
    });

    resize();
    particles = initParticles(canvas.width, canvas.height, reduceMotion ? 40 : 120, COLORS);
    renderFrame();
    if (!reduceMotion) {
      requestAnimationFrame(tick);
    }
  })();
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test tests/particles.test.js`
Expected: PASS (5 tests)

- [ ] **Step 5: Modify `index.html`** — insert the particles script between `render.js` and `main.js`. Find:

```html
  <script src="js/render.js"></script>
  <script src="js/main.js"></script>
```

Replace with:

```html
  <script src="js/render.js"></script>
  <script src="js/particles.js"></script>
  <script src="js/main.js"></script>
```

- [ ] **Step 6: Verify in browser**

Open `index.html`. Expected: the black background across the whole page is now painted by the canvas (not just the CSS `background`), and small colored outlined triangles drift slowly across the screen, scattered with no recognizable shape. Moving the mouse near a cluster of triangles gently pushes them away. Resizing the browser window doesn't break the layout or throw console errors. If your OS/browser has "reduce motion" enabled, the triangles should appear as a static frame (no drifting).

- [ ] **Step 7: Commit**

```bash
git add js/particles.js tests/particles.test.js index.html
git commit -m "feat: add interactive particle canvas background"
```

---

### Task 4: GSAP scroll-reveal and filter transition

**Files:**
- Modify: `index.html` (add GSAP CDN script tags)
- Modify: `js/main.js` (full replacement)

**Interfaces:**
- Consumes: global `gsap` / `ScrollTrigger` (from the CDN scripts — only available in a browser; guarded with `if (window.gsap...)` so the site still works if the CDN fails to load).

- [ ] **Step 1: Modify `index.html`** — add the GSAP CDN tags as the first two scripts. Find:

```html
  <script src="js/data.js"></script>
```

Replace with:

```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="js/data.js"></script>
```

- [ ] **Step 2: Replace `js/main.js` in full**

```js
document.addEventListener('DOMContentLoaded', function () {
  var filterEl = document.getElementById('filter');
  var gridEl = document.getElementById('project-grid');
  var spotlightEl = document.getElementById('project-spotlight');

  var categories = ['Todos', 'Landing Pages', 'Branding', 'UI/UX', 'Campanhas', 'Ilustração'];
  var activeCategory = 'Todos';
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderFilter() {
    filterEl.innerHTML = renderFilterBar(categories, activeCategory);
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

    if (window.gsap) {
      gsap.to(gridEl, {
        opacity: 0,
        duration: 0.15,
        onComplete: function () {
          renderGridForCategory();
          gsap.fromTo(
            gridEl.children,
            { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
            {
              opacity: 1,
              y: 0,
              duration: prefersReducedMotion ? 0.2 : 0.4,
              stagger: prefersReducedMotion ? 0 : 0.05,
              ease: 'power2.out',
            }
          );
          gsap.set(gridEl, { opacity: 1 });
        },
      });
    } else {
      renderGridForCategory();
    }
  });

  renderFilter();
  renderGridForCategory();
  spotlightEl.innerHTML = renderSpotlight(PROJECTS.filter(function (project) {
    return project.featured;
  }));

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    var revealTargets = document.querySelectorAll('.section-heading, .body-text, .spotlight-card');
    revealTargets.forEach(function (target) {
      gsap.from(target, {
        opacity: 0,
        y: prefersReducedMotion ? 0 : 40,
        duration: prefersReducedMotion ? 0.3 : 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: target,
          start: 'top 85%',
        },
      });
    });
  }
});
```

- [ ] **Step 3: Verify in browser**

Open `index.html`. Expected: the About headline/paragraph and the two spotlight cards fade in and rise slightly as you scroll them into view (instead of being visible immediately on load). Clicking a category filter fades the grid out briefly, then the new set of cards fades/rises in one after another (staggered), instead of swapping instantly. If GSAP fails to load (e.g. simulate by temporarily breaking the CDN URL), the filter and reveal should still work with no animation and no console errors — check this by verifying the `if (window.gsap...)` guards are present around every GSAP call.

- [ ] **Step 4: Commit**

```bash
git add index.html js/main.js
git commit -m "feat: add GSAP scroll-reveal and filter transition animations"
```

---

### Task 5: Responsive breakpoints

**Files:**
- Modify: `css/style.css` (append media queries)
- Modify: `js/particles.js` (adjust particle count for narrow viewports, inside the existing DOM-wiring block only — do not change the exported function signatures)

**Interfaces:** None new — same exports as Task 3.

- [ ] **Step 1: Append to `css/style.css`**

```css
@media (max-width: 1024px) {
  .hero__headline {
    font-size: 64px;
    letter-spacing: -2px;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .spotlight__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .nav {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-18);
  }

  .nav__links {
    flex-direction: column;
    gap: var(--spacing-12);
  }

  .hero {
    padding: var(--spacing-60) var(--spacing-18);
    min-height: auto;
  }

  .hero__headline {
    font-size: 40px;
    letter-spacing: -1px;
  }

  .about,
  .projects,
  .spotlight,
  .footer {
    padding-left: var(--spacing-18);
    padding-right: var(--spacing-18);
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer__contact {
    text-align: left;
  }
}
```

- [ ] **Step 2: Modify `js/particles.js`** — reduce particle density on narrow viewports. Inside the browser-only block at the bottom of the file, find both occurrences of:

```js
    particles = initParticles(canvas.width, canvas.height, reduceMotion ? 40 : 120, COLORS);
```

Replace each occurrence with a call to a small helper that factors in viewport width. First, add this helper function directly above the `resize` function (still inside the same browser-only IIFE):

```js
    function particleCount() {
      if (reduceMotion) return 40;
      return window.innerWidth < 640 ? 60 : 120;
    }
```

Then replace both occurrences of `initParticles(canvas.width, canvas.height, reduceMotion ? 40 : 120, COLORS)` with:

```js
    particles = initParticles(canvas.width, canvas.height, particleCount(), COLORS);
```

- [ ] **Step 3: Verify responsively in browser**

Open `index.html`, open devtools responsive mode. At 1024px: hero headline shrinks to 64px, grid shows 2 columns, spotlight becomes a single column. At 640px: nav stacks vertically, hero headline shrinks to 40px, grid becomes 1 column, footer stacks left-aligned, and the particle field visibly thins out (fewer triangles) compared to desktop width. No horizontal scrollbar at any width. Run `node --test` to confirm the `particles.test.js` suite is unaffected (the exported functions' behavior didn't change, only how the browser-only block calls them).

- [ ] **Step 4: Commit**

```bash
git add css/style.css js/particles.js
git commit -m "feat: add responsive breakpoints and adaptive particle density"
```

---

### Task 6: Final content pass and README update

**Files:**
- Modify: `README.md`

**Interfaces:** None.

- [ ] **Step 1: Replace `README.md` in full**

```markdown
# Portfólio Raphael Dias

Site estático (HTML/CSS/JS puro, sem build) para o portfólio de Raphael Dias — publicitário/designer no Rio de Janeiro (THNCE Comunicação). Tema dark com fundo de partículas animadas em canvas e scroll-reveal via GSAP.

## Rodar localmente

Abra `index.html` diretamente no navegador, ou sirva a pasta com qualquer servidor estático (ex: `npx serve .` ou `python -m http.server`).

## Rodar os testes de lógica (dados, filtro, render, partículas)

Requer Node.js 18+.

    node --test

## Dependências externas

- Google Fonts (Inter) via `<link>` em `index.html`.
- GSAP 3.12.5 + ScrollTrigger via cdnjs (`<script>` clássico, sem npm/build) — usados para os efeitos de scroll-reveal e a transição do filtro de categorias. O site continua funcional sem eles (os efeitos de animação são condicionados a `if (window.gsap...)`), só perde a animação.

## Conteúdo

Os 12 projetos em `js/data.js` usam título, descrição, categoria, imagem e link reais, extraídos do perfil [behance.net/lucasdiasb](https://www.behance.net/lucasdiasb). As imagens ficam salvas localmente em `assets/projects/`.

- Destaques: no máximo 2 projetos podem ter `featured: true` em `js/data.js`, porque o CSS de destaques (`.spotlight__grid`) foi pensado para 2 cards lado a lado.
- Para adicionar um novo projeto: baixe a imagem de capa para `assets/projects/`, adicione um objeto em `js/data.js` seguindo o formato existente (`id`, `title`, `description`, `category`, `image`, `link`, `featured`) e rode os testes (`node --test`) para confirmar que os invariantes continuam válidos.
- Contato: o e-mail de contato ainda não está no footer — adicione um link (`<a>`) ou texto com o e-mail real dentro do `<p class="footer__contact">` já existente em `index.html` quando tiver a informação (não crie um novo `<p>` aninhado).

## Acessibilidade

- O campo de partículas respeita `prefers-reduced-motion: reduce` (desenha um quadro estático em vez de animar continuamente), e as animações GSAP reduzem a fade simples sem translação/stagger no mesmo caso.
- Os botões de filtro têm `aria-pressed` refletindo o estado ativo, e o container de filtro tem `role="group"`.
```

- [ ] **Step 2: Full manual QA pass in browser**

Open `index.html` and confirm, in order:
1. All 12 real projects render in the grid with their real cover images (not broken image icons) — check the Network tab shows 200s for every `assets/projects/*.png`.
2. Each category filter shows the correct subset of projects (cross-check against `js/data.js`'s `category` fields).
3. Clicking any project card or spotlight card opens the correct individual Behance gallery URL in a new tab (not just the profile).
4. The footer's LinkedIn and Behance links open correctly in a new tab.
5. Tab through the page with the keyboard — every nav link, filter button, the "Ver no Behance"/"Ver Projetos" pills, and every card frame shows a visible focus outline (violet or white) against the black background.
6. Run `node --test` one final time — expect 18 tests passing (4 `data.test.js` + 4 `filter.test.js` + 5 `render.test.js` + 5 `particles.test.js`), pristine output.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: update README for the motion redesign and run final QA pass"
```
