import { Component } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-contact',
  template: `
    <section id="contacto" class="container section">
      <h2>Contacto</h2>
      <p>Estoy abierto a nuevas oportunidades. Escríbeme y conversemos.</p>
      <div class="cta">
        <a class="btn primary" [href]="'mailto:' + profile.email">{{ profile.email }}</a>
        <a class="btn" [href]="profile.linkedin" target="_blank" rel="noopener">LinkedIn</a>
        <a class="btn" [href]="profile.github" target="_blank" rel="noopener">GitHub</a>
      </div>
    </section>
  `,
  styles: `
    p {
      font-size: 1.05rem;
      margin: 0 0 24px;
    }
  `,
})
export class Contact {
  protected readonly profile = PROFILE;
}
