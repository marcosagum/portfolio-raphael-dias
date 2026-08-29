# Portfólio Raphael Dias

Site estático (HTML/CSS/JS puro, sem build) para o portfólio de Raphael Dias — publicitário/designer no Rio de Janeiro (THNCE Comunicação).

## Rodar localmente

Abra `index.html` diretamente no navegador, ou sirva a pasta com qualquer servidor estático (ex: `npx serve .`).

## Rodar os testes de lógica (filtro e render)

Requer Node.js 18+.

    node --test

## Conteúdo

Os 12 projetos em `js/data.js` usam título, descrição, categoria, imagem e link reais, extraídos do perfil [behance.net/lucasdiasb](https://www.behance.net/lucasdiasb). As imagens ficam salvas localmente em `assets/projects/` (baixadas do CDN do Behance) para o site não depender da disponibilidade externa.

- Destaques: no máximo 2 projetos podem ter `featured: true` em `js/data.js`, porque o CSS só posiciona 2 cards na seção de destaques.
- Para adicionar um novo projeto: baixe a imagem de capa para `assets/projects/`, adicione um objeto em `js/data.js` seguindo o formato existente (`id`, `title`, `description`, `category`, `image`, `link`, `featured`) e rode os testes (`node --test`) para confirmar que os invariantes (categoria válida, `id` único, `featured` ≤ 2) continuam válidos.
- Contato: o e-mail de contato ainda não está no footer — adicione um link (`<a>`) ou texto com o e-mail real dentro do `<p class="footer__contact">` já existente em `index.html` quando tiver a informação (não crie um novo `<p>` aninhado).
