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
  name: string;
  description: string;
  stack: string[];
  note?: string;
  links?: Link[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Education {
  title: string;
  institution: string;
  period: string;
}

export const PROFILE = {
  name: 'Eduardo Hernández Oyarzún',
  title: 'Ingeniero de Ejecución en Computación e Informática',
  tagline:
    'Desarrollador fullstack con TypeScript en todo el stack: Angular y React en frontend, Node.js/NestJS en backend, servicios serverless en Google Cloud y un agente de IA en producción.',
  about: [
    'Soy Ingeniero Informático fullstack, con experiencia en Angular y React en frontend, y Node.js/NestJS en backend, sobre bases de datos relacionales (PostgreSQL, MySQL) y no relacionales (MongoDB). He construido servicios serverless en Google Cloud y un agente de IA en producción (WhatsApp, OpenAI + LangChain) que procesa texto, imágenes y audio.',
    'Me considero proactivo y autónomo, con foco en la resolución de problemas, la calidad del código y la entrega de APIs REST sólidas dentro de equipos ágiles.',
  ],
  email: 'eduardo.he095@gmail.com',
  linkedin: 'https://www.linkedin.com/in/eduardohernandezoyarzun',
  github: 'https://github.com/Optickal095',
};

export const EXPERIENCE: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'Canai',
    period: 'Nov 2025 — Ago 2026',
    summary:
      'Plataforma de gestión de personal de campo y automatización de órdenes de trabajo, construida como un monorepo multi-proyecto.',
    highlights: [
      'Desarrollo fullstack con Angular (SPA basada en Signals) y NestJS (API BFF) sobre PostgreSQL con Prisma.',
      'Vista de tareas del día con su estado y evidencias, y plantillas de tareas configurables según las necesidades de cada cliente.',
      'Agente de IA por WhatsApp con OpenAI y LangChain: envío automático de órdenes de trabajo, verificación de imágenes, revisión de legibilidad de boletas y transcripción de audios.',
      'Funciones serverless event-driven en Google Cloud (Cloud Run, Pub/Sub, Cloud Storage).',
      'Arquitectura multi-tenant, patrón Repository (DDD) y estándares de código estrictos.',
    ],
    stack: ['Angular', 'NestJS', 'PostgreSQL', 'Prisma', 'GCP', 'LangChain', 'OpenAI'],
  },
  {
    role: 'Desarrollador FullStack',
    company: 'uMov',
    period: 'Dic 2023 — May 2024',
    summary:
      'Plataforma web complementaria a un dispositivo médico que respalda la rehabilitación de pacientes post-accidente cerebrovascular.',
    highlights: [
      'Visualización del progreso de las sesiones de rehabilitación con gráficas de la evolución del paciente en el tiempo.',
      'Módulos escalables con React y Ant Design, MySQL y consumo de APIs.',
      'Colaboración con diseñadores, CEO y CIO para asegurar la calidad del producto.',
    ],
    stack: ['React', 'Ant Design', 'MySQL', 'APIs REST'],
  },
  {
    role: 'Proyecto de Título',
    company: 'Universidad del Bío-Bío',
    period: 'Mar 2023 — Ago 2023',
    summary:
      'Red social para difundir el trabajo de músicos emergentes y permitir que organizadores de eventos contraten sus servicios.',
    highlights: [
      'MEAN stack (MongoDB, Express.js, Angular, Node.js), Bootstrap y JWT para autenticación.',
      'Integración y consumo de APIs y servicios externos; optimización de rendimiento y seguridad.',
    ],
    stack: ['MongoDB', 'Express', 'Angular', 'Node.js', 'JWT'],
  },
  {
    role: 'Desarrollador',
    company: 'EzSolutions',
    period: 'Oct 2021 — Ene 2022',
    summary: 'Aplicación web para un local comercial con los módulos clave para su funcionamiento.',
    highlights: [
      'Desarrollo con PHP y MySQL en equipo.',
      'Colaboración en pruebas y levantamiento de requerimientos del cliente.',
    ],
    stack: ['PHP', 'MySQL'],
  },
];

export const PROJECTS: Project[] = [
  {
    name: 'Agente de IA por WhatsApp',
    description:
      'Agente en producción que conversa con clientes, envía órdenes de trabajo y procesa sus respuestas: valida imágenes, revisa la legibilidad de boletas y transcribe audios.',
    stack: ['OpenAI', 'LangChain', 'Google Vision', 'GCP'],
    note: 'Proyecto privado · Canai',
  },
  {
    name: 'Plataforma de rehabilitación uMov',
    description:
      'Panel web para profesionales de la salud con gráficas de la evolución de pacientes en rehabilitación post-ACV.',
    stack: ['React', 'Ant Design', 'MySQL'],
    note: 'Proyecto privado · uMov',
  },
  {
    name: 'Tocata',
    description:
      'Red social para músicos emergentes y organizadores de eventos. Proyecto de Título en la Universidad del Bío-Bío.',
    stack: ['Angular', 'Node.js', 'MongoDB', 'JWT'],
    links: [
      { label: 'Frontend', url: 'https://github.com/Optickal095/TocataFrontend' },
      { label: 'Backend', url: 'https://github.com/Optickal095/TocataBackend' },
    ],
  },
  {
    name: 'Este portfolio',
    description:
      'Sitio personal construido con Angular (componentes standalone y Signals), desplegado en GitHub Pages.',
    stack: ['Angular', 'TypeScript', 'Signals'],
    links: [{ label: 'Repositorio', url: 'https://github.com/Optickal095/portfolio' }],
  },
];

export const SKILLS: SkillGroup[] = [
  { title: 'Frontend', items: ['Angular', 'React', 'TypeScript / JavaScript', 'HTML / CSS'] },
  {
    title: 'Backend',
    items: ['Node.js / NestJS', 'APIs REST / Integraciones', 'Prisma', 'Patrón Repository / DDD'],
  },
  {
    title: 'Datos y nube',
    items: ['PostgreSQL / MySQL', 'MongoDB', 'Google Cloud (Cloud Run, Pub/Sub)', 'Git / GitHub'],
  },
  { title: 'IA', items: ['OpenAI', 'LangChain', 'Google Vision', 'Desarrollo asistido por IA'] },
];

export const EDUCATION: Education[] = [
  {
    title: 'Ingeniería de Ejecución en Computación e Informática',
    institution: 'Universidad del Bío-Bío',
    period: '2016 — 2023',
  },
  {
    title: 'Carrera de Desarrollo Frontend React',
    institution: 'CoderHouse',
    period: 'Jun 2023 — Ene 2024',
  },
];

export const LANGUAGES = ['Español (Nativo)', 'Inglés (Avanzado)'];
