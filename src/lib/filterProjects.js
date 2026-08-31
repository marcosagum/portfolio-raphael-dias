/**
 * @param {import('../data/projects.js').Project[]} projects
 * @param {string} category
 * @returns {import('../data/projects.js').Project[]}
 */
export function filterProjects(projects, category) {
  if (!category || category === 'Todos') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}
