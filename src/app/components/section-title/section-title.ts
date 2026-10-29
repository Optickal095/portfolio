import { Component, input } from '@angular/core';

/** Section heading with an accent bar, e.g. "Experiencia". */
@Component({
  selector: 'app-section-title',
  template: `<h2>{{ title() }}</h2>`,
  styles: `
    h2 {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0;
      font-size: clamp(1.5rem, 4vw, 1.875rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.2;
      text-wrap: balance;
    }

    h2::before {
      content: '';
      flex-shrink: 0;
      width: 6px;
      height: 1.1em;
      border-radius: 3px;
      background: var(--accent);
    }
  `,
})
export class SectionTitle {
  readonly title = input.required<string>();
}
