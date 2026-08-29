const PROJECTS = [
  {
    id: 'seed-1',
    title: 'Projeto Exemplo 1',
    description: 'Descrição temporária — substituída no Task 6.',
    category: 'Branding',
    image: 'assets/placeholder-pattern.svg',
    link: 'https://www.behance.net/lucasdiasb',
    featured: true,
  },
  {
    id: 'seed-2',
    title: 'Projeto Exemplo 2',
    description: 'Descrição temporária — substituída no Task 6.',
    category: 'UI/UX',
    image: 'assets/placeholder-pattern.svg',
    link: 'https://www.behance.net/lucasdiasb',
    featured: false,
  },
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS };
}
