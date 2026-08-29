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
