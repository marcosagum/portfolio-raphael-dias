# Portfólio Raphael Dias — Design

## Contexto

Site de portfólio estático para Raphael Dias (perfil Behance: behance.net/lucasdiasb, LinkedIn: lucas-dias-815073147), publicitário/designer no Rio de Janeiro, atualmente na THNCE Comunicação. Atua em landing pages, branding, UI/UX para in-app e campanhas comerciais/eleitorais — projetos conhecidos incluem Kwai, Yamaha e TSE.

O projeto é independente do repositório Meu_robo (que é de automações internas) e vive em pasta própria.

## Referência de estilo

Adaptado do sistema "Little Troop" (galeria monocromática): disciplina de duas cores, radius único de 50px, tipografia funcional condensada + um único momento display em serifa ultra-leve. Os ativos de marca específicos do estúdio original (pinguim mascote, esfera 3D com brilho rosa) **não são reutilizados** — substituídos por um monograma "RD" e uma forma abstrata em CSS puro, para evitar clonar identidade visual de terceiros.

## Tokens visuais

**Cores:** apenas `#000000` (texto, bordas, marca) e `#ffffff` (fundo/canvas). Nenhuma terceira cor, sombra ou gradiente. Imagens de projeto são a única fonte de cor na página.

**Tipografia:**
- Funcional (nav, corpo, legendas, filtros, footer): Barlow Condensed, 400/700, 14–16px, line-height 1.0–1.14
- Display (headline do hero, títulos de seção grandes): Spectral, peso 200–300, ~48–76px (responsivo), tracking apertado (~-0.03 a -0.06em), line-height ~0.85. Reservado para no máximo um momento por seção.

**Forma:** border-radius de 50px em cards, tags e botões — único raio do sistema, sem cantos retos em nenhum elemento.

**Espaçamento:** unidade base 4px; gap de seção ~100px em desktop (reduzido em mobile); padding interno de card 20px; gap entre elementos 20px.

**Superfícies:** página é a única superfície (branca); cards não têm fill próprio além da imagem que carregam — sem sombra, sem elevação.

## Estrutura da página

1. **Nav** — topo, edge-to-edge: "Trabalhos" (esquerda) — "Sobre" — monograma "RD" (centro) — "Contato" (direita). Sem fundo, sem borda, Barlow Condensed 14px preto.
2. **Hero** — headline em Spectral leve apresentando Raphael Dias (nome, função, cidade, empresa atual) ao lado de uma forma abstrata em CSS puro (círculo/blob preto sólido, sem brilho de cor). Sem clonar a esfera 3D do sistema de referência.
3. **Filtro de categorias** — linha de categorias com indicador circular (12px, borda preta, sem fill): Landing Pages, Branding, UI/UX, Campanhas, Ilustração. Sem pills/chips coloridos.
4. **Grid de projetos** — cards de 50px de radius, full-bleed, sem borda/sombra/padding interno na imagem. Título + descrição de uma linha abaixo do card, em Barlow Condensed 14px. Grid de 5 colunas em desktop.
5. **Spotlight de projetos** — 2 cards maiores (~2.5x a área do card de grid) sobrepostos com leve rotação/offset, destacando os projetos mais relevantes (Kwai, Yamaha, TSE).
6. **Footer** — dois blocos fixos nos cantos inferiores: esquerda (bio curta), direita (contato: LinkedIn, Behance). Sem fundo, sem borda.

## Conteúdo e dados

Conteúdo real do Behance (imagens específicas de cada projeto) não foi extraído — o Behance carrega via JS e a análise disponível trouxe apenas metadados gerais (marcas, tipo de trabalho, bio). Estratégia adotada:

- Cards de projeto usam **placeholders visuais** (blocos SVG em preto/branco com o nome do projeto) no lugar da imagem real
- Título e descrição curta usam o que se sabe de cada marca (Kwai, Yamaha, TSE) — descrições genéricas indicando o tipo de trabalho (landing page, branding, campanha)
- Todo card linka para o perfil geral do Behance (behance.net/lucasdiasb) até que links de projetos individuais sejam fornecidos
- Contato no footer usa o LinkedIn público; e-mail/telefone ficam como placeholder `[e-mail]` a preencher depois

## Responsividade

Não especificada no sistema de referência (desktop-only). Adicionado como requisito necessário para um portfólio real:
- Grid de projetos: 5 colunas (desktop) → 2 colunas (tablet, <1024px) → 1 coluna (mobile, <640px)
- Nav: mantém-se em linha única até ~640px, depois empilha (monograma no topo, links abaixo)
- Footer: blocos empilham verticalmente abaixo de 640px
- Hero: forma abstrata reduz de tamanho e headline cai para ~40–48px em mobile

## Estrutura técnica

```
portfolio-raphael-dias/
  index.html
  css/style.css
  js/script.js       # filtro de categorias (mostra/esconde cards por categoria)
  assets/             # placeholders SVG dos projetos
  README.md
```

- HTML/CSS/JS estático, sem build/bundler
- Fontes via Google Fonts (`Barlow Condensed`, `Spectral`)
- Sem framework JS — interatividade do filtro em vanilla JS
- Repositório git próprio, independente do Meu_robo

## Fora de escopo (por ora)

- Extração de conteúdo real de projetos individuais do Behance (JS-rendered, não acessível via fetch simples)
- Deploy/hospedagem (a definir depois: Vercel/Netlify/GitHub Pages são candidatos naturais para HTML estático)
- CMS ou painel de edição de conteúdo
