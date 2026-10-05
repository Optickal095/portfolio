import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { readSseEvents } from './sse';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  error?: boolean;
}

type ChatStreamEvent =
  | { type: 'sources'; sources: string[] }
  | { type: 'token'; text: string }
  | { type: 'done' }
  | { type: 'error'; message: string };

/** The API accepts up to 10 previous turns of up to 2000 characters each. */
const MAX_HISTORY_TURNS = 10;
const MAX_TURN_LENGTH = 2000;

const CONNECTION_ERROR =
  'No pude conectar con el asistente. Si es la primera pregunta, el servidor puede estar despertando: inténtalo de nuevo en unos segundos.';

/** Talks to the "Pregúntale a mi CV" API and keeps the conversation. */
@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly apiUrl = environment.chatApiUrl;

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
        body: JSON.stringify({ message, history }),
      });
      if (!response.ok || !response.body) {
        throw new Error(await readErrorMessage(response));
      }

      for await (const event of readSseEvents<ChatStreamEvent>(response.body)) {
        if (event.type === 'token') {
          this.status.set('streaming');
          this.updateAnswer((answer) => ({ ...answer, content: answer.content + event.text }));
        } else if (event.type === 'error') {
          throw new Error(event.message);
        }
      }
    } catch (error) {
      const text = error instanceof TypeError ? CONNECTION_ERROR : (error as Error).message;
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

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const { message } = await response.json();
    // Validation errors come as a list.
    return Array.isArray(message) ? 'La pregunta no es válida.' : String(message);
  } catch {
    return 'El asistente no está disponible en este momento.';
  }
}
