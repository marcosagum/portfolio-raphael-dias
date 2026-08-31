export function filterProjects(projects, category) {
  if (!category || category === 'Todos') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}
