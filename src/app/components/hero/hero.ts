import { Component } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';
import { Prompt } from '../prompt/prompt';

@Component({
  selector: 'app-hero',
  imports: [Prompt],
  template: `
    <section id="inicio" class="container hero">
      <app-prompt command="whoami" />
      <h1>{{ profile.name }}<span class="cursor">_</span></h1>
      <p class="lead">{{ profile.tagline }}</p>
      <div class="actions">
        <a class="btn primary" [href]="'mailto:' + profile.email" i18n="@@hero.contact"
          >contactar()</a
        >
        <a class="btn" [href]="profile.github" target="_blank" rel="noopener">github ↗</a>
        <a class="btn" [href]="profile.linkedin" target="_blank" rel="noopener">linkedin ↗</a>
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
      font-weight: 600;
      text-wrap: balance;
    }

    .cursor {
      color: var(--accent);
      animation: blink 1.1s steps(1) infinite;
    }

    @keyframes blink {
      50% {
        opacity: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .cursor {
        animation: none;
      }
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
