# Portfólio Raphael Dias — Editorial Motion Redesign (v3)

## Contexto

O site já passou por duas gerações: uma galeria monocromática estática (preto/branco) e depois um redesign dark com fundo de partículas animadas (violeta/âmbar) e GSAP. O pedido agora é uma terceira direção visual, inspirada em dois exemplos que o usuário enviou (capturas de tela de dois portfólios/sites reais de terceiros, descritos via prompts de recriação):

1. Um portfólio editorial minimalista preto/creme, com o nome do designer rolando gigante no fundo ("marquee") e uma imagem sobreposta por cima — usado como referência para a seção Hero.
2. Um landing page de estúdio criativo ("Prisma"), com tipografia grande revelada palavra-a-palavra, texto revelado letra-a-letra ao rolar, e uma grade de cards de "features" — usado como referência para a seção de Sobre + Projetos.

O objetivo declarado: "algo minimalista, onde traga bastante foco para as artes mas que ainda sim seja muito visualmente chamativo (mesmo sendo minimalista)".

**Restrição importante de propriedade intelectual:** os dois prompts de referência continham URLs de assets reais de terceiros — uma foto de retrato de uma pessoa real, vídeos de outro estúdio, e uma fonte "Helvetica Neue ME" servida por um espelho não-licenciado (onlinewebfonts.com). Nenhum desses assets específicos é usado neste redesign. Apenas a **estrutura, o conceito de layout e as animações** dos dois exemplos são adaptados, com conteúdo, imagens e tipografia próprios ou legitimamente licenciados (Google Fonts, fontes de sistema).

## Mudança de stack

O site estático atual (HTML/CSS/JS puro, sem build) é substituído por completo por:

- **Vite + React 18 + TypeScript + Tailwind CSS**
- **framer-motion** para as animações (word pull-up, scroll-linked reveal, entrada de cards)
- **lucide-react** para ícones (seta, check, fechar menu)

Esta é uma reescrita completa do front-end. Os 12 projetos reais (título, descrição, categoria, imagem, link, featured) migram para um módulo de dados TypeScript, sem alteração de conteúdo. A partir desta mudança, editar ou rodar o site localmente exige Node.js/npm (`npm install`, `npm run dev`, `npm run build`) — não é mais possível abrir um arquivo HTML direto no navegador.

O deploy no Vercel já existente (projeto conectado ao repositório GitHub) passa a usar o preset de build "Vite" (build command `npm run build`, diretório de saída `dist`) em vez de servir arquivos estáticos direto da raiz.

## Tipografia

- **Hero:** stack de fontes de sistema `"Helvetica Neue", Helvetica, Arial, sans-serif` — substitui a fonte pirateada do prompt de referência sem alterar significativamente a aparência (é a mesma família tipográfica, servida legitimamente pelo sistema operacional em vez de um espelho não-licenciado).
- **Seção Sobre + Projetos:** **Almarai** (pesos 300/400/700/800) como fonte padrão, e **Instrument Serif** (itálico) como destaque tipográfico pontual em uma frase-chave do texto sobre Raphael — ambas carregadas via Google Fonts, uso livre.

## Paleta de cores

Paleta inteiramente nova, substituindo o violeta/âmbar/preto do redesign anterior:

- `cream`: `#efeee9` (texto primário sobre fundo escuro/foto no Hero)
- `primary` (seção Sobre/Projetos): `#DEDBC8` (creme quente, usado em classes utilitárias Tailwind)
- Texto primário inline na seção Sobre/Projetos: `#E1E0CC` (variação levemente distinta do `primary`, replicando a nuance do exemplo de referência)
- Fundos: `#000000` (preto puro, global), `#101010` (cartão da seção Sobre), `#212121` (cards de projeto)
- Cinzas de apoio: `text-gray-400`, `text-gray-500` (Tailwind padrão)

Sem violeta, sem gradientes decorativos, sem glow — a paleta é inteiramente preto/creme, com os cinzas de apoio do Tailwind para hierarquia terciária.

## Estrutura da página

Página única (`Hero no topo + projetos abaixo`, por decisão do usuário), duas seções principais:

### Seção 1 — Hero (inspirada no exemplo 1)

- `h-[100dvh] w-full overflow-hidden` — uma composição só, sem scroll dentro da própria seção
- Nome "Raphael Dias" rolando infinitamente em texto gigante (`marquee`, duas cópias justapostas, loop contínuo `translateX(0)` → `translateX(-50%)`, ~30s linear)
- Sobreposta ao marquee, a arte de capa do projeto **Kwai × Spider-Man: Brand New Day** (já existente em `assets/projects/kwai-spiderman.png`), como um painel de imagem (não um recorte de silhueta de pessoa, já que não há foto de retrato disponível) posicionado para deixar o texto "vazar" nas bordas
- Header: marca "Raphael Dias" (canto superior esquerdo), ano "2026" (canto superior direito, desktop), nav (Trabalhos, Sobre, Contato) e links sociais (LinkedIn, Behance) — nav responsivo empilhado no mobile, **sem** gaveta lateral animada (simplificação aceita pelo usuário)
- Linha horizontal creme que cresce da esquerda, acima do rodapé
- Rodapé do Hero: bloco esquerdo com "Publicitário", "Designer", "Rio de Janeiro" (três linhas); bloco direito alinhado à direita com uma assinatura curta
- Animações de entrada replicando o exemplo: fade-in do fundo, "rise-in" da imagem (delay), fade-up escalonado da nav/marca/rodapé, linha crescendo com delay — todas com `prefers-reduced-motion` reduzindo a ~0

### Seção 2 — Sobre + Projetos (inspirada no exemplo 2)

- Fundo preto, cartão interno `#101010` para o bloco de Sobre
- Label pequeno "Sobre" acima do headline
- Headline construído com animação de palavras subindo (`WordsPullUp`), misturando texto normal e um trecho em itálico serifado (Instrument Serif) — usa o texto real do "Sobre" já existente, com uma frase de destaque em itálico
- Parágrafo de apoio com revelação letra-a-letra vinculada ao scroll (opacidade de cada caractere de 0.2 a 1 conforme a posição de rolagem), reaproveitando a bio real de Raphael
- Grade de projetos substitui os cards de "features" do exemplo: cada card mostra um projeto real (capa, título, categoria, descrição curta, link "Ver no Behance" com seta rotacionada) sobre fundo `#212121`
- Os 2 projetos `featured` (TSE — Tudo Sobre as Eleições, Kwai — Spider-Man: Brand New Day) recebem cards maiores (`col-span-2` no grid), os outros 10 em cards padrão de uma coluna
- Filtro por categoria mantido (Todos, Landing Pages, Branding, UI/UX, Campanhas, Ilustração), como pills acima da grade
- Entrada dos cards: escala + fade, disparada por `useInView`, com stagger de ~0.15s
- Rodapé final: bio curta + links LinkedIn/Behance, restilizados em preto/creme

## Dados e lógica

Os 12 projetos e a lógica de filtro são portados para módulos TypeScript (`src/data/projects.ts`, `src/lib/filterProjects.ts`), preservando exatamente o conteúdo (títulos, descrições, categorias, imagens, links, `featured`) e o comportamento (filtro por categoria, exatamente 2 `featured`) já validados nas gerações anteriores do site.

## Testes

Mantém-se a filosofia de testar a lógica pura e os dados, sem introduzir uma suíte pesada de testes de componente (Vitest + Testing Library) neste momento — os testes existentes de dados e filtro (que não dependem de DOM/framework) são portados quase inalterados para rodar contra os novos módulos TypeScript via `node --test` (com um passo de transpilação simples, ou reescritos como testes de unidade equivalentes se o formato do módulo mudar). Testes de renderização de componentes React ficam fora do escopo deste redesign.

## Acessibilidade e performance

- `prefers-reduced-motion` respeitado em todas as animações via framer-motion (`useReducedMotion`) e no CSS do marquee
- Contraste creme sobre preto mantém boa legibilidade em todas as seções
- Foco visível (`:focus-visible`) em todos os elementos interativos (nav, filtro, cards, links)

## Fora de escopo

- Gaveta de menu mobile animada (hambúrguer → X, painel lateral) — simplificado para nav responsivo empilhado
- Testes de componente React (Vitest/RTL)
- Novo conteúdo além dos 12 projetos já existentes
- CMS ou painel de edição
