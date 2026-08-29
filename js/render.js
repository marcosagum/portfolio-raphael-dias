var HTML_ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (char) {
    return HTML_ESCAPE_MAP[char];
  });
}

function renderProjectCard(project) {
  return (
    '<article class="card" data-category="' + escapeHtml(project.category) + '">' +
      '<a class="card__frame" href="' + escapeHtml(project.link) + '" target="_blank" rel="noopener">' +
        '<img class="card__image" src="' + escapeHtml(project.image) + '" alt="' + escapeHtml(project.title) + '">' +
      '</a>' +
      '<h3 class="card__title">' + escapeHtml(project.title) + '</h3>' +
      '<p class="card__description">' + escapeHtml(project.description) + '</p>' +
    '</article>'
  );
}

function renderGrid(projects) {
  return projects.map(renderProjectCard).join('');
}

function renderSpotlight(projects) {
  return projects.map(function (project, index) {
    return (
      '<article class="spotlight-card spotlight-card--' + (index + 1) + '">' +
        '<a class="spotlight-card__frame" href="' + escapeHtml(project.link) + '" target="_blank" rel="noopener">' +
          '<img class="spotlight-card__image" src="' + escapeHtml(project.image) + '" alt="' + escapeHtml(project.title) + '">' +
        '</a>' +
        '<h3 class="spotlight-card__title">' + escapeHtml(project.title) + '</h3>' +
      '</article>'
    );
  }).join('');
}

function renderFilterBar(categories, activeCategory) {
  return categories.map(function (category) {
    var isActive = category === activeCategory;
    var activeClass = isActive ? ' filter__item--active' : '';
    return (
      '<button class="filter__item' + activeClass + '" data-category="' + escapeHtml(category) + '" type="button" aria-pressed="' + (isActive ? 'true' : 'false') + '">' +
        '<span class="filter__dot"></span>' + escapeHtml(category) +
      '</button>'
    );
  }).join('');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderProjectCard, renderGrid, renderSpotlight, renderFilterBar };
}
