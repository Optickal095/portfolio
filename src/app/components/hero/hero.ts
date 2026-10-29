import { Component } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';
import { ContactLinks } from '../contact-links/contact-links';

@Component({
  selector: 'app-hero',
  imports: [ContactLinks],
  template: `
    <section id="inicio" class="container hero">
      <p class="kicker" i18n="@@hero.kicker">Ingeniero Informático · Desarrollador fullstack</p>
      <div class="title">
        <h1>{{ profile.name }}</h1>
        <span class="status" i18n="@@hero.available">Disponible para trabajar</span>
      </div>
      <p class="lead">{{ profile.summary }}</p>
      <app-contact-links />
      <div class="actions">
        <a class="btn primary" [href]="'mailto:' + profile.email" i18n="@@hero.contact"
          >Contactar</a
        >
        <a class="btn" [href]="profile.cv" download i18n="@@hero.downloadCv">Descargar CV</a>
      </div>
    </section>
  `,
  styles: `
    .hero {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding-top: 96px;
      padding-bottom: 88px;
    }

    .kicker {
      margin: 0 0 -8px;
      color: var(--accent);
      font-weight: 600;
    }

    .title {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px 20px;
    }

    h1 {
      margin: 0;
      font-size: clamp(2.4rem, 7vw, 4rem);
      line-height: 1.04;
      letter-spacing: -0.03em;
      font-weight: 700;
      text-wrap: balance;
    }

    .status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border: 1px solid color-mix(in srgb, var(--success) 40%, transparent);
      border-radius: 999px;
      background: color-mix(in srgb, var(--success) 12%, transparent);
      color: var(--success);
      font-size: 0.875rem;
      font-weight: 600;
      white-space: nowrap;
    }

    .status::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: currentColor;
    }

    .lead {
      margin: 0;
      font-size: 1.125rem;
      line-height: 1.7;
      color: var(--muted);
      max-width: 72ch;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    @media (max-width: 720px) {
      .hero {
        padding-top: 56px;
        padding-bottom: 56px;
      }

      .lead {
        font-size: 1.05rem;
      }
    }
  `,
})
export class Hero {
  protected readonly profile = PROFILE;
}
