function filterProjects(projects, category) {
  if (!category || category === 'Todos') {
    return projects;
  }
  return projects.filter(function (project) {
    return project.category === category;
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { filterProjects };
}
