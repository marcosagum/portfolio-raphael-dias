const test = require('node:test');
const assert = require('node:assert/strict');
const { PROJECTS } = require('../js/data.js');

const VALID_CATEGORIES = ['Landing Pages', 'Branding', 'UI/UX', 'Campanhas', 'Ilustração'];

test('exactly 2 projects are marked featured', () => {
  const featured = PROJECTS.filter(function (project) {
    return project.featured === true;
  });
  assert.equal(featured.length, 2);
});

test('every project category is one of the fixed categories, never "Todos"', () => {
  PROJECTS.forEach(function (project) {
    assert.notEqual(project.category, 'Todos');
    assert.ok(
      VALID_CATEGORIES.includes(project.category),
      'unexpected category: ' + project.category
    );
  });
});

test('every project id is unique', () => {
  const ids = PROJECTS.map(function (project) {
    return project.id;
  });
  const uniqueIds = new Set(ids);
  assert.equal(uniqueIds.size, ids.length);
});

test('every project has a non-empty Behance link', () => {
  PROJECTS.forEach(function (project) {
    assert.ok(typeof project.link === 'string' && project.link.length > 0);
    assert.ok(
      project.link.startsWith('https://www.behance.net/'),
      'unexpected link: ' + project.link
    );
  });
});
