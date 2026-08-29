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
