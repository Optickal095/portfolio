import { Component } from '@angular/core';
import { TECH } from '../../data/portfolio.data';
import { Prompt } from '../prompt/prompt';

@Component({
  selector: 'app-tech',
  imports: [Prompt],
  template: `
    <section id="tecnologias" class="section">
      <div class="container stack">
        <app-prompt command="ls tecnologias/" />
        <div class="groups">
          @for (group of groups; track group.title) {
            <div class="group">
              <h3>{{ group.title }}</h3>
              <ul>
                @for (tech of group.items; track tech.name) {
                  <li [style.--brand]="tech.color">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      @if (tech.stroke) {
                        <path
                          [attr.d]="tech.path"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      } @else {
                        <path [attr.d]="tech.path" fill="currentColor" />
                      }
                    </svg>
                    <span>{{ tech.name }}</span>
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .groups {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 32px 24px;
    }

    .group {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    h3 {
      margin: 0;
      font-family: var(--mono);
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--faint-text);
      text-transform: lowercase;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      font-size: 0.95rem;
      transition: border-color 0.2s;
    }

    li:hover {
      border-color: var(--brand);
    }

    svg {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      color: var(--brand);
    }
  `,
})
export class Tech {
  protected readonly groups = TECH;
}
