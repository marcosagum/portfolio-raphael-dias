# Portfólio Raphael Dias

Portfólio de Raphael Dias — publicitário/designer no Rio de Janeiro (THNCE Comunicação). Vite + React + TypeScript + Tailwind CSS + framer-motion. Hero editorial preto/creme com o nome rolando em destaque, seguido de uma seção Sobre + Projetos com revelação de texto animada.

## Rodar localmente

Requer Node.js 18+.

    npm install
    npm run dev

Abre em `http://localhost:5173` (ou a porta que o Vite indicar).

## Build de produção

    npm run build
    npm run preview

## Checagem de tipos

    npm run typecheck

## Rodar os testes de lógica (dados e filtro)

    npm test

## Conteúdo

Os 12 projetos em `src/data/projects.js` usam título, descrição, categoria, imagem e link reais, extraídos do perfil [behance.net/lucasdiasb](https://www.behance.net/lucasdiasb). As imagens ficam em `public/projects/` (servidas na raiz pelo Vite, ex: `/projects/kwai-spiderman.png`).

- Destaques: no máximo 2 projetos podem ter `featured: true` em `src/data/projects.js` — eles ganham um card maior (`sm:col-span-2`) na grade.
- Para adicionar um novo projeto: coloque a imagem de capa em `public/projects/`, adicione um objeto em `src/data/projects.js` seguindo o formato existente (`id`, `title`, `description`, `category`, `image`, `link`, `featured`) e rode os testes (`npm test`) para confirmar que os invariantes continuam válidos.
- A imagem de destaque do Hero (`src/components/Hero.tsx`) usa `/projects/kwai-spiderman.png` — troque o caminho ali se quiser destacar outra arte.
- Contato: os links de LinkedIn e Behance ficam no rodapé da seção Sobre + Projetos (`src/components/AboutProjects.tsx`).

## Deploy

O projeto está conectado ao Vercel (framework Vite detectado automaticamente a partir do `package.json`). Todo `git push` para `master` gera um novo deploy de produção automaticamente.
