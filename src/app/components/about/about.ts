import { Component } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-about',
  template: `
    <section id="sobre-mi" class="container section">
      <h2>Sobre mí</h2>
      @for (paragraph of profile.about; track $index) {
        <p>{{ paragraph }}</p>
      }
    </section>
  `,
  styles: `
    p {
      max-width: 720px;
      font-size: 1.05rem;
    }
  `,
})
export class About {
  protected readonly profile = PROFILE;
}
