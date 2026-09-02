/**
 * @typedef {Object} LocalizedText
 * @property {string} pt
 * @property {string} en
 * @property {string} es
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {LocalizedText} title
 * @property {LocalizedText} description
 * @property {string} category
 * @property {string} image
 * @property {string} link
 * @property {boolean} featured
 */

/** @type {Project[]} */
export const PROJECTS = [
  {
    id: 'wc2026-nao-transmissao',
    title: {
      pt: 'Copa do Mundo 2026 — A Não Transmissão Oficial',
      en: '2026 World Cup — The Unofficial Non-Broadcast',
      es: 'Mundial 2026 — La No Transmisión Oficial',
    },
    description: {
      pt: 'Conteúdo de social media e assets in-app para uma campanha ligada à Copa do Mundo 2026.',
      en: 'Social media content and in-app assets for a campaign tied to the 2026 World Cup.',
      es: 'Contenido de redes sociales y assets in-app para una campaña vinculada al Mundial 2026.',
    },
    category: 'Campanhas',
    image: '/projects/wc2026-nao-transmissao.png',
    link: 'https://www.behance.net/gallery/254376499/WC-2026-A-NAO-TRANSMISSAO-OFICIAL',
    featured: false,
  },
  {
    id: 'tse-tudo-sobre-eleicoes',
    title: {
      pt: 'TSE — Tudo Sobre as Eleições',
      en: 'TSE — Everything About the Elections',
      es: 'TSE — Todo Sobre las Elecciones',
    },
    description: {
      pt: 'Conteúdo educativo em campanha sobre o processo eleitoral para o TSE.',
      en: "Educational campaign content about the electoral process for Brazil's Superior Electoral Court (TSE).",
      es: 'Contenido educativo de campaña sobre el proceso electoral para el TSE (Tribunal Superior Electoral de Brasil).',
    },
    category: 'Campanhas',
    image: '/projects/tse-tudo-sobre-eleicoes.png',
    link: 'https://www.behance.net/gallery/254376415/TUDO-SOBRE-AS-ELEICOES-TSE',
    featured: true,
  },
  {
    id: 'kwai-eleicoes-2026',
    title: {
      pt: 'Kwai — Eleições 2026',
      en: 'Kwai — 2026 Elections',
      es: 'Kwai — Elecciones 2026',
    },
    description: {
      pt: 'Campanha sobre as Eleições 2026 dentro do aplicativo Kwai.',
      en: 'In-app campaign about the 2026 elections for Kwai.',
      es: 'Campaña in-app sobre las Elecciones 2026 para Kwai.',
    },
    category: 'Campanhas',
    image: '/projects/kwai-eleicoes-2026.png',
    link: 'https://www.behance.net/gallery/254376261/ELEICOES-2026-KWAI',
    featured: false,
  },
  {
    id: 'kwai-spiderman',
    title: {
      pt: 'Kwai — Spider-Man: Brand New Day',
      en: 'Kwai — Spider-Man: Brand New Day',
      es: 'Kwai — Spider-Man: Brand New Day',
    },
    description: {
      pt: 'Banners in-app para campanha promocional do filme Homem-Aranha em parceria com o Kwai.',
      en: 'In-app banners for a promotional campaign for the Spider-Man film in partnership with Kwai.',
      es: 'Banners in-app para la campaña promocional de la película de Spider-Man en asociación con Kwai.',
    },
    category: 'Campanhas',
    image: '/projects/kwai-spiderman.png',
    link: 'https://www.behance.net/gallery/254375817/SPIDER-MAN-BRAND-NEW-DAY-X-KWAI',
    featured: true,
  },
  {
    id: 'kwai-in-app-activities',
    title: {
      pt: 'Kwai — Atividades In-App',
      en: 'Kwai — In-App Activities',
      es: 'Kwai — Actividades In-App',
    },
    description: {
      pt: 'Design gráfico e identidade visual para atividades dentro do aplicativo Kwai.',
      en: 'Graphic design and visual identity for activities inside the Kwai app.',
      es: 'Diseño gráfico e identidad visual para actividades dentro de la app Kwai.',
    },
    category: 'UI/UX',
    image: '/projects/kwai-in-app-activities.png',
    link: 'https://www.behance.net/gallery/249837793/IN-APP-ACTIVITIES-KWAI',
    featured: false,
  },
  {
    id: 'kwai-casa-do-kwai-branding',
    title: {
      pt: 'Kwai — Casa do Kwai (Branding de Reality Show)',
      en: 'Kwai — Casa do Kwai (Reality Show Branding)',
      es: 'Kwai — Casa do Kwai (Branding de Reality Show)',
    },
    description: {
      pt: 'Branding e identidade visual para o reality show Casa do Kwai.',
      en: 'Branding and visual identity for the Casa do Kwai reality show.',
      es: 'Branding e identidad visual para el reality show Casa do Kwai.',
    },
    category: 'Branding',
    image: '/projects/kwai-casa-do-kwai-branding.png',
    link: 'https://www.behance.net/gallery/249837553/CASA-DO-KWAI-REALITY-SHOW-BRANDING',
    featured: false,
  },
  {
    id: 'kwai-zico-landing-page',
    title: {
      pt: 'Kwai × Downtown Filmes — Zico (Landing Page)',
      en: 'Kwai × Downtown Filmes — Zico (Landing Page)',
      es: 'Kwai × Downtown Filmes — Zico (Landing Page)',
    },
    description: {
      pt: 'Landing page de campanha para o documentário Zico, parceria Kwai e Downtown Filmes.',
      en: 'Campaign landing page for the Zico documentary, a partnership between Kwai and Downtown Filmes.',
      es: 'Landing page de campaña para el documental Zico, en alianza entre Kwai y Downtown Filmes.',
    },
    category: 'Landing Pages',
    image: '/projects/kwai-zico-landing-page.png',
    link: 'https://www.behance.net/gallery/249836529/ZICO-LANDING-PAGE-KWAI-X-DOWNTOWN-FILMES',
    featured: false,
  },
  {
    id: 'kwai-tse-titulo-em-dia',
    title: {
      pt: 'Kwai × TSE — Título em Dia (Landing Page)',
      en: 'Kwai × TSE — Título em Dia (Landing Page)',
      es: 'Kwai × TSE — Título em Dia (Landing Page)',
    },
    description: {
      pt: 'Landing page da campanha Título em Dia, parceria entre Kwai e TSE.',
      en: 'Landing page for the "Título em Dia" voter-registration campaign, a partnership between Kwai and TSE.',
      es: 'Landing page de la campaña "Título em Dia" (registro electoral al día), alianza entre Kwai y el TSE.',
    },
    category: 'Landing Pages',
    image: '/projects/kwai-tse-titulo-em-dia.png',
    link: 'https://www.behance.net/gallery/249836269/LANDING-PAGE-TITULO-EM-DIA-KWAI-X-TSE',
    featured: false,
  },
  {
    id: 'kwai-adorocinema-filme-premiado',
    title: {
      pt: 'Kwai × AdoroCinema — Filme Premiado',
      en: 'Kwai × AdoroCinema — Award-Winning Film',
      es: 'Kwai × AdoroCinema — Película Premiada',
    },
    description: {
      pt: 'Campanha Filme Premiado com branding e posts para redes sociais, parceria Kwai e AdoroCinema.',
      en: '"Filme Premiado" campaign with branding and social media posts, a partnership between Kwai and AdoroCinema.',
      es: 'Campaña "Filme Premiado" con branding y posts para redes sociales, alianza entre Kwai y AdoroCinema.',
    },
    category: 'Campanhas',
    image: '/projects/kwai-adorocinema-filme-premiado.png',
    link: 'https://www.behance.net/gallery/249836041/FILME-PREMIADO-KWAI-x-ADOROCINEMA',
    featured: false,
  },
  {
    id: 'salve-guanabara',
    title: {
      pt: 'Salve Guanabara',
      en: 'Salve Guanabara',
      es: 'Salve Guanabara',
    },
    description: {
      pt: 'Identidade visual ilustrada do projeto Salve Guanabara.',
      en: 'Illustrated visual identity for the Salve Guanabara project.',
      es: 'Identidad visual ilustrada del proyecto Salve Guanabara.',
    },
    category: 'Ilustração',
    image: '/projects/salve-guanabara.png',
    link: 'https://www.behance.net/gallery/239198943/Salve-Guanabara',
    featured: false,
  },
  {
    id: 'yamaha-black-friday',
    title: {
      pt: 'Yamaha — Black Friday',
      en: 'Yamaha — Black Friday',
      es: 'Yamaha — Black Friday',
    },
    description: {
      pt: 'Campanha de Black Friday para a Yamaha, com motion design e peças para redes sociais.',
      en: 'Black Friday campaign for Yamaha, with motion design and social media assets.',
      es: 'Campaña de Black Friday para Yamaha, con motion design y piezas para redes sociales.',
    },
    category: 'Campanhas',
    image: '/projects/yamaha-black-friday.png',
    link: 'https://www.behance.net/gallery/238898687/BLACK-FRIDAY-YAMAHA',
    featured: false,
  },
  {
    id: 'isso-nao-e-uma-festa',
    title: {
      pt: 'Isso Não É Uma Festa',
      en: 'This Is Not a Party',
      es: 'Esto No Es Una Fiesta',
    },
    description: {
      pt: 'Peça de design para social media com conceito autoral.',
      en: 'Social media design piece with an original creative concept.',
      es: 'Pieza de diseño para redes sociales con concepto autoral.',
    },
    category: 'Ilustração',
    image: '/projects/isso-nao-e-uma-festa.png',
    link: 'https://www.behance.net/gallery/237261799/ISSO-NAO-E-UMA-FESTA',
    featured: false,
  },
  {
    id: 'a-brasileira',
    title: {
      pt: 'À Brasileira',
      en: 'À Brasileira',
      es: 'À Brasileira',
    },
    description: {
      pt: 'Peça tipográfica autoral inspirada na fauna e na cultura brasileira, com letreiro em padronagem de onça.',
      en: 'Original typographic piece inspired by Brazilian wildlife and culture, with lettering set in a jaguar-print pattern.',
      es: 'Pieza tipográfica autoral inspirada en la fauna y la cultura brasileña, con letras en estampado de jaguar.',
    },
    category: 'Ilustração',
    image: '/projects/a-brasileira.png',
    link: 'https://www.behance.net/gallery/235211147/A-BRASILEIRA',
    featured: false,
  },
  {
    id: 'social-media-ss',
    title: {
      pt: 'Social Media — SS',
      en: 'Social Media — SS',
      es: 'Social Media — SS',
    },
    description: {
      pt: 'Arte de social media para marca de bebidas, com direção de arte inspirada na mitologia greco-romana.',
      en: 'Social media artwork for a beverage brand, art directed with inspiration from Greco-Roman mythology.',
      es: 'Arte de redes sociales para una marca de bebidas, con dirección de arte inspirada en la mitología grecorromana.',
    },
    category: 'Campanhas',
    image: '/projects/social-media-ss.png',
    link: 'https://www.behance.net/gallery/235210601/SOCIAL-MEDIA-SS',
    featured: false,
  },
  {
    id: 'kv-autodeclaracao-pcd-nio',
    title: {
      pt: 'KV — Campanha de Autodeclaração PCD (Nio)',
      en: 'KV — PCD Self-Declaration Campaign (Nio)',
      es: 'KV — Campaña de Autodeclaración PCD (Nio)',
    },
    description: {
      pt: 'Key visual da campanha de autodeclaração de pessoas com deficiência (PCD) para a Nio.',
      en: "Key visual for Nio's self-declaration campaign for people with disabilities (PCD).",
      es: 'Key visual de la campaña de autodeclaración de personas con discapacidad (PCD) para Nio.',
    },
    category: 'Campanhas',
    image: '/projects/kv-autodeclaracao-pcd-nio.png',
    link: 'https://www.behance.net/gallery/230588481/KV-CAMPANHA-DE-AUTODECLARACAO-PCD-(NIO)',
    featured: false,
  },
  {
    id: 'brandbook-interno-vtal',
    title: {
      pt: 'Brandbook Interno — V.tal',
      en: 'Internal Brandbook — V.tal',
      es: 'Brandbook Interno — V.tal',
    },
    description: {
      pt: 'Manual de marca para comunicação interna da V.tal, reforçando a evolução da identidade corporativa.',
      en: "Brand guidelines for V.tal's internal communications, reinforcing the evolution of its corporate identity.",
      es: 'Manual de marca para la comunicación interna de V.tal, reforzando la evolución de su identidad corporativa.',
    },
    category: 'Branding',
    image: '/projects/brandbook-interno-vtal.png',
    link: 'https://www.behance.net/gallery/230589901/Brandbook-Interno-Vtal',
    featured: false,
  },
  {
    id: 'brandbook-interno-nio',
    title: {
      pt: 'Brandbook Interno — Nio',
      en: 'Internal Brandbook — Nio',
      es: 'Brandbook Interno — Nio',
    },
    description: {
      pt: 'Manual de marca interno com diretrizes de identidade visual para a Nio.',
      en: 'Internal brand manual with visual identity guidelines for Nio.',
      es: 'Manual de marca interno con lineamientos de identidad visual para Nio.',
    },
    category: 'Branding',
    image: '/projects/brandbook-interno-nio.png',
    link: 'https://www.behance.net/gallery/230590665/BRANDBOOK-INTERNO-NIO',
    featured: false,
  },
  {
    id: 'kv-autodeclaracao-pcd',
    title: {
      pt: 'KV — Campanha de Autodeclaração PCD',
      en: 'KV — PCD Self-Declaration Campaign',
      es: 'KV — Campaña de Autodeclaración PCD',
    },
    description: {
      pt: 'Key visual ilustrado para campanha de incentivo à autodeclaração de pessoas com deficiência (PCD).',
      en: 'Illustrated key visual for a campaign encouraging self-declaration among people with disabilities (PCD).',
      es: 'Key visual ilustrado para una campaña de incentivo a la autodeclaración de personas con discapacidad (PCD).',
    },
    category: 'Campanhas',
    image: '/projects/kv-autodeclaracao-pcd.png',
    link: 'https://www.behance.net/gallery/230588011/KV-CAMPANHA-DE-AUTODECLARACAO-PCD',
    featured: false,
  },
  {
    id: 'kv-semana-do-meio-ambiente',
    title: {
      pt: 'KV — Semana do Meio Ambiente',
      en: 'KV — Environment Week',
      es: 'KV — Semana del Medio Ambiente',
    },
    description: {
      pt: 'Key visual tipográfico para a campanha da Semana do Meio Ambiente 2025.',
      en: 'Typographic key visual for the 2025 Environment Week campaign.',
      es: 'Key visual tipográfico para la campaña de la Semana del Medio Ambiente 2025.',
    },
    category: 'Campanhas',
    image: '/projects/kv-semana-do-meio-ambiente.png',
    link: 'https://www.behance.net/gallery/227611835/KV-Semana-do-meio-ambiente',
    featured: false,
  },
  {
    id: 'kv-movimente-se',
    title: {
      pt: 'KV — Movimente-se',
      en: 'KV — Get Moving',
      es: 'KV — Muévete',
    },
    description: {
      pt: 'Key visual de campanha de incentivo à atividade física, com tipografia e elementos gráficos vibrantes.',
      en: 'Key visual for a physical-activity campaign, with typography and vibrant graphic elements.',
      es: 'Key visual de una campaña de incentivo a la actividad física, con tipografía y elementos gráficos vibrantes.',
    },
    category: 'Campanhas',
    image: '/projects/kv-movimente-se.png',
    link: 'https://www.behance.net/gallery/227611673/KV-MOVIMENTE-SE',
    featured: false,
  },
  {
    id: 'identidade-visual-rosa-fernandes',
    title: {
      pt: 'Identidade Visual — Rosa Fernandes',
      en: 'Visual Identity — Rosa Fernandes',
      es: 'Identidad Visual — Rosa Fernandes',
    },
    description: {
      pt: 'Identidade visual de campanha para a candidata a vereadora Rosa Fernandes.',
      en: 'Campaign visual identity for city council candidate Rosa Fernandes.',
      es: 'Identidad visual de campaña para la candidata a concejala Rosa Fernandes.',
    },
    category: 'Branding',
    image: '/projects/identidade-visual-rosa-fernandes.png',
    link: 'https://www.behance.net/gallery/219520987/IDENTIDADE-VISUAL-ROSA-FERNANDES',
    featured: false,
  },
  {
    id: 'kkt-branding-project',
    title: {
      pt: 'KKT — Branding Project',
      en: 'KKT — Branding Project',
      es: 'KKT — Branding Project',
    },
    description: {
      pt: 'Projeto de identidade de marca para a KKT, com logotipo e aplicação em cartão contactless.',
      en: 'Brand identity project for KKT, with a logo and application on a contactless card.',
      es: 'Proyecto de identidad de marca para KKT, con logotipo y aplicación en tarjeta contactless.',
    },
    category: 'Branding',
    image: '/projects/kkt-branding-project.png',
    link: 'https://www.behance.net/gallery/219704809/KKT-BRANDING-PROJECT',
    featured: false,
  },
  {
    id: 'vtech',
    title: {
      pt: 'V.tech',
      en: 'V.tech',
      es: 'V.tech',
    },
    description: {
      pt: 'Identidade de marca para a V.tech, com logotipo em estilo voxel sobre fundo azul.',
      en: 'Brand identity for V.tech, with a voxel-style logo on a blue background.',
      es: 'Identidad de marca para V.tech, con logotipo estilo voxel sobre fondo azul.',
    },
    category: 'Branding',
    image: '/projects/vtech.png',
    link: 'https://www.behance.net/gallery/227611407/VTECH',
    featured: false,
  },
  {
    id: 'selatudo-ad-midias-sociais',
    title: {
      pt: 'Selatudo — Ad Mídias Sociais',
      en: 'Selatudo — Social Media Ad',
      es: 'Selatudo — Anuncio para Redes Sociales',
    },
    description: {
      pt: 'Anúncio para mídias sociais da Selatudo, com mascote animado e produtos impermeabilizantes.',
      en: 'Social media ad for Selatudo, featuring an animated mascot and waterproofing products.',
      es: 'Anuncio para redes sociales de Selatudo, con mascota animada y productos impermeabilizantes.',
    },
    category: 'Campanhas',
    image: '/projects/selatudo-ad-midias-sociais.png',
    link: 'https://www.behance.net/gallery/194990771/SELATUDO-AD-MIDIAS-SOCIAIS',
    featured: false,
  },
  {
    id: 'branding-dindin',
    title: {
      pt: 'Branding — +dindin',
      en: 'Branding — +dindin',
      es: 'Branding — +dindin',
    },
    description: {
      pt: 'Identidade de marca e landing page para a fintech +dindin, marketplace de crédito para compradores e vendedores.',
      en: 'Brand identity and landing page for +dindin, a fintech credit marketplace for buyers and sellers.',
      es: 'Identidad de marca y landing page para +dindin, marketplace fintech de crédito para compradores y vendedores.',
    },
    category: 'Branding',
    image: '/projects/branding-dindin.png',
    link: 'https://www.behance.net/gallery/143950511/BRANDING-dindin',
    featured: false,
  },
  {
    id: 'vtal-projetos-de-criacao',
    title: {
      pt: 'V.tal — Projetos de Criação',
      en: 'V.tal — Creative Projects',
      es: 'V.tal — Proyectos de Creación',
    },
    description: {
      pt: 'Conjunto de peças de comunicação interna criadas para a V.tal, aplicando a identidade da marca em diferentes materiais.',
      en: "A set of internal communication pieces created for V.tal, applying the brand identity across different materials.",
      es: 'Conjunto de piezas de comunicación interna creadas para V.tal, aplicando la identidad de marca en distintos materiales.',
    },
    category: 'Campanhas',
    image: '/projects/vtal-projetos-de-criacao.png',
    link: 'https://www.behance.net/gallery/172075819/Vtal-Projetos-de-Criacao',
    featured: false,
  },
  {
    id: 'jade-logotipo',
    title: {
      pt: 'Jade — Logotipo',
      en: 'Jade — Logo',
      es: 'Jade — Logotipo',
    },
    description: {
      pt: 'Logotipo para a Jade Medicina Tradicional Chinesa, com símbolo inspirado no equilíbrio yin-yang.',
      en: 'Logo for Jade Traditional Chinese Medicine, with a symbol inspired by yin-yang balance.',
      es: 'Logotipo para Jade Medicina Tradicional China, con un símbolo inspirado en el equilibrio yin-yang.',
    },
    category: 'Branding',
    image: '/projects/jade-logotipo.png',
    link: 'https://www.behance.net/gallery/164533339/JADE-LOGOTIPO',
    featured: false,
  },
  {
    id: 'portfolio-globo',
    title: {
      pt: 'Portfólio Globo',
      en: 'Globo Portfolio',
      es: 'Portafolio Globo',
    },
    description: {
      pt: 'Exploração de marca em 3D para o logotipo da Globo, renderizado em composição esférica.',
      en: '3D brand exploration for the Globo logo, rendered as a spherical composition.',
      es: 'Exploración de marca en 3D para el logotipo de Globo, renderizado en una composición esférica.',
    },
    category: 'Branding',
    image: '/projects/portfolio-globo.png',
    link: 'https://www.behance.net/gallery/120418277/Portfolio-Globo',
    featured: false,
  },
  {
    id: 'mytype',
    title: {
      pt: 'MyType',
      en: 'MyType',
      es: 'MyType',
    },
    description: {
      pt: 'Identidade de marca e embalagens para a MYTYPE, aplicada em sacolas e caixas de produto.',
      en: 'Brand identity and packaging for MYTYPE, applied to bags and product boxes.',
      es: 'Identidad de marca y packaging para MYTYPE, aplicada en bolsas y cajas de producto.',
    },
    category: 'Branding',
    image: '/projects/mytype.png',
    link: 'https://www.behance.net/gallery/153266765/MYTYPE',
    featured: false,
  },
  {
    id: 'orama-investimentos-2021',
    title: {
      pt: 'Órama Investimentos — 2021',
      en: 'Órama Investimentos — 2021',
      es: 'Órama Investimentos — 2021',
    },
    description: {
      pt: 'Peças de comunicação e ícones para as redes sociais da Órama Investimentos em 2021.',
      en: "Communication pieces and icons for Órama Investimentos' social media in 2021.",
      es: 'Piezas de comunicación e íconos para las redes sociales de Órama Investimentos en 2021.',
    },
    category: 'Campanhas',
    image: '/projects/orama-investimentos-2021.png',
    link: 'https://www.behance.net/gallery/121071999/Orama-Investimentos-2021',
    featured: false,
  },
  {
    id: 'factory-lab-logotipo',
    title: {
      pt: 'Factory Lab. — Logotipo',
      en: 'Factory Lab. — Logo',
      es: 'Factory Lab. — Logotipo',
    },
    description: {
      pt: 'Identidade de marca para a Factory Lab., estúdio de estampas personalizadas, com logotipo e pôsteres.',
      en: 'Brand identity for Factory Lab., a custom print studio, including logo and posters.',
      es: 'Identidad de marca para Factory Lab., estudio de estampados personalizados, con logotipo y pósters.',
    },
    category: 'Branding',
    image: '/projects/factory-lab-logotipo.png',
    link: 'https://www.behance.net/gallery/148664847/FACTORY-LAB-LOGOTIPO',
    featured: false,
  },
  {
    id: 'rebranding-agora',
    title: {
      pt: 'Rebranding — Ágora',
      en: 'Rebrand — Ágora',
      es: 'Rebranding — Ágora',
    },
    description: {
      pt: 'Redesenho de logotipo para a Ágora Sport, marca esportiva do grupo Ágora.',
      en: 'Logo redesign for Ágora Sport, the sports brand of the Ágora group.',
      es: 'Rediseño de logotipo para Ágora Sport, la marca deportiva del grupo Ágora.',
    },
    category: 'Branding',
    image: '/projects/rebranding-agora.png',
    link: 'https://www.behance.net/gallery/111317751/Rebranding-AGORA',
    featured: false,
  },
  {
    id: 'logotipo-duo-macky',
    title: {
      pt: 'Logotipo — Duo Macky',
      en: 'Logo — Duo Macky',
      es: 'Logotipo — Duo Macky',
    },
    description: {
      pt: 'Logotipo para a dupla musical Macky, com tipografia impactante em azul metálico.',
      en: 'Logo for the music duo Macky, with bold typography in metallic blue.',
      es: 'Logotipo para el dúo musical Macky, con tipografía impactante en azul metálico.',
    },
    category: 'Branding',
    image: '/projects/logotipo-duo-macky.png',
    link: 'https://www.behance.net/gallery/148664511/LOGOTIPO-DUO-MACKY',
    featured: false,
  },
  {
    id: 'orama-investimentos-criacao',
    title: {
      pt: 'Órama Investimentos — Criação',
      en: 'Órama Investimentos — Creative',
      es: 'Órama Investimentos — Creación',
    },
    description: {
      pt: 'Peças de social media para a Órama Investimentos, com linguagem descontraída sobre investimentos.',
      en: 'Social media pieces for Órama Investimentos, with a casual, approachable tone about investing.',
      es: 'Piezas de redes sociales para Órama Investimentos, con un lenguaje distendido sobre inversiones.',
    },
    category: 'Campanhas',
    image: '/projects/orama-investimentos-criacao.png',
    link: 'https://www.behance.net/gallery/143953571/Orama-Investimentos-CRIACAO',
    featured: false,
  },
  {
    id: 'passatempo-kv',
    title: {
      pt: 'Passatempo — KV',
      en: 'Passatempo — KV',
      es: 'Passatempo — KV',
    },
    description: {
      pt: 'Key visual com estética retrô de TVs analógicas para a campanha Passatempo.',
      en: 'Key visual with a retro analog-TV aesthetic for the Passatempo campaign.',
      es: 'Key visual con estética retro de televisores analógicos para la campaña Passatempo.',
    },
    category: 'Campanhas',
    image: '/projects/passatempo-kv.png',
    link: 'https://www.behance.net/gallery/237261637/PASSATEMPO-KV',
    featured: false,
  },
  {
    id: 'cliente-agora',
    title: {
      pt: 'Cliente Ágora',
      en: 'Ágora Client Work',
      es: 'Cliente Ágora',
    },
    description: {
      pt: 'Peça de apresentação da vertical Ágora Sport, com ícones esportivos e proposta de conexão ao vivo.',
      en: 'Presentation piece for the Ágora Sport vertical, with sports icons and a live-connection value proposition.',
      es: 'Pieza de presentación de la vertical Ágora Sport, con íconos deportivos y una propuesta de conexión en vivo.',
    },
    category: 'Campanhas',
    image: '/projects/cliente-agora.png',
    link: 'https://www.behance.net/gallery/108536039/Cliente-Agora',
    featured: false,
  },
];
