import { Component } from '@angular/core';
import { PROJECTS } from '../../data/portfolio.data';

@Component({
  selector: 'app-projects',
  template: `
    <section id="proyectos" class="container section">
      <h2>Proyectos</h2>
      <div class="grid">
        @for (project of projects; track project.name) {
          <article class="card">
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
            <div class="tags">
              @for (tech of project.stack; track tech) {
                <span>{{ tech }}</span>
              }
            </div>
            @if (project.note) {
              <p class="note">{{ project.note }}</p>
            }
            @if (project.links?.length) {
              <div class="links">
                @for (link of project.links; track link.url) {
                  <a [href]="link.url" target="_blank" rel="noopener">{{ link.label }} ↗</a>
                }
              </div>
            }
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .card p {
      margin: 0;
      color: var(--muted);
    }

    .tags {
      margin-top: auto;
    }

    .tags span {
      background: var(--bg);
    }

    .note {
      font-size: 0.85rem;
    }

    .links {
      display: flex;
      gap: 16px;
      font-weight: 500;
      font-size: 0.92rem;
    }

    .links a {
      text-decoration: none;
    }

    .links a:hover {
      text-decoration: underline;
    }

    @media (max-width: 760px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class Projects {
  protected readonly projects = PROJECTS;
}
