import { Component, inject } from '@angular/core';
import { ChatService } from '../../chat/chat.service';

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
  protected readonly links = [
    // The chat section only exists when its API is configured.
    ...(inject(ChatService).enabled ? ['pregunta'] : []),
    'experiencia',
    'proyectos',
    'tecnologias',
    'contacto',
  ];
}
