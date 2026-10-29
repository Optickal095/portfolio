import { Component, signal } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';
import { ContactLinks } from '../contact-links/contact-links';
import { SectionTitle } from '../section-title/section-title';

@Component({
  selector: 'app-contact',
  imports: [SectionTitle, ContactLinks],
  template: `
    <section id="contacto" class="section">
      <div class="container stack contact">
        <app-section-title title="Contacto" i18n-title="@@contact.title" />
        <p class="pitch" i18n="@@contact.openTo">
          Busco oportunidades como desarrollador fullstack, frontend o backend, en equipos que
          construyan productos web. Escríbeme y conversamos.
        </p>
        <a class="email" [href]="'mailto:' + profile.email">{{ profile.email }}</a>
        <app-contact-links [withEmail]="false" />
        <div class="actions">
          <button type="button" class="btn primary" (click)="copyEmail()">
            {{ copied() ? copiedLabel : copyLabel }}
          </button>
          <a class="btn" [href]="profile.cv" download i18n="@@contact.downloadCv">Descargar CV</a>
        </div>
        <p class="sr-only" aria-live="polite">{{ copied() ? copiedLabel : '' }}</p>
      </div>
    </section>
  `,
  styles: `
    .contact {
      gap: 22px;
      padding-bottom: 32px;
    }

    .pitch {
      margin: 0;
      max-width: 60ch;
      color: var(--muted);
      font-size: 1.125rem;
      line-height: 1.7;
    }

    .email {
      font-size: clamp(1.6rem, 5vw, 2.5rem);
      font-weight: 600;
      letter-spacing: -0.02em;
      color: var(--text);
      text-decoration: none;
      overflow-wrap: anywhere;
    }

    .email:hover {
      color: var(--accent);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
  `,
})
export class Contact {
  protected readonly profile = PROFILE;
  protected readonly copied = signal(false);
  protected readonly copyLabel = $localize`:@@contact.copy:Copiar correo`;
  protected readonly copiedLabel = $localize`:@@contact.copied:Correo copiado`;

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.profile.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2500);
    } catch {
      // Clipboard can be blocked; the email stays visible and clickable.
    }
  }
}
