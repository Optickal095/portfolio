import { Injectable, LOCALE_ID, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { readSseEvents } from './sse';

/** A CV section the answer cites, named in both languages of the site. */
export interface ChatSource {
  es: string;
  en: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  error?: boolean;
  sources?: ChatSource[];
}

type ChatStreamEvent =
  | { type: 'sources'; sources: ChatSource[] }
  | { type: 'token'; text: string }
  | { type: 'done' }
  | { type: 'error'; message: string };

/** The API accepts up to 10 previous turns of up to 2000 characters each. */
const MAX_HISTORY_TURNS = 10;
const MAX_TURN_LENGTH = 2000;

// The API's own error texts are Spanish; the page shows its own, by status code.
const ERRORS = {
  connection: $localize`:@@chat.error.connection:No pude conectar con el asistente. Si es la primera pregunta, el servidor puede estar despertando: inténtalo de nuevo en unos segundos.`,
  tooMany: $localize`:@@chat.error.tooMany:Hiciste muchas preguntas seguidas. Espera un momento antes de volver a preguntar.`,
  invalid: $localize`:@@chat.error.invalid:La pregunta no es válida. Revisa que no supere los 500 caracteres.`,
  unavailable: $localize`:@@chat.error.unavailable:El asistente no está disponible en este momento. Inténtalo de nuevo en unos minutos.`,
};

/** Talks to the "Pregúntale a mi CV" API and keeps the conversation. */
@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly apiUrl = environment.chatApiUrl;
  /** Lets the API answer unclear questions in the page's language. */
  private readonly locale = inject(LOCALE_ID).startsWith('en') ? 'en' : 'es';

  readonly enabled = this.apiUrl !== null;
  readonly messages = signal<ChatMessage[]>([]);
  /** `thinking` until the first piece of the answer arrives, then `streaming`. */
  readonly status = signal<'idle' | 'thinking' | 'streaming'>('idle');
  readonly busy = computed(() => this.status() !== 'idle');

  /**
   * The API runs on a free plan that sleeps when idle. A cheap request when the
   * page loads wakes it up before the visitor asks anything.
   */
  wakeUp(): void {
    if (this.apiUrl) fetch(`${this.apiUrl}/health`).catch(() => undefined);
  }

  async send(question: string): Promise<void> {
    const message = question.trim();
    if (!message || this.busy() || !this.apiUrl) return;

    const history = this.messages()
      .filter((turn) => !turn.error)
      .slice(-MAX_HISTORY_TURNS)
      .map(({ role, content }) => ({ role, content: content.slice(0, MAX_TURN_LENGTH) }));

    this.messages.update((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);
    this.status.set('thinking');

    try {
      const response = await fetch(`${this.apiUrl}/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history, locale: this.locale }),
      });
      if (!response.ok || !response.body) {
        throw new Error(errorForStatus(response.status));
      }

      for await (const event of readSseEvents<ChatStreamEvent>(response.body)) {
        if (event.type === 'token') {
          this.status.set('streaming');
          this.updateAnswer((answer) => ({ ...answer, content: answer.content + event.text }));
        } else if (event.type === 'sources') {
          // Sent once the answer is complete; the space before the hidden
          // citation marker is trimmed too.
          this.updateAnswer((answer) => ({
            ...answer,
            content: answer.content.trimEnd(),
            sources: event.sources,
          }));
        } else if (event.type === 'error') {
          throw new Error(ERRORS.unavailable);
        }
      }
    } catch (error) {
      const text = error instanceof TypeError ? ERRORS.connection : (error as Error).message;
      this.updateAnswer(() => ({ role: 'assistant', content: text, error: true }));
    } finally {
      this.status.set('idle');
    }
  }

  clear(): void {
    if (!this.busy()) this.messages.set([]);
  }

  /** Replaces the last message, which is always the answer being written. */
  private updateAnswer(update: (answer: ChatMessage) => ChatMessage): void {
    this.messages.update((messages) => [
      ...messages.slice(0, -1),
      update(messages[messages.length - 1]),
    ]);
  }
}

function errorForStatus(status: number): string {
  if (status === 429) return ERRORS.tooMany;
  if (status === 400) return ERRORS.invalid;
  return ERRORS.unavailable;
}
