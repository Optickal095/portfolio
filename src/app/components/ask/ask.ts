import {
  Component,
  ElementRef,
  LOCALE_ID,
  OnInit,
  afterRenderEffect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ChatStore } from '../../chat/application/chat.store';
import type { ChatFailure } from '../../chat/domain/chat';
import { InlineMarkdownPipe } from '../../chat/presentation/inline-markdown.pipe';
import { Prompt } from '../prompt/prompt';

@Component({
  selector: 'app-ask',
  imports: [Prompt, InlineMarkdownPipe],
  templateUrl: './ask.html',
  styleUrl: './ask.css',
})
export class Ask implements OnInit {
  protected readonly chat = inject(ChatStore);
  protected readonly locale: 'es' | 'en' = inject(LOCALE_ID).startsWith('en') ? 'en' : 'es';
  protected readonly draft = signal('');
  protected readonly suggestions = [
    $localize`:@@ask.suggestion.canai:¿Qué hizo en Canai?`,
    $localize`:@@ask.suggestion.stack:¿Tiene experiencia con NestJS y Google Cloud?`,
    $localize`:@@ask.suggestion.ai:¿Qué construyó con IA?`,
  ];

  /** What the visitor reads for each kind of failure, in the page's language. */
  protected readonly failures: Record<ChatFailure, string> = {
    connection: $localize`:@@chat.error.connection:No pude conectar con el asistente. Si es la primera pregunta, el servidor puede estar despertando: inténtalo de nuevo en unos segundos.`,
    tooMany: $localize`:@@chat.error.tooMany:Hiciste muchas preguntas seguidas. Espera un momento antes de volver a preguntar.`,
    invalid: $localize`:@@chat.error.invalid:La pregunta no es válida. Revisa que no supere los 500 caracteres.`,
    unavailable: $localize`:@@chat.error.unavailable:El asistente no está disponible en este momento. Inténtalo de nuevo en unos minutos.`,
  };

  private readonly log = viewChild<ElementRef<HTMLElement>>('log');
  private readonly input = viewChild<ElementRef<HTMLInputElement>>('input');

  constructor() {
    // Keep the newest text in view while the answer streams in.
    afterRenderEffect(() => {
      this.chat.messages();
      const log = this.log()?.nativeElement;
      if (log) log.scrollTop = log.scrollHeight;
    });
  }

  ngOnInit(): void {
    this.chat.wakeUp();
  }

  protected async ask(question: string): Promise<void> {
    this.draft.set('');
    await this.chat.send(question);
    this.input()?.nativeElement.focus();
  }

  protected submit(event: SubmitEvent): void {
    event.preventDefault();
    void this.ask(this.draft());
  }
}
