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
import { ChatService } from '../../chat/chat.service';
import { InlineMarkdownPipe } from '../../chat/inline-markdown.pipe';
import { Prompt } from '../prompt/prompt';

@Component({
  selector: 'app-ask',
  imports: [Prompt, InlineMarkdownPipe],
  templateUrl: './ask.html',
  styleUrl: './ask.css',
})
export class Ask implements OnInit {
  protected readonly chat = inject(ChatService);
  protected readonly locale: 'es' | 'en' = inject(LOCALE_ID).startsWith('en') ? 'en' : 'es';
  protected readonly draft = signal('');
  protected readonly suggestions = [
    $localize`:@@ask.suggestion.canai:¿Qué hizo en Canai?`,
    $localize`:@@ask.suggestion.stack:¿Tiene experiencia con NestJS y Google Cloud?`,
    $localize`:@@ask.suggestion.ai:¿Qué construyó con IA?`,
  ];

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
