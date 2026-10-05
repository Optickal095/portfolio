import { Component } from '@angular/core';
import { EXPERIENCE } from '../../data/portfolio.data';
import { Prompt } from '../prompt/prompt';

@Component({
  selector: 'app-experience',
  imports: [Prompt],
  template: `
    <section id="experiencia" class="section">
      <div class="container stack">
        <app-prompt command="git log --carrera" />
        <ol class="log">
          @for (job of experience; track job.company; let first = $first) {
            <li>
              <span class="dot" [class.head]="first"></span>
              <span class="when">{{ job.period }}</span>
              <div class="body">
                <h3>
                  {{ job.role }} <span>&#64; {{ job.company }}</span>
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
      </div>
    </section>
  `,
  styles: `
    .log {
      list-style: none;
      margin: 0 0 0 6px;
      padding: 0;
      border-left: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 40px;
    }

    .log > li {
      display: grid;
      grid-template-columns: 170px minmax(0, 1fr);
      gap: 16px;
      position: relative;
      padding-left: 28px;
    }

    .dot {
      position: absolute;
      left: -7px;
      top: 6px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      box-sizing: border-box;
      border: 2px solid var(--faint);
      background: var(--bg);
      box-shadow: 0 0 0 5px var(--bg);
    }

    .dot.head {
      background: var(--accent);
      border-color: var(--accent);
    }

    .when {
      font-family: var(--mono);
      font-size: 0.8rem;
      color: var(--faint-text);
      padding-top: 4px;
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    h3 span {
      color: var(--faint-text);
      font-weight: 400;
    }

    p {
      margin: 0;
      color: var(--muted);
      line-height: 1.65;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      color: var(--muted);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    ul li {
      padding-left: 18px;
      position: relative;
    }

    ul li::before {
      content: '–';
      position: absolute;
      left: 0;
      color: var(--faint-text);
    }

    @media (max-width: 720px) {
      .log > li {
        grid-template-columns: minmax(0, 1fr);
        gap: 4px;
        padding-left: 22px;
      }
    }
  `,
})
export class Experience {
  protected readonly experience = EXPERIENCE;
}
