# Portfolio

Portfolio de Eduardo en Angular 22 (standalone, Signals), en español e inglés con `@angular/localize`, publicado en GitHub Pages (`/portfolio/es/` y `/portfolio/en/`).

## Arquitectura (obligatoria)

- Componentes de `src/app/components/`: solo presentación. Sin `fetch` ni reglas de negocio.
- El chat sigue Clean Architecture en `src/app/chat/` (`domain/` puro, `application/` con el puerto `CHAT_API` y `ChatStore`, `infrastructure/` con `HttpChatApi`, `presentation/`). Ver "Arquitectura del chat" en el README.
- `src/app/app.config.ts` es la raíz de composición: el único lugar que elige adaptadores.
- Contenido estático en `src/app/data/portfolio.data.ts`.

## Reglas que no se deben romper

- Todo texto visible lleva i18n: `i18n="@@id"` o `` $localize`:@@id:…` ``; después `npx ng extract-i18n` y la traducción en `src/locale/messages.en.json`.
- El chat consume la API `pregunta-a-mi-cv` (Render): `POST /chat/stream` con `{ message, history, locale }`, eventos SSE `token`, `sources`, `done`/`error`.
- Diseño actual: estilo terminal oscuro. Eduardo duda de los títulos tipo comando (`$ git log --carrera`) porque los reclutadores pueden no entenderlos; pendiente decidir.

## Comandos

```bash
npm start                                   # español
npx ng serve --configuration development-en # inglés
npm test
npm run deploy   # ejecutar desde PowerShell/cmd: en Git Bash "/portfolio/" se convierte en ruta de Windows
```
