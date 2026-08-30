function createParticle(width, height, colors) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 2 + Math.random() * 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    angle: Math.random() * Math.PI * 2,
    speed: 0.4 + Math.random() * 0.8,
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

  var margin = particle.radius + 10;
  if (particle.x < -margin) particle.x = width + margin;
  if (particle.x > width + margin) particle.x = -margin;
  if (particle.y < -margin) particle.y = height + margin;
  if (particle.y > height + margin) particle.y = -margin;

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
  context.fillStyle = particle.color;
  context.beginPath();
  context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
  context.fill();
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

    function particleCount() {
      if (reduceMotion) return 40;
      return window.innerWidth <= 640 ? 80 : 150;
    }

    function resize() {
      var dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function renderFrame() {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      for (var i = 0; i < particles.length; i++) {
        if (!reduceMotion) {
          updateParticle(particles[i], window.innerWidth, window.innerHeight, mouse.x, mouse.y);
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

    var resizeTimeout = null;
    window.addEventListener('resize', function () {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        resize();
        var targetCount = particleCount();
        if (particles.length > targetCount) {
          particles = particles.slice(0, targetCount);
        } else if (particles.length < targetCount) {
          var extra = initParticles(window.innerWidth, window.innerHeight, targetCount - particles.length, COLORS);
          particles = particles.concat(extra);
        }
        renderFrame();
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
    particles = initParticles(window.innerWidth, window.innerHeight, particleCount(), COLORS);
    renderFrame();
    if (!reduceMotion) {
      requestAnimationFrame(tick);
    }
  })();
}
