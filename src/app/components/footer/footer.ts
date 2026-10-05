import { Component } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <div class="container">© {{ year }} {{ name }} · hecho con Angular</div>
    </footer>
  `,
  styles: `
    footer {
      border-top: 1px solid var(--line);
      padding: 28px 0 40px;
      font-family: var(--mono);
      font-size: 0.8rem;
      color: var(--faint-text);
    }
  `,
})
export class Footer {
  protected readonly year = new Date().getFullYear();
  protected readonly name = PROFILE.name;
}
