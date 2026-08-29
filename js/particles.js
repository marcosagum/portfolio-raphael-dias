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
