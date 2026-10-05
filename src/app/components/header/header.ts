import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  template: `
    <header class="nav">
      <div class="container nav-inner">
        <a href="#inicio" class="brand">EHO</a>
        <nav>
          @for (link of links; track link.id) {
            <a [href]="'#' + link.id">{{ link.label }}</a>
          }
        </nav>
        <button
          class="theme-toggle"
          type="button"
          (click)="theme.toggle()"
          [attr.aria-label]="theme.theme() === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
        >
          {{ theme.theme() === 'dark' ? '☀' : '☾' }}
        </button>
      </div>
    </header>
  `,
  styleUrl: './header.css',
})
export class Header {
  protected readonly theme = inject(ThemeService);
  protected readonly links = [
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'contacto', label: 'Contacto' },
  ];
}
