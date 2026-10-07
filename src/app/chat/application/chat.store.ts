import { Injectable, LOCALE_ID, computed, inject, signal } from '@angular/core';
import { historyFor, type ChatLocale, type ChatMessage } from '../domain/chat';
import { CHAT_API, ChatApiError } from './chat-api.port';

/**
 * State of the conversation (Signals) and the "ask a question" flow. Depends
 * on the `ChatApi` port only: it does not know about HTTP or Server-Sent Events.
 */
@Injectable({ providedIn: 'root' })
export class ChatStore {
  private readonly api = inject(CHAT_API);
  private readonly locale: ChatLocale = inject(LOCALE_ID).startsWith('en') ? 'en' : 'es';

  readonly enabled = this.api !== null;
  readonly messages = signal<ChatMessage[]>([]);
  /** `thinking` until the first piece of the answer arrives, then `streaming`. */
  readonly status = signal<'idle' | 'thinking' | 'streaming'>('idle');
  readonly busy = computed(() => this.status() !== 'idle');

  wakeUp(): void {
    this.api?.wakeUp();
  }

  async send(question: string): Promise<void> {
    const message = question.trim();
    if (!message || this.busy() || !this.api) return;

    const history = historyFor(this.messages());
    this.messages.update((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);
    this.status.set('thinking');

    try {
      for await (const event of this.api.ask({ message, history, locale: this.locale })) {
        if (event.type === 'token') {
          this.status.set('streaming');
          this.updateAnswer((answer) => ({ ...answer, content: answer.content + event.text }));
        } else {
          // Sources come once the answer is complete; the space left before
          // the hidden citation marker is trimmed too.
          this.updateAnswer((answer) => ({
            ...answer,
            content: answer.content.trimEnd(),
            sources: event.sources,
          }));
        }
      }
    } catch (error) {
      const failure = error instanceof ChatApiError ? error.failure : 'unavailable';
      this.updateAnswer(() => ({ role: 'assistant', content: '', failure }));
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
