const test = require('node:test');
const assert = require('node:assert/strict');
const { renderProjectCard, renderGrid, renderSpotlight, renderFilterBar } = require('../js/render.js');

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

test('renderProjectCard escapes HTML-sensitive characters in project fields', () => {
  const unsafeProject = Object.assign({}, sampleProject, {
    title: 'Foo & "Bar"',
  });
  const html = renderProjectCard(unsafeProject);
  assert.doesNotMatch(html, /alt="Foo & "Bar"/);
  assert.match(html, /alt="Foo &amp; &quot;Bar&quot;"/);
});

test('renderFilterBar marks the active category and reflects aria-pressed', () => {
  const html = renderFilterBar(['Todos', 'Branding'], 'Branding');
  assert.match(html, /class="filter__item filter__item--active" data-category="Branding" type="button" aria-pressed="true"/);
  assert.match(html, /class="filter__item" data-category="Todos" type="button" aria-pressed="false"/);
  assert.doesNotMatch(html, /filter__item--active" data-category="Todos"/);
});
