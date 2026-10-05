import { Component } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';
import { Prompt } from '../prompt/prompt';

@Component({
  selector: 'app-contact',
  imports: [Prompt],
  template: `
    <section id="contacto" class="section">
      <div class="container stack contact">
        <app-prompt command="echo $CONTACTO" />
        <a class="email" [href]="'mailto:' + profile.email">{{ profile.email }}</a>
        <p>Abierto a roles fullstack, frontend Angular o backend NestJS.</p>
        <div class="links">
          <a [href]="profile.linkedin" target="_blank" rel="noopener">linkedin ↗</a>
          <a [href]="profile.github" target="_blank" rel="noopener">github ↗</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .contact {
      gap: 18px;
      padding-bottom: 32px;
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

    p {
      margin: 0;
      color: var(--muted);
    }

    .links {
      display: flex;
      gap: 20px;
      font-family: var(--mono);
      font-size: 0.875rem;
    }

    .links a {
      text-decoration: none;
    }
  `,
})
export class Contact {
  protected readonly profile = PROFILE;
}
