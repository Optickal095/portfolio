import { Component, input } from '@angular/core';

/** Section heading styled as a shell command, e.g. `$ ls proyectos/`. */
@Component({
  selector: 'app-prompt',
  template: `<h2><span class="dollar">$</span> {{ command() }}</h2>`,
  styles: `
    h2 {
      margin: 0;
      font-family: var(--mono);
      font-size: 0.95rem;
      font-weight: 400;
      color: var(--faint-text);
    }

    .dollar {
      color: var(--prompt);
    }
  `,
})
export class Prompt {
  readonly command = input.required<string>();
}
