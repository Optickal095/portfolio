import {
  type SimpleIcon,
  siAngular,
  siBootstrap,
  siCss,
  siExpress,
  siGit,
  siGithub,
  siGooglecloud,
  siHtml5,
  siInsomnia,
  siJavascript,
  siLangchain,
  siMongodb,
  siMysql,
  siN8n,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPostman,
  siPrisma,
  siReact,
  siSwagger,
  siTypescript,
} from 'simple-icons';

export interface Link {
  label: string;
  url: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface Project {
  /** Short category shown above the name. */
  kind: string;
  name: string;
  description: string;
  note?: string;
  links?: Link[];
}

export interface Tech {
  name: string;
  /** SVG path in a 24x24 viewBox. */
  path: string;
  color: string;
  /** Draw the path as a stroke instead of a fill. */
  stroke?: boolean;
}

export interface TechGroup {
  title: string;
  items: Tech[];
}

export interface Education {
  title: string;
  institution: string;
  period: string;
}

export const PROFILE = {
  name: 'Eduardo Hernández Oyarzún',
  summary: $localize`:@@profile.summary:Ingeniero Informático fullstack. Desarrollo aplicaciones web de punta a punta: interfaces con Angular y React, APIs REST con Node.js y NestJS, y bases de datos relacionales y no relacionales (PostgreSQL, MySQL, MongoDB). He llevado a producción servicios serverless en Google Cloud y un agente de IA por WhatsApp con OpenAI y LangChain que procesa texto, imágenes y audio. Uso IA como apoyo al desarrollo, guiado por especificaciones, y cuido que el código sea mantenible (Clean Architecture, SOLID).`,
  email: 'eduardo.he095@gmail.com',
  phone: '+56 9 7865 7499',
  /** Relative to each language folder (/portfolio/es/, /portfolio/en/); the file lives in public/. */
  cv: 'Eduardo_Hernandez_Oyarzun_CV.pdf',
  linkedin: 'https://www.linkedin.com/in/eduardohernandezoyarzun',
  github: 'https://github.com/Optickal095',
};

export const EXPERIENCE: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'Canai',
    period: $localize`:@@exp.canai.period:Nov 2025 – Ago 2026`,
    summary: $localize`:@@exp.canai.summary:Plataforma de gestión de personal de campo y automatización de órdenes de trabajo, construida como un monorepo multi-proyecto.`,
    highlights: [
      $localize`:@@exp.canai.h1:Desarrollo fullstack con Angular (SPA basada en Signals) y NestJS (API BFF) sobre PostgreSQL con Prisma.`,
      $localize`:@@exp.canai.h2:Vista de tareas del día con su estado y evidencias, y plantillas de tareas configurables según cada cliente.`,
      $localize`:@@exp.canai.h3:Agente de IA por WhatsApp con OpenAI y LangChain: envío de órdenes de trabajo, verificación de imágenes, revisión de boletas y transcripción de audios.`,
      $localize`:@@exp.canai.h4:Funciones serverless event-driven en Google Cloud (Cloud Run, Pub/Sub, Cloud Storage).`,
      $localize`:@@exp.canai.h5:Arquitectura multi-tenant y patrón Repository (DDD).`,
      $localize`:@@exp.canai.h6:Despliegues a Google Cloud y resolución de incidencias en producción a partir de los logs; automatizaciones con n8n.`,
    ],
    stack: ['Angular', 'NestJS', 'PostgreSQL', 'Prisma', 'Google Cloud', 'LangChain', 'OpenAI', 'n8n'],
  },
  {
    role: $localize`:@@exp.umov.role:Desarrollador FullStack`,
    company: 'uMov',
    period: $localize`:@@exp.umov.period:Dic 2023 – May 2024`,
    summary: $localize`:@@exp.umov.summary:Plataforma web complementaria a un dispositivo médico para la rehabilitación de pacientes post-accidente cerebrovascular.`,
    highlights: [
      $localize`:@@exp.umov.h1:Gráficas de la evolución del paciente en el tiempo para profesionales de la salud.`,
      $localize`:@@exp.umov.h2:Módulos escalables con React y Ant Design en JavaScript y TypeScript, MySQL y consumo de APIs.`,
      $localize`:@@exp.umov.h3:Colaboración con diseñadores, CEO y CIO del proyecto.`,
    ],
    stack: ['React', 'Ant Design', 'JavaScript', 'TypeScript', 'MySQL'],
  },
  {
    role: $localize`:@@exp.thesis.role:Proyecto de Título`,
    company: 'UBB',
    period: $localize`:@@exp.thesis.period:Mar 2023 – Ago 2023`,
    summary: $localize`:@@exp.thesis.summary:Red social para difundir el trabajo de músicos emergentes y permitir que organizadores de eventos contraten sus servicios.`,
    highlights: [
      $localize`:@@exp.thesis.h1:MEAN stack (MongoDB, Express.js, Angular, Node.js), Bootstrap y JWT para autenticación.`,
      $localize`:@@exp.thesis.h2:Integración de APIs y servicios externos; optimización de rendimiento y seguridad.`,
    ],
    stack: ['Angular', 'Node.js', 'Express', 'MongoDB', 'JWT'],
  },
  {
    role: $localize`:@@exp.ez.role:Desarrollador`,
    company: 'EzSolutions',
    period: $localize`:@@exp.ez.period:Oct 2021 – Ene 2022`,
    summary: $localize`:@@exp.ez.summary:Aplicación web para un local comercial con los módulos clave para su funcionamiento.`,
    highlights: [
      $localize`:@@exp.ez.h1:Desarrollo con PHP y MySQL en equipo.`,
      $localize`:@@exp.ez.h2:Pruebas y levantamiento de requerimientos con el cliente.`,
    ],
    stack: ['PHP', 'MySQL'],
  },
];

const CODE = $localize`:@@project.code:Código`;

export const PROJECTS: Project[] = [
  {
    kind: $localize`:@@project.pokestats.kind:Dashboard de datos`,
    name: 'PokéStats',
    description: $localize`:@@project.pokestats.description:Dashboard interactivo de los 1.025 Pokémon con React, TypeScript y ECharts: filtros, gráficos con vista de tabla, comparador y ficha de cada Pokémon. Datos de PokeAPI, Clean Architecture y CI en GitHub Actions.`,
    links: [
      { label: 'Demo', url: 'https://optickal095.github.io/pokestats/' },
      { label: CODE, url: 'https://github.com/Optickal095/pokestats' },
    ],
  },
  {
    kind: $localize`:@@project.cv.kind:Asistente con IA`,
    name: $localize`:@@project.cv.name:Pregúntale a mi CV`,
    description: $localize`:@@project.cv.description:Chatbot que responde preguntas sobre mi experiencia usando solo mi CV, en español o inglés. NestJS, LangChain y RAG con embeddings de Gemini, respuestas en streaming y Clean Architecture.`,
    links: [
      { label: $localize`:@@project.cv.try:Probar aquí`, url: '#pregunta' },
      { label: CODE, url: 'https://github.com/Optickal095/pregunta-a-mi-cv' },
    ],
  },
  {
    kind: $localize`:@@project.agent.kind:Inteligencia artificial`,
    name: $localize`:@@project.agent.name:Agente de IA en producción`,
    description: $localize`:@@project.agent.description:Conversa con clientes por WhatsApp, envía órdenes de trabajo y procesa las respuestas con OpenAI, LangChain y Google Vision: valida imágenes, revisa boletas y transcribe audios.`,
    note: $localize`:@@project.agent.note:Privado · Canai`,
  },
  {
    kind: $localize`:@@project.umov.kind:Salud`,
    name: $localize`:@@project.umov.name:Rehabilitación post-ACV`,
    description: $localize`:@@project.umov.description:Panel web con gráficas de la evolución de pacientes para que los profesionales de la salud sigan su progreso.`,
    note: $localize`:@@project.umov.note:Privado · uMov`,
  },
  {
    kind: $localize`:@@project.tocata.kind:Proyecto de título`,
    name: 'Tocata',
    description: $localize`:@@project.tocata.description:Red social para músicos emergentes y organizadores de eventos. MEAN stack con JWT.`,
    links: [
      { label: 'Frontend', url: 'https://github.com/Optickal095/TocataFrontend' },
      { label: 'Backend', url: 'https://github.com/Optickal095/TocataBackend' },
    ],
  },
  {
    kind: 'Portfolio',
    name: $localize`:@@project.portfolio.name:Este sitio`,
    description: $localize`:@@project.portfolio.description:Angular con componentes standalone y Signals, en español e inglés con i18n y publicado en GitHub Pages.`,
    links: [{ label: CODE, url: 'https://github.com/Optickal095/portfolio' }],
  },
];

const icon = (name: string, si: SimpleIcon, color = `#${si.hex}`): Tech => ({
  name,
  path: si.path,
  color,
});

// Brand colors that are too dark for the page background use the text color instead.
const LIGHT = '#d9dfea';

export const TECH: TechGroup[] = [
  {
    title: $localize`:@@tech.languages:Lenguajes`,
    items: [icon('JavaScript', siJavascript), icon('TypeScript', siTypescript), icon('PHP', siPhp)],
  },
  {
    title: 'Frontend',
    items: [
      icon('Angular', siAngular, '#dd0031'),
      icon('React', siReact),
      icon('Next.js', siNextdotjs, LIGHT),
      icon('HTML5', siHtml5),
      icon('CSS3', siCss, '#1572b6'),
      icon('Bootstrap', siBootstrap, '#8c5cf0'),
    ],
  },
  {
    title: 'Backend',
    items: [
      icon('Node.js', siNodedotjs),
      icon('NestJS', siNestjs),
      icon('Express', siExpress, LIGHT),
      icon('Prisma', siPrisma, LIGHT),
      icon('Swagger', siSwagger),
    ],
  },
  {
    title: $localize`:@@tech.databases:Bases de datos`,
    items: [
      icon('MySQL', siMysql, '#5b9bd5'),
      icon('PostgreSQL', siPostgresql, '#6b8ff0'),
      icon('MongoDB', siMongodb),
    ],
  },
  {
    title: $localize`:@@tech.cloudAi:Cloud e IA`,
    items: [
      icon('Google Cloud', siGooglecloud),
      icon('LangChain', siLangchain),
      icon('n8n', siN8n),
      // OpenAI is not in simple-icons; a generic sparkle stands in for it.
      {
        name: 'OpenAI',
        path: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z',
        color: '#10a37f',
        stroke: true,
      },
    ],
  },
  {
    title: $localize`:@@tech.tools:Herramientas`,
    items: [
      {
        name: 'VS Code',
        path: 'M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16',
        color: '#3b9cf0',
        stroke: true,
      },
      icon('Git', siGit),
      icon('GitHub', siGithub, LIGHT),
      icon('Postman', siPostman),
      icon('Insomnia', siInsomnia, '#8b6cf6'),
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    title: $localize`:@@education.degree:Ingeniería de Ejecución en Computación e Informática`,
    institution: 'Universidad del Bío-Bío',
    period: '2016 – 2023',
  },
  {
    title: $localize`:@@education.coderhouse:Carrera de Desarrollo Frontend React`,
    institution: 'CoderHouse',
    period: '2023 – 2024',
  },
];

export const LANGUAGES = [
  $localize`:@@languages.spanish:Español · nativo`,
  $localize`:@@languages.english:Inglés · avanzado`,
];
