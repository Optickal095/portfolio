import { Component } from '@angular/core';
import { EXPERIENCE } from '../../data/portfolio.data';

@Component({
  selector: 'app-experience',
  template: `
    <section id="experiencia" class="container section">
      <h2>Experiencia</h2>
      <ol class="timeline">
        @for (job of experience; track job.company) {
          <li>
            <div class="when">{{ job.period }}</div>
            <div>
              <h3>
                {{ job.role }} <span>· {{ job.company }}</span>
              </h3>
              <p>{{ job.summary }}</p>
              <ul>
                @for (item of job.highlights; track $index) {
                  <li>{{ item }}</li>
                }
              </ul>
              <div class="tags">
                @for (tech of job.stack; track tech) {
                  <span>{{ tech }}</span>
                }
              </div>
            </div>
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    .timeline {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .timeline > li {
      display: grid;
      grid-template-columns: 170px 1fr;
      gap: 24px;
      padding-bottom: 40px;
    }

    .when {
      color: var(--muted);
      font-size: 0.9rem;
      padding-top: 2px;
    }

    h3 span {
      color: var(--muted);
      font-weight: 500;
    }

    p {
      margin: 0 0 10px;
    }

    ul {
      margin: 0 0 14px;
      padding-left: 18px;
      color: var(--muted);
    }

    ul li {
      margin-bottom: 4px;
    }

    @media (max-width: 760px) {
      .timeline > li {
        grid-template-columns: 1fr;
        gap: 4px;
      }
    }
  `,
})
export class Experience {
  protected readonly experience = EXPERIENCE;
}
