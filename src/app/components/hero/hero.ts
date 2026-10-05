import { Component } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-hero',
  template: `
    <section id="inicio" class="hero container">
      <p class="eyebrow">{{ profile.title }}</p>
      <h1>{{ profile.name }}</h1>
      <p class="lead">{{ profile.tagline }}</p>
      <div class="cta">
        <a class="btn primary" href="#contacto">Contactar</a>
        <a class="btn" [href]="profile.github" target="_blank" rel="noopener">GitHub</a>
        <a class="btn" [href]="profile.linkedin" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </section>
  `,
  styles: `
    .hero {
      padding-top: 112px;
      padding-bottom: 80px;
    }

    .eyebrow {
      color: var(--muted);
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin: 0 0 12px;
    }

    h1 {
      font-size: clamp(2.2rem, 6vw, 3.6rem);
      line-height: 1.1;
      margin: 0 0 20px;
      letter-spacing: -0.02em;
    }

    .lead {
      font-size: 1.2rem;
      color: var(--muted);
      max-width: 680px;
      margin: 0 0 32px;
    }

    @media (max-width: 760px) {
      .hero {
        padding-top: 72px;
        padding-bottom: 56px;
      }
    }
  `,
})
export class Hero {
  protected readonly profile = PROFILE;
}
