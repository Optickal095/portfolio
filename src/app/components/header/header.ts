import { Component, LOCALE_ID, inject } from '@angular/core';
import { ChatStore } from '../../chat/application/chat.store';
import { LANGUAGE_STORAGE_KEY } from '../../i18n';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <div class="container inner">
        <a href="#inicio" class="brand">~/eduardo</a>
        <nav>
          @for (link of links; track link.id) {
            <a [href]="'#' + link.id">./{{ link.label }}</a>
          }
        </nav>
        <div class="languages" role="group" aria-label="Idioma / Language">
          @for (language of languages; track language.code) {
            <a
              [href]="'../' + language.code + '/'"
              [attr.hreflang]="language.code"
              [attr.lang]="language.code"
              [attr.aria-current]="language.code === locale ? 'true' : null"
              [attr.title]="language.name"
              [class.current]="language.code === locale"
              (click)="choose(language.code, $event)"
              >{{ language.label }}</a
            >
          }
        </div>
      </div>
    </header>
  `,
  styleUrl: './header.css',
})
export class Header {
  protected readonly locale = inject(LOCALE_ID);
  protected readonly links = [
    // The chat section only exists when its API is configured.
    ...(inject(ChatStore).enabled
      ? [{ id: 'pregunta', label: $localize`:@@nav.ask:pregunta` }]
      : []),
    { id: 'experiencia', label: $localize`:@@nav.experience:experiencia` },
    { id: 'proyectos', label: $localize`:@@nav.projects:proyectos` },
    { id: 'tecnologias', label: $localize`:@@nav.tech:tecnologias` },
    { id: 'contacto', label: $localize`:@@nav.contact:contacto` },
  ];
  protected readonly languages = [
    { code: 'es', label: 'ES', name: 'Español' },
    { code: 'en', label: 'EN', name: 'English' },
  ];

  /**
   * Remembers the choice (the root page uses it to pick a language) and keeps
   * the section the visitor was reading.
   */
  protected choose(code: string, event: MouseEvent): void {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    } catch {
      // Storage can be blocked; the link still works.
    }
    const link = event.currentTarget as HTMLAnchorElement;
    link.hash = location.hash;
  }
}
