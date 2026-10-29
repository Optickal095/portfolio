import { Component } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-hero',
  template: `
    <section id="inicio" class="container hero">
      <p class="kicker" i18n="@@hero.kicker">Ingeniero Informático · Desarrollador fullstack</p>
      <h1>{{ profile.name }}</h1>
      <p class="lead">{{ profile.tagline }}</p>
      <div class="actions">
        <a class="btn primary" [href]="'mailto:' + profile.email" i18n="@@hero.contact"
          >Contactar</a
        >
        <a class="btn" [href]="profile.github" target="_blank" rel="noopener">GitHub ↗</a>
        <a class="btn" [href]="profile.linkedin" target="_blank" rel="noopener">LinkedIn ↗</a>
      </div>
    </section>
  `,
  styles: `
    .hero {
      display: flex;
      flex-direction: column;
      gap: 26px;
      padding-top: 104px;
      padding-bottom: 96px;
    }

    h1 {
      margin: 0;
      font-size: clamp(2.4rem, 7vw, 4rem);
      line-height: 1.04;
      letter-spacing: -0.03em;
      font-weight: 700;
      text-wrap: balance;
    }

    .kicker {
      margin: 0 0 -10px;
      color: var(--accent);
      font-weight: 600;
    }

    .lead {
      margin: 0;
      font-size: 1.25rem;
      line-height: 1.6;
      color: var(--muted);
      max-width: 640px;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    @media (max-width: 720px) {
      .hero {
        padding-top: 64px;
        padding-bottom: 64px;
      }
    }
  `,
})
export class Hero {
  protected readonly profile = PROFILE;
}
