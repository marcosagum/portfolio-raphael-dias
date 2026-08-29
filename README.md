# Portfólio Raphael Dias

Site estático (HTML/CSS/JS puro, sem build) para o portfólio de Raphael Dias — publicitário/designer no Rio de Janeiro (THNCE Comunicação).

## Rodar localmente

Abra `index.html` diretamente no navegador, ou sirva a pasta com qualquer servidor estático (ex: `npx serve .`).

## Rodar os testes de lógica (filtro e render)

Requer Node.js 18+.

    node --test

## Substituir conteúdo placeholder

- Imagens: troque `assets/placeholder-pattern.svg` pelas imagens reais de cada projeto em `js/data.js` (campo `image`).
- Links: troque `link` em cada projeto de `js/data.js` pela URL do projeto individual no Behance, quando disponível.
- Destaques: no máximo 2 projetos podem ter `featured: true` em `js/data.js`, porque o CSS só posiciona 2 cards na seção de destaques.
- Contato: o e-mail de contato ainda não está no footer — adicione um link (`<a>`) ou texto com o e-mail real dentro do `<p class="footer__contact">` já existente em `index.html` quando tiver a informação (não crie um novo `<p>` aninhado).
