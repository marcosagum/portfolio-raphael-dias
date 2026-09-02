export type Language = 'pt' | 'en' | 'es';

export const LANGUAGES: Language[] = ['pt', 'en', 'es'];

type UiText = {
  navWork: string;
  navAbout: string;
  heroRole: string;
  heroLocation: string;
  heroCredit1: string;
  heroCredit2: string;
  contato: string;
  filterAriaLabel: string;
  featuredSuffix: string;
  viewOnBehance: string;
  contactEyebrow: string;
  contactHeading: string;
  whatsappCta: string;
  emailLabel: string;
};

export const UI_TEXT: Record<Language, UiText> = {
  pt: {
    navWork: 'Trabalhos',
    navAbout: 'Sobre',
    heroRole: 'Publicitário',
    heroLocation: 'Rio de Janeiro',
    heroCredit1: 'Publicidade e design',
    heroCredit2: 'assinados por Raphael Dias',
    contato: 'Contato',
    filterAriaLabel: 'Filtrar por categoria',
    featuredSuffix: 'Destaque',
    viewOnBehance: 'Ver no Behance',
    contactEyebrow: 'Contato',
    contactHeading: 'Vamos criar algo juntos?',
    whatsappCta: 'Chamar no WhatsApp',
    emailLabel: 'E-mail',
  },
  en: {
    navWork: 'Work',
    navAbout: 'About',
    heroRole: 'Advertiser',
    heroLocation: 'Rio de Janeiro',
    heroCredit1: 'Advertising and design',
    heroCredit2: 'by Raphael Dias',
    contato: 'Contact',
    filterAriaLabel: 'Filter by category',
    featuredSuffix: 'Featured',
    viewOnBehance: 'View on Behance',
    contactEyebrow: 'Contact',
    contactHeading: "Let's create something together?",
    whatsappCta: 'Message on WhatsApp',
    emailLabel: 'Email',
  },
  es: {
    navWork: 'Trabajos',
    navAbout: 'Sobre mí',
    heroRole: 'Publicista',
    heroLocation: 'Río de Janeiro',
    heroCredit1: 'Publicidad y diseño',
    heroCredit2: 'firmados por Raphael Dias',
    contato: 'Contacto',
    filterAriaLabel: 'Filtrar por categoría',
    featuredSuffix: 'Destacado',
    viewOnBehance: 'Ver en Behance',
    contactEyebrow: 'Contacto',
    contactHeading: '¿Creamos algo juntos?',
    whatsappCta: 'Escribir por WhatsApp',
    emailLabel: 'Correo',
  },
};

export const CATEGORY_LABELS: Record<Language, Record<string, string>> = {
  pt: {
    Todos: 'Todos',
    'Landing Pages': 'Landing Pages',
    Branding: 'Branding',
    'UI/UX': 'UI/UX',
    Campanhas: 'Campanhas',
    Ilustração: 'Ilustração',
  },
  en: {
    Todos: 'All',
    'Landing Pages': 'Landing Pages',
    Branding: 'Branding',
    'UI/UX': 'UI/UX',
    Campanhas: 'Campaigns',
    Ilustração: 'Illustration',
  },
  es: {
    Todos: 'Todos',
    'Landing Pages': 'Landing Pages',
    Branding: 'Branding',
    'UI/UX': 'UI/UX',
    Campanhas: 'Campañas',
    Ilustração: 'Ilustración',
  },
};

export const BIO_PARAGRAPHS: Record<Language, [string, string]> = {
  pt: [
    'Design pra mim nunca foi só sobre fazer bonito, é sobre fazer sentido. Sou designer gráfico e motion designer há mais de 6 anos, e ao longo desse tempo passei por redações, employer branding, campanhas institucionais e hoje lidero a direção criativa do Kwai, traduzindo estratégia global em conteúdo que realmente conversa com o público brasileiro.',
    'Comecei no Grupo Globo, ainda aprendendo a diferença entre uma peça bonita e uma peça que funciona. De lá pra cá, passei pela V.tal e pela Órama Investimentos, sempre no cruzamento entre marca, comunicação e conteúdo digital, e hoje boa parte do meu processo criativo já nasce integrado a ferramentas de inteligência artificial generativa, não como muleta, mas como extensão da minha criatividade.',
  ],
  en: [
    "Design has never been just about making things pretty to me — it's about making sense. I've been a graphic and motion designer for over 6 years, and along the way I've worked across newsrooms, employer branding and institutional campaigns. Today I lead creative direction at Kwai, translating global strategy into content that genuinely speaks to the Brazilian audience.",
    "I started at Grupo Globo, still learning the difference between a piece that looks good and one that actually works. Since then I've worked at V.tal and Órama Investimentos, always at the crossing point between brand, communication and digital content, and today a good part of my creative process is already built around generative AI tools — not as a crutch, but as an extension of my creativity.",
  ],
  es: [
    'Para mí, el diseño nunca fue solo hacer algo bonito, es hacer que tenga sentido. Soy diseñador gráfico y motion designer hace más de 6 años, y en ese tiempo pasé por redacciones, employer branding, campañas institucionales y hoy lidero la dirección creativa de Kwai, traduciendo estrategia global en contenido que realmente conecta con el público brasileño.',
    'Empecé en Grupo Globo, todavía aprendiendo la diferencia entre una pieza bonita y una pieza que funciona. Desde entonces pasé por V.tal y Órama Investimentos, siempre en el cruce entre marca, comunicación y contenido digital, y hoy buena parte de mi proceso creativo ya nace integrado a herramientas de inteligencia artificial generativa, no como muleta, sino como extensión de mi creatividad.',
  ],
};
