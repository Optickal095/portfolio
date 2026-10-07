import {
  ChatApiError,
  type ChatAnswerEvent,
  type ChatApi,
  type ChatQuestion,
} from '../application/chat-api.port';
import type { ChatFailure } from '../domain/chat';
import { readSseEvents } from './sse';

/** Wire format of `POST /chat/stream`. */
type StreamEvent = ChatAnswerEvent | { type: 'done' } | { type: 'error'; message: string };

/**
 * Adapter: talks to the NestJS API over HTTP, reading the answer as
 * Server-Sent Events, and turns transport problems into `ChatApiError`s.
 */
export class HttpChatApi implements ChatApi {
  private readonly fetchFn: typeof fetch;

  constructor(
    private readonly baseUrl: string,
    fetchFn: typeof fetch = fetch,
  ) {
    // Bound so the browser's fetch is never called with the wrong `this`.
    this.fetchFn = fetchFn.bind(globalThis);
  }

  wakeUp(): void {
    this.fetchFn(`${this.baseUrl}/health`).catch(() => undefined);
  }

  async *ask(question: ChatQuestion): AsyncIterable<ChatAnswerEvent> {
    let response: Response;
    try {
      response = await this.fetchFn(`${this.baseUrl}/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(question),
      });
    } catch {
      throw new ChatApiError('connection');
    }
    if (!response.ok || !response.body) throw new ChatApiError(failureFor(response.status));

    for await (const event of readSseEvents<StreamEvent>(response.body)) {
      if (event.type === 'error') throw new ChatApiError('unavailable');
      if (event.type === 'token' || event.type === 'sources') yield event;
    }
  }
}

export function failureFor(status: number): ChatFailure {
  if (status === 429) return 'tooMany';
  if (status === 400) return 'invalid';
  return 'unavailable';
}
