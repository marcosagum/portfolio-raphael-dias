# Portfólio Raphael Dias

Site estático (HTML/CSS/JS puro, sem build) para o portfólio de Raphael Dias — publicitário/designer no Rio de Janeiro (THNCE Comunicação). Tema dark com fundo de partículas animadas em canvas e scroll-reveal via GSAP.

## Rodar localmente

Abra `index.html` diretamente no navegador, ou sirva a pasta com qualquer servidor estático (ex: `npx serve .` ou `python -m http.server`).

## Rodar os testes de lógica (dados, filtro, render, partículas)

Requer Node.js 18+.

    node --test

## Dependências externas

- Google Fonts (Inter) via `<link>` em `index.html`.
- GSAP 3.12.5 + ScrollTrigger via cdnjs (`<script>` clássico, sem npm/build) — usados para os efeitos de scroll-reveal e a transição do filtro de categorias. O site continua funcional sem eles (os efeitos de animação são condicionados a `if (window.gsap...)`), só perde a animação.

## Conteúdo

Os 12 projetos em `js/data.js` usam título, descrição, categoria, imagem e link reais, extraídos do perfil [behance.net/lucasdiasb](https://www.behance.net/lucasdiasb). As imagens ficam salvas localmente em `assets/projects/`.

- Destaques: no máximo 2 projetos podem ter `featured: true` em `js/data.js`, porque o CSS de destaques (`.spotlight__grid`) foi pensado para 2 cards lado a lado.
- Para adicionar um novo projeto: baixe a imagem de capa para `assets/projects/`, adicione um objeto em `js/data.js` seguindo o formato existente (`id`, `title`, `description`, `category`, `image`, `link`, `featured`) e rode os testes (`node --test`) para confirmar que os invariantes continuam válidos.
- Contato: o e-mail de contato ainda não está no footer — adicione um link (`<a>`) ou texto com o e-mail real dentro do `<p class="footer__contact">` já existente em `index.html` quando tiver a informação (não crie um novo `<p>` aninhado).

## Acessibilidade

- O campo de partículas respeita `prefers-reduced-motion: reduce` (desenha um quadro estático em vez de animar continuamente), e as animações GSAP reduzem a fade simples sem translação/stagger no mesmo caso.
- Os botões de filtro têm `aria-pressed` refletindo o estado ativo, e o container de filtro tem `role="group"`.
