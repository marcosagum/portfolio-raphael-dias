document.addEventListener('DOMContentLoaded', function () {
  var filterEl = document.getElementById('filter');
  var gridEl = document.getElementById('project-grid');
  var spotlightEl = document.getElementById('project-spotlight');

  var categories = ['Todos', 'Landing Pages', 'Branding', 'UI/UX', 'Campanhas', 'Ilustração'];
  var activeCategory = 'Todos';
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderFilter() {
    filterEl.innerHTML = renderFilterBar(categories, activeCategory);
  }

  function renderGridForCategory() {
    var visible = filterProjects(PROJECTS, activeCategory);
    gridEl.innerHTML = renderGrid(visible);
  }

  filterEl.addEventListener('click', function (event) {
    var button = event.target.closest('.filter__item');
    if (!button) return;
    activeCategory = button.getAttribute('data-category');
    renderFilter();

    if (window.gsap) {
      gsap.to(gridEl, {
        opacity: 0,
        duration: 0.15,
        overwrite: true,
        onComplete: function () {
          renderGridForCategory();
          if (window.ScrollTrigger) {
            ScrollTrigger.refresh();
          }
          gsap.fromTo(
            gridEl.children,
            { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
            {
              opacity: 1,
              y: 0,
              duration: prefersReducedMotion ? 0.2 : 0.4,
              stagger: prefersReducedMotion ? 0 : 0.05,
              ease: 'power2.out',
            }
          );
          gsap.set(gridEl, { opacity: 1 });
        },
      });
    } else {
      renderGridForCategory();
    }
  });

  renderFilter();
  renderGridForCategory();
  spotlightEl.innerHTML = renderSpotlight(PROJECTS.filter(function (project) {
    return project.featured;
  }));

  if (window.gsap) {
    gsap.from(['.hero__headline', '.hero__subline', '.hero .button-pill'], {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 30,
      duration: prefersReducedMotion ? 0.3 : 0.9,
      stagger: prefersReducedMotion ? 0 : 0.15,
      ease: 'power2.out',
    });
  }

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    var revealTargets = document.querySelectorAll('.section-heading, .body-text, .spotlight-card, .card');
    revealTargets.forEach(function (target) {
      gsap.from(target, {
        opacity: 0,
        y: prefersReducedMotion ? 0 : 40,
        duration: prefersReducedMotion ? 0.3 : 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: target,
          start: 'top 85%',
        },
      });
    });
  }
});
