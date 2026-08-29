function renderProjectCard(project) {
  return (
    '<article class="card" data-category="' + project.category + '">' +
      '<a class="card__frame" href="' + project.link + '" target="_blank" rel="noopener">' +
        '<img class="card__image" src="' + project.image + '" alt="' + project.title + '">' +
      '</a>' +
      '<h3 class="card__title">' + project.title + '</h3>' +
      '<p class="card__description">' + project.description + '</p>' +
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
        '<a class="spotlight-card__frame" href="' + project.link + '" target="_blank" rel="noopener">' +
          '<img class="spotlight-card__image" src="' + project.image + '" alt="' + project.title + '">' +
        '</a>' +
        '<h3 class="spotlight-card__title">' + project.title + '</h3>' +
      '</article>'
    );
  }).join('');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderProjectCard, renderGrid, renderSpotlight };
}
