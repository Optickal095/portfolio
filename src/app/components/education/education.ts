import { Component } from '@angular/core';
import { EDUCATION, LANGUAGES } from '../../data/portfolio.data';
import { Prompt } from '../prompt/prompt';

@Component({
  selector: 'app-education',
  imports: [Prompt],
  template: `
    <section id="formacion" class="section">
      <div class="container stack">
        <app-prompt command="cat formacion.txt" />
        <div class="cols">
          <ul>
            @for (item of education; track item.title) {
              <li>
                <strong>{{ item.title }}</strong>
                <span>{{ item.institution }} · {{ item.period }}</span>
              </li>
            }
          </ul>
          <ul>
            @for (language of languages; track language) {
              <li>
                <strong>{{ language }}</strong>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: `
    .cols {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    li {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    strong {
      font-weight: 500;
    }

    span {
      color: var(--faint-text);
      font-family: var(--mono);
      font-size: 0.8rem;
    }

    @media (max-width: 720px) {
      .cols {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `,
})
export class Education {
  protected readonly education = EDUCATION;
  protected readonly languages = LANGUAGES;
}
