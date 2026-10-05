import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <div class="container inner">
        <a href="#inicio" class="brand">~/eduardo</a>
        <nav>
          @for (link of links; track link) {
            <a [href]="'#' + link">./{{ link }}</a>
          }
        </nav>
      </div>
    </header>
  `,
  styleUrl: './header.css',
})
export class Header {
  protected readonly links = ['experiencia', 'proyectos', 'tecnologias', 'contacto'];
}
