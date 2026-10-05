# Portfolio — Eduardo Hernández Oyarzún

Portfolio personal de Eduardo Hernández Oyarzún, Ingeniero Informático fullstack (Angular, React, Node.js/NestJS, Google Cloud, IA), en español e inglés.

**Sitio:** https://optickal095.github.io/portfolio/ ([español](https://optickal095.github.io/portfolio/es/) · [English](https://optickal095.github.io/portfolio/en/))

## Stack

- Angular 22 (componentes standalone, Signals, control flow `@for` / `@if`)
- Internacionalización con `@angular/localize` (i18n de Angular): español e inglés
- Chat "Pregúntale a mi CV" con respuestas en streaming, conectado a la API [pregunta-a-mi-cv](https://github.com/Optickal095/pregunta-a-mi-cv)
- Diseño estilo terminal, sin librerías de UI
- Despliegue a GitHub Pages con `angular-cli-ghpages`

## Estructura

```
src/app/
├── components/   # header (con selector ES | EN), hero, ask (chat), experience, projects, tech, education, contact, footer
├── chat/         # ChatService (signals), lector de Server-Sent Events, pipe de markdown
└── data/         # contenido del portfolio, con los textos marcados con $localize
src/locale/
├── messages.json      # textos en español (idioma base), generados con `ng extract-i18n`
└── messages.en.json   # traducción al inglés
scripts/
└── write-root-index.mjs  # página raíz que envía a /es/ o /en/
```

## Idiomas

El i18n de Angular compila una versión del sitio por idioma: `/portfolio/es/` y `/portfolio/en/`. La raíz `/portfolio/` lleva a cada visitante a su idioma: primero el que eligió con el selector ES | EN, después el de su navegador y, si no, español.

Para cambiar o agregar un texto:

1. Márcalo con `i18n="@@id"` en la plantilla o con `` $localize`:@@id:texto` `` en TypeScript.
2. `npx ng extract-i18n` actualiza `src/locale/messages.json`.
3. Agrega la traducción con el mismo id en `src/locale/messages.en.json`.

## Desarrollo

```bash
npm install
npm start                                   # español, http://localhost:4200
npx ng serve --configuration development-en # inglés
npm run deploy                              # compila ambos idiomas y publica en GitHub Pages
```

## Contacto

- Email: eduardo.he095@gmail.com
- LinkedIn: https://www.linkedin.com/in/eduardohernandezoyarzun
- GitHub: https://github.com/Optickal095
