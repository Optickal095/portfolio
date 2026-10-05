# Portfolio — Eduardo Hernández Oyarzún

Portfolio personal de Eduardo Hernández Oyarzún, Ingeniero Informático fullstack (Angular, React, Node.js/NestJS, Google Cloud, IA).

**Sitio:** https://optickal095.github.io/portfolio/

## Stack

- Angular 22 (componentes standalone, Signals, control flow `@for` / `@if`)
- CSS con variables y tema claro/oscuro
- Despliegue a GitHub Pages con `angular-cli-ghpages` (`npm run deploy`)

## Estructura

```
src/app/
├── components/   # header, hero, about, experience, projects, skills, contact, footer
├── data/         # contenido del portfolio (experiencia, proyectos, habilidades)
└── services/     # ThemeService (tema claro/oscuro con signals)
```

Para actualizar el contenido basta con editar `src/app/data/portfolio.data.ts`.

## Desarrollo

```bash
npm install
npm start        # http://localhost:4200
npm run build
npm run deploy   # publica en GitHub Pages (rama gh-pages)
```

## Contacto

- Email: eduardo.he095@gmail.com
- LinkedIn: https://www.linkedin.com/in/eduardohernandezoyarzun
- GitHub: https://github.com/Optickal095
