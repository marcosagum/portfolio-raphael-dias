const test = require('node:test');
const assert = require('node:assert/strict');
const { createBlob, initBlobs, updateBlob, drawBlob } = require('../js/particles.js');

test('createBlob returns a blob within the given bounds using an allowed color', () => {
  const colors = ['rgba(128, 82, 255, 0.45)', 'rgba(255, 184, 41, 0.3)'];
  const blob = createBlob(800, 600, colors);
  assert.ok(blob.x >= 0 && blob.x <= 800);
  assert.ok(blob.y >= 0 && blob.y <= 600);
  assert.ok(colors.includes(blob.color));
  assert.ok(blob.radius >= 200 && blob.radius <= 400);
});

test('initBlobs creates exactly count blobs', () => {
  const list = initBlobs(800, 600, 5, ['rgba(128, 82, 255, 0.45)']);
  assert.equal(list.length, 5);
});

test('updateBlob wraps a blob back into view when it drifts past the left edge', () => {
  const blob = { x: -350, y: 300, radius: 300, color: 'rgba(128, 82, 255, 0.45)', angle: Math.PI, speed: 0.2, pulseOffset: 0 };
  const updated = updateBlob(blob, 800, 600, null, null, 0);
  assert.equal(updated.x, 1100);
});

test('updateBlob pulls a blob toward a nearby mouse position', () => {
  const blob = { x: 400, y: 300, radius: 250, color: 'rgba(128, 82, 255, 0.45)', angle: 0, speed: 0, pulseOffset: 0 };
  const before = { x: blob.x, y: blob.y };
  updateBlob(blob, 800, 600, 500, 300, 0);
  assert.ok(blob.x > before.x, 'blob should move toward the mouse on the x axis');
});

test('drawBlob issues the expected canvas drawing calls on the given context', () => {
  const calls = [];
  const fakeGradient = { addColorStop: () => calls.push('addColorStop') };
  const fakeContext = {
    save: () => calls.push('save'),
    createRadialGradient: () => {
      calls.push('createRadialGradient');
      return fakeGradient;
    },
    beginPath: () => calls.push('beginPath'),
    arc: () => calls.push('arc'),
    fill: () => calls.push('fill'),
    restore: () => calls.push('restore'),
    set fillStyle(value) {},
    set globalCompositeOperation(value) {},
  };
  drawBlob(fakeContext, { x: 400, y: 300, radius: 250, color: 'rgba(128, 82, 255, 0.45)', pulseOffset: 0 }, 0);
  assert.deepEqual(calls, ['save', 'createRadialGradient', 'addColorStop', 'addColorStop', 'beginPath', 'arc', 'fill', 'restore']);
});
