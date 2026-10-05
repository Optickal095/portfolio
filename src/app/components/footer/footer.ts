import { Component } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="container">
      <p>© {{ year }} {{ name }} · Hecho con Angular</p>
    </footer>
  `,
  styles: `
    footer {
      padding-top: 32px;
      padding-bottom: 48px;
      color: var(--muted);
      font-size: 0.85rem;
      border-top: 1px solid var(--border);
    }
  `,
})
export class Footer {
  protected readonly year = new Date().getFullYear();
  protected readonly name = PROFILE.name;
}
