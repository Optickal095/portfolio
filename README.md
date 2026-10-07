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
├── chat/         # el chat, en capas (ver "Arquitectura del chat")
├── data/         # contenido del portfolio, con los textos marcados con $localize
└── app.config.ts # raíz de composición: elige el adaptador del chat
src/locale/
├── messages.json      # textos en español (idioma base), generados con `ng extract-i18n`
└── messages.en.json   # traducción al inglés
scripts/
└── write-root-index.mjs  # página raíz que envía a /es/ o /en/
```

### Arquitectura del chat

Clean Architecture con puertos y adaptadores. Las dependencias apuntan hacia adentro y los componentes nunca hacen `fetch`.

```
chat/
├── domain/          ChatMessage, ChatSource, ChatFailure y la regla del historial (historyFor)
├── application/     Puerto ChatApi (InjectionToken) y ChatStore: estado con Signals y flujo de "preguntar"
├── infrastructure/  HttpChatApi: fetch + Server-Sent Events; traduce estados HTTP a fallas (429 → tooMany…)
└── presentation/    Pipe de markdown
```

- `app.config.ts` provee `CHAT_API`: `HttpChatApi` si hay URL de la API en el `environment`, o `null` para ocultar el chat.
- `ChatStore` depende solo del puerto. Cambiar el transporte (por ejemplo, a WebSockets) es escribir otro adaptador.
- El componente `Ask` solo muestra: traduce cada tipo de falla a su texto en el idioma de la página.
- Tests (`npm test`, Vitest): dominio puro, `ChatStore` con un doble del puerto y `HttpChatApi` con un `fetch` falso.

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
npm test                                    # tests unitarios (Vitest)
npm run deploy                              # compila ambos idiomas y publica en GitHub Pages
```

## Contacto

- Email: eduardo.he095@gmail.com
- LinkedIn: https://www.linkedin.com/in/eduardohernandezoyarzun
- GitHub: https://github.com/Optickal095
