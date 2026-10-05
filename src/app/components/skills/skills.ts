import { Component } from '@angular/core';
import { EDUCATION, LANGUAGES, SKILLS } from '../../data/portfolio.data';

@Component({
  selector: 'app-skills',
  template: `
    <section id="habilidades" class="container section">
      <h2>Habilidades</h2>
      <div class="skills">
        @for (group of skills; track group.title) {
          <div>
            <h3>{{ group.title }}</h3>
            <ul>
              @for (item of group.items; track item) {
                <li>{{ item }}</li>
              }
            </ul>
          </div>
        }
      </div>
      <div class="two-col">
        <div>
          <h3>Educación</h3>
          @for (item of education; track item.title) {
            <p>
              <strong>{{ item.title }}</strong><br />
              {{ item.institution }} ({{ item.period }})
            </p>
          }
        </div>
        <div>
          <h3>Idiomas</h3>
          <p>
            @for (language of languages; track language) {
              {{ language }}<br />
            }
          </p>
        </div>
      </div>
    </section>
  `,
  styles: `
    .skills {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin-bottom: 40px;
    }

    h3 {
      font-size: 0.95rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      color: var(--muted);
    }

    li {
      padding: 3px 0;
    }

    .two-col {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
    }

    .two-col p {
      color: var(--muted);
      margin: 0 0 12px;
    }

    strong {
      color: var(--text);
      font-weight: 600;
    }

    @media (max-width: 760px) {
      .skills {
        grid-template-columns: repeat(2, 1fr);
      }

      .two-col {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class Skills {
  protected readonly skills = SKILLS;
  protected readonly education = EDUCATION;
  protected readonly languages = LANGUAGES;
}
