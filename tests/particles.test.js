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
