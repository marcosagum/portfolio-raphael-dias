function createBlob(width, height, colors) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 200 + Math.random() * 200,
    color: colors[Math.floor(Math.random() * colors.length)],
    angle: Math.random() * Math.PI * 2,
    speed: 0.15 + Math.random() * 0.15,
    pulseOffset: Math.random() * Math.PI * 2,
  };
}

function initBlobs(width, height, count, colors) {
  var list = [];
  for (var i = 0; i < count; i++) {
    list.push(createBlob(width, height, colors));
  }
  return list;
}

function updateBlob(blob, width, height, mouseX, mouseY, time) {
  blob.x += Math.cos(blob.angle) * blob.speed;
  blob.y += Math.sin(blob.angle) * blob.speed;

  var margin = blob.radius;
  if (blob.x < -margin) blob.x = width + margin;
  if (blob.x > width + margin) blob.x = -margin;
  if (blob.y < -margin) blob.y = height + margin;
  if (blob.y > height + margin) blob.y = -margin;

  if (mouseX !== null && mouseX !== undefined && mouseY !== null && mouseY !== undefined) {
    var dx = mouseX - blob.x;
    var dy = mouseY - blob.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var pullRadius = 400;
    if (distance < pullRadius && distance > 0) {
      var pull = (pullRadius - distance) / pullRadius;
      blob.x += (dx / distance) * pull * 0.6;
      blob.y += (dy / distance) * pull * 0.6;
    }
  }

  return blob;
}

function drawBlob(context, blob, time) {
  var pulse = 1 + Math.sin((time || 0) * 0.0005 + blob.pulseOffset) * 0.08;
  var radius = blob.radius * pulse;

  context.save();
  context.globalCompositeOperation = 'lighter';
  var gradient = context.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, radius);
  gradient.addColorStop(0, blob.color);
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(blob.x, blob.y, radius, 0, Math.PI * 2);
  context.fill();
  context.restore();
  return context;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createBlob, initBlobs, updateBlob, drawBlob };
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  (function () {
    var canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var COLORS = [
      'rgba(128, 82, 255, 0.45)',
      'rgba(255, 184, 41, 0.30)',
      'rgba(21, 132, 110, 0.45)',
      'rgba(189, 189, 189, 0.12)',
    ];
    var mouse = { x: null, y: null };
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var blobs = [];

    function blobCount() {
      if (reduceMotion) return 3;
      return window.innerWidth <= 640 ? 4 : 7;
    }

    function resize() {
      var dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function renderFrame(time) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      for (var i = 0; i < blobs.length; i++) {
        if (!reduceMotion) {
          updateBlob(blobs[i], window.innerWidth, window.innerHeight, mouse.x, mouse.y, time);
        }
        drawBlob(ctx, blobs[i], time);
      }
    }

    function tick(time) {
      renderFrame(time);
      if (!reduceMotion) {
        requestAnimationFrame(tick);
      }
    }

    var resizeTimeout = null;
    window.addEventListener('resize', function () {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        resize();
        var targetCount = blobCount();
        if (blobs.length > targetCount) {
          blobs = blobs.slice(0, targetCount);
        } else if (blobs.length < targetCount) {
          var extra = initBlobs(window.innerWidth, window.innerHeight, targetCount - blobs.length, COLORS);
          blobs = blobs.concat(extra);
        }
        renderFrame(0);
      }, 150);
    });

    window.addEventListener('mousemove', function (event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    document.addEventListener('mouseout', function (event) {
      if (!event.relatedTarget) {
        mouse.x = null;
        mouse.y = null;
      }
    });

    window.addEventListener('touchmove', function (event) {
      if (event.touches && event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', function () {
      mouse.x = null;
      mouse.y = null;
    });

    resize();
    blobs = initBlobs(window.innerWidth, window.innerHeight, blobCount(), COLORS);
    renderFrame(0);
    if (!reduceMotion) {
      requestAnimationFrame(tick);
    }
  })();
}
