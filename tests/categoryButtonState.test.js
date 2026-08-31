import test from 'node:test';
import assert from 'node:assert/strict';
import { getCategoryButtonState } from '../src/lib/categoryButtonState.js';

test('marks the matching category as active', () => {
  const state = getCategoryButtonState('Branding', 'Branding');
  assert.equal(state.isActive, true);
  assert.equal(state.className, 'border-primary bg-primary text-black');
});

test('marks a non-matching category as inactive', () => {
  const state = getCategoryButtonState('Todos', 'Branding');
  assert.equal(state.isActive, false);
  assert.equal(state.className, 'border-gray-600 text-gray-400 hover:border-primary hover:text-primary');
});

test('every category in a list produces exactly one active state when one matches', () => {
  const categories = ['Todos', 'Branding', 'UI/UX'];
  const states = categories.map((category) => getCategoryButtonState(category, 'UI/UX'));
  const activeCount = states.filter((state) => state.isActive).length;
  assert.equal(activeCount, 1);
  assert.equal(states[2].isActive, true);
});
