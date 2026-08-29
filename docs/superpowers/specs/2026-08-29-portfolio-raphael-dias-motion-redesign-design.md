# Portfólio Raphael Dias — Redesign Motion/Dark

## Contexto

O portfólio estático já existe (ver `2026-08-29-portfolio-raphael-dias-design.md`), com dados reais: 12 projetos extraídos de behance.net/lucasdiasb (títulos, descrições, categorias, imagens de capa baixadas localmente em `assets/projects/`, links individuais para cada projeto no Behance). Essa base de dados está correta e não muda.

O que muda é a camada de apresentação: o pedido explícito foi por um portfólio "todo em motion", com um fundo interativo e criativo, que se conecte mais com o trabalho de um publicitário/designer — substituindo a galeria monocromática estática (preto/branco, sem animação) por algo dark, com partículas animadas, scroll-reveal e interações mais ricas.

## Referência de estilo

Adaptado do sistema "Dala" (dark-stage, void preto + acento violeta + partículas triangulares formando uma "constelação"). Reutilizados: paleta de cores (void preto, violeta elétrico, âmbar, verde-petróleo, brancos/cinzas), tipografia (display gigante peso 400 com tracking bem negativo + corpo ultra-light peso 200), radius de 24px/pill, ausência de cards com fundo/sombra, ritmo de seção em duas colunas.

**Não reutilizado** (específico da marca Dala, evitado por ser identidade visual de terceiros): a "constelação-cérebro" (partículas formando uma silhueta de cérebro específica) e o ícone-logo triangular com gradiente violeta→verde. Em vez disso: um campo de partículas *atmosférico* (sem formar uma silhueta reconhecível), e o monograma "RD" já usado no site anterior, restilizado com a nova paleta.

## Tokens visuais

**Cores:**
- `--color-void: #000000` — fundo de toda a página, todas as seções
- `--color-bone-white: #ffffff` — headlines, texto primário
- `--color-ash-gray: #9a9a9a` — nav inativo, labels secundários
- `--color-silver-mist: #bdbdbd` — corpo de texto terciário
- `--color-electric-iris: #8052ff` — botão/link primário, glow de hover, cor de partículas
- `--color-saffron-spark: #ffb829` — labels de destaque, acento pontual, cor de partículas
- `--color-deep-verdant: #15846e` — acento secundário sutil, cor de partículas

**Tipografia:** Inter (substituto de PPNeueMontreal, via Google Fonts)
- Peso 200: corpo de texto, 18px, line-height 1.5
- Peso 400: headlines em escala grande (48px, 78px, 113px), tracking negativo (-1.68px a -4.52px conforme o tamanho)
- Peso 600: nav/labels, 14px uppercase, tracking +0.35px

**Forma:** radius de 24px em cards/nav; pill (9999px) em botões e tags de filtro. Sem bordas, sem sombra, sem fundo em cards — elementos flutuam no preto com espaçamento como única separação.

**Espaçamento:** unidade base 6px; gap de seção 60–120px; largura máxima de conteúdo ~1280px centralizado.

## Visual de assinatura: campo de partículas

Canvas full-bleed (atrás do hero, e em opacidade mais baixa no restante da página como ambientação) com centenas de pequenos triângulos outline (1–2px de traço) nas cores de acento (violeta, âmbar, verde-petróleo, mais tons derivados). Movimento: deriva lenta e contínua (drift), com leve resposta ao movimento do cursor (partículas próximas ao mouse se afastam ou aceleram sutilmente — efeito de repulsão suave, não um seguimento direto). Implementado em Canvas 2D com JavaScript vanilla (`requestAnimationFrame`), sem biblioteca — GSAP não renderiza partículas, então esse componente é código próprio.

Distinção deliberada do sistema de referência: os triângulos não formam uma silhueta reconhecível (nem cérebro, nem qualquer forma figurativa) — ficam dispersos organicamente, para não replicar o gesto de marca específico do Dala.

## Estrutura da página

Mesmas seções semânticas do site atual, redesenhadas:

1. **Nav** — fixa no topo, fundo transparente sobre o void. Monograma "RD" (branco/violeta) à esquerda, links "Trabalhos" / "Sobre" / "Contato" à direita em uppercase 14px (cinza inativo, branco no hover/ativo), e um botão pill violeta ("Ver no Behance", linkando pro perfil) ancorando a borda direita.
2. **Hero** — layout assimétrico de 2 colunas. Esquerda: headline "Raphael Dias" em 113px (responsivo pra menor em telas menores), peso 400, tracking bem negativo; abaixo, uma linha de apoio (função + cidade + empresa) em corpo peso 200; abaixo, o botão pill violeta. Direita (e de fundo, atrás de tudo): o canvas de partículas em opacidade alta.
3. **Sobre** — bloco headline (42px) + corpo (18px peso 200) em duas colunas assimétricas, com label uppercase âmbar acima do corpo (ex: "SOBRE"). Reveal ao rolar (fade + subida) via GSAP ScrollTrigger.
4. **Projetos** — label de seção + filtro de categorias como pills/ghost-links horizontais (Todos, Landing Pages, Branding, UI/UX, Campanhas, Ilustração) — pill violeta preenchida quando ativa, texto cinza quando inativa. Grid de 3 colunas, cards sem borda/fundo — só a imagem com radius de 24px, título e descrição abaixo em branco/cinza. Hover: leve `scale` (1.02–1.03) + glow violeta suave ao redor da imagem. Troca de categoria anima com fade/stagger nos cards (GSAP).
5. **Destaques** — os 2 projetos `featured` recebem um tratamento maior (cards maiores, um ao lado do outro ou levemente sobrepostos), com reveal ao rolar.
6. **Footer** — fundo preto, bio curta à esquerda, links (LinkedIn, Behance) em âmbar/branco à direita, sem borda.

## Motion

- **GSAP + ScrollTrigger** via CDN (`<script>`, sem npm/build): anima headlines e blocos de texto com fade + translateY ao entrarem no viewport; anima os cards de destaque de forma semelhante.
- **Canvas de partículas** (código próprio, vanilla JS): drift contínuo + repulsão sutil no cursor, conforme descrito acima.
- **Hover em cards de projeto:** scale sutil + glow violeta (CSS transition, sem GSAP necessário).
- **Troca de filtro de categoria:** fade-out dos cards atuais → re-render → fade-in em stagger dos novos (GSAP `.to()`/`.from()` em sequência).
- **Scroll suave:** cliques nos links do nav rolam suavemente até a seção (`scroll-behavior: smooth` ou GSAP `ScrollToPlugin`, o que for mais simples de implementar sem dependência extra — usar `scroll-behavior: smooth` em CSS puro é suficiente e evita carregar mais um plugin GSAP).

## Conteúdo e dados

Sem mudanças: os 12 projetos em `js/data.js` (título, descrição, categoria, imagem local em `assets/projects/`, link individual do Behance, `featured`) continuam exatamente como estão. `js/filter.js` (lógica de filtro) também não muda — é lógica pura, independente de apresentação.

## Estrutura técnica

```
portfolio-raphael-dias/
  index.html          # reescrito: nova marcação/classes, canvas do hero, CDN do GSAP
  css/style.css        # reescrito: novo sistema visual (dark/motion)
  js/data.js           # inalterado
  js/filter.js         # inalterado
  js/render.js         # reescrito: nova marcação (classes do novo sistema, mesma assinatura de função)
  js/particles.js       # novo: canvas de partículas, vanilla JS
  js/main.js            # reescrito: wiring + inicialização do canvas + hooks do GSAP ScrollTrigger
  assets/projects/*.png # inalterado
  tests/data.test.js    # inalterado (testa dados, não marcação)
  tests/filter.test.js  # inalterado (testa lógica, não marcação)
  tests/render.test.js  # reescrito: mesmas garantias (título/descrição/categoria/link presentes, escaping, contagem de cards), adaptado às novas classes
  README.md             # atualizado: menciona GSAP via CDN, canvas de partículas
```

- Continua HTML/CSS/JS estático, sem build/bundler
- Único acréscimo de dependência externa: GSAP + ScrollTrigger via CDN (`<script src="https://cdnjs.cloudflare.com/...">`), carregado como `<script>` clássico — não requer npm/build
- Fontes via Google Fonts (Inter, pesos 200/400/600)
- `js/render.js` mantém a mesma interface pública (`renderProjectCard`, `renderGrid`, `renderSpotlight`, `renderFilterBar`) para não quebrar a suíte de testes existente na assinatura — só a marcação HTML interna muda

## Responsividade

Mesma abordagem do site anterior, adaptada aos novos tamanhos de tipografia:
- Hero: headline cai de 113px (desktop) → ~64px (tablet, <1024px) → ~40px (mobile, <640px); canvas de partículas reduz densidade/opacidade em telas menores para não pesar performance em mobile
- Grid de projetos: 3 colunas (desktop) → 2 colunas (<1024px) → 1 coluna (<640px) — mesma progressão do site anterior
- Nav: em mobile (<640px), empilha verticalmente (monograma no topo, links abaixo, botão pill por último) — mesmo padrão de empilhamento do site anterior, sem menu hambúrguer nem JS adicional, só CSS (`flex-direction: column`)

## Performance e acessibilidade

- Canvas de partículas deve respeitar `prefers-reduced-motion: reduce` — quando ativo, o campo de partículas fica estático (sem `requestAnimationFrame` contínuo) e as animações do GSAP ScrollTrigger são desativadas ou reduzidas a fade simples sem translação.
- Manter os já implementados: `aria-pressed` nos filtros, `role="group"` no container de filtro, `:focus-visible` visível (adaptado às novas cores — outline violeta ou branco, nunca invisível sobre o fundo preto).

## Fora de escopo

- Migração para um framework JS ou bundler — continua vanilla JS + GSAP via CDN
- Novo conteúdo/projetos além dos 12 já existentes
- CMS ou painel de edição
