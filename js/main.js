document.addEventListener('DOMContentLoaded', function () {
  var filterEl = document.getElementById('filter');
  var gridEl = document.getElementById('project-grid');
  var spotlightEl = document.getElementById('project-spotlight');

  var categories = ['Todos', 'Landing Pages', 'Branding', 'UI/UX', 'Campanhas', 'Ilustração'];
  var activeCategory = 'Todos';

  function renderFilter() {
    filterEl.innerHTML = categories.map(function (category) {
      var activeClass = category === activeCategory ? ' filter__item--active' : '';
      return (
        '<button class="filter__item' + activeClass + '" data-category="' + category + '" type="button">' +
          '<span class="filter__dot"></span>' + category +
        '</button>'
      );
    }).join('');
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
    renderGridForCategory();
  });

  renderFilter();
  renderGridForCategory();
  spotlightEl.innerHTML = renderSpotlight(PROJECTS.filter(function (project) {
    return project.featured;
  }));
});
