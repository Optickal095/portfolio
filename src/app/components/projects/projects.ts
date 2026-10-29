import { Component } from '@angular/core';
import { PROJECTS } from '../../data/portfolio.data';
import { SectionTitle } from '../section-title/section-title';

@Component({
  selector: 'app-projects',
  imports: [SectionTitle],
  template: `
    <section id="proyectos" class="section">
      <div class="container stack">
        <app-section-title title="Proyectos" i18n-title="@@projects.title" />
        <div class="grid">
          @for (project of projects; track project.name) {
            <article class="card">
              <span class="kind">{{ project.kind }}</span>
              <h3>{{ project.name }}</h3>
              <p>{{ project.description }}</p>
              <div class="meta">
                @if (project.note) {
                  <span>{{ project.note }}</span>
                }
                @for (link of project.links; track link.url) {
                  @if (link.url.startsWith('#')) {
                    <a [href]="link.url">{{ link.label }} ↓</a>
                  } @else {
                    <a [href]="link.url" target="_blank" rel="noopener">{{ link.label }} ↗</a>
                  }
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 26px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition:
        border-color 0.2s,
        transform 0.2s;
    }

    .card:hover {
      border-color: var(--border-strong);
      transform: translateY(-2px);
    }

    .kind {
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--accent);
    }

    h3 {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 600;
    }

    p {
      margin: 0;
      color: var(--muted);
      line-height: 1.6;
    }

    .meta {
      margin-top: auto;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      font-size: 0.875rem;
      color: var(--faint-text);
    }

    .meta a {
      font-weight: 600;
      text-decoration: none;
    }

    .meta a:hover {
      text-decoration: underline;
    }

    @media (max-width: 720px) {
      .grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `,
})
export class Projects {
  protected readonly projects = PROJECTS;
}
