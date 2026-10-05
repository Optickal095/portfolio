// Writes dist/portfolio/browser/index.html: the site root (/portfolio/), which
// sends each visitor to /es/ or /en/. Angular's i18n build only creates one
// folder per language, so the root needs its own page.
//
// Order: the language picked with the ES | EN switch (localStorage), then the
// browser's preferred languages, then Spanish.
import { writeFileSync } from 'node:fs';

const STORAGE_KEY = 'portfolio-lang'; // keep in sync with src/app/i18n.ts

const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Eduardo Hernández Oyarzún</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#0b0e14">
  <link rel="alternate" hreflang="es" href="es/">
  <link rel="alternate" hreflang="en" href="en/">
  <style>
    body { margin: 0; background: #0b0e14; color: #d9dfea; font: 16px ui-monospace, Consolas, monospace; }
    main { padding: 48px 24px; }
    a { color: #7aa2f7; }
  </style>
  <script>
    (function () {
      var lang = null;
      try { lang = localStorage.getItem('${STORAGE_KEY}'); } catch (e) {}
      if (lang !== 'es' && lang !== 'en') {
        var preferred = navigator.languages || [navigator.language || ''];
        lang = 'es';
        for (var i = 0; i < preferred.length; i++) {
          var code = String(preferred[i]).toLowerCase().slice(0, 2);
          if (code === 'es' || code === 'en') { lang = code; break; }
        }
      }
      location.replace(lang + '/' + location.hash);
    })();
  </script>
</head>
<body>
  <main>
    <p><a href="es/">Español</a> · <a href="en/">English</a></p>
  </main>
</body>
</html>
`;

writeFileSync('dist/portfolio/browser/index.html', html);
console.log('Wrote dist/portfolio/browser/index.html');
