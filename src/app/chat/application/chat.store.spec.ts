import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CHAT_API,
  ChatApiError,
  type ChatAnswerEvent,
  type ChatApi,
  type ChatQuestion,
} from './chat-api.port';
import { ChatStore } from './chat.store';

/** Test double for the ChatApi port: replays scripted events, or fails. */
class FakeChatApi implements ChatApi {
  readonly questions: ChatQuestion[] = [];
  wakeUps = 0;
  failure: ChatApiError | null = null;

  constructor(private readonly events: ChatAnswerEvent[]) {}

  wakeUp(): void {
    this.wakeUps++;
  }

  async *ask(question: ChatQuestion): AsyncIterable<ChatAnswerEvent> {
    this.questions.push(question);
    if (this.failure) throw this.failure;
    yield* this.events;
  }
}

function createStore(api: ChatApi | null, locale = 'es') {
  TestBed.configureTestingModule({
    providers: [
      { provide: CHAT_API, useValue: api },
      { provide: LOCALE_ID, useValue: locale },
    ],
  });
  return TestBed.inject(ChatStore);
}

describe('ChatStore', () => {
  const answer: ChatAnswerEvent[] = [
    { type: 'token', text: 'Fue ' },
    { type: 'token', text: 'Software Engineer. ' },
    { type: 'sources', sources: [{ es: 'Experiencia › Canai', en: 'Experience › Canai' }] },
  ];

  it('adds the question and the streamed answer with its sources', async () => {
    const store = createStore(new FakeChatApi(answer));
    await store.send('  ¿Qué hizo en Canai?  ');

    expect(store.messages()).toEqual([
      { role: 'user', content: '¿Qué hizo en Canai?' },
      {
        role: 'assistant',
        content: 'Fue Software Engineer.',
        sources: [{ es: 'Experiencia › Canai', en: 'Experience › Canai' }],
      },
    ]);
    expect(store.status()).toBe('idle');
  });

  it('sends the previous turns and the page language', async () => {
    const api = new FakeChatApi(answer);
    const store = createStore(api, 'en');
    await store.send('What did he do at Canai?');
    await store.send('And at uMov?');

    expect(api.questions[1]).toEqual({
      message: 'And at uMov?',
      history: [
        { role: 'user', content: 'What did he do at Canai?' },
        { role: 'assistant', content: 'Fue Software Engineer.' },
      ],
      locale: 'en',
    });
  });

  it('turns a failure into an assistant message of that kind', async () => {
    const api = new FakeChatApi(answer);
    api.failure = new ChatApiError('tooMany');
    const store = createStore(api);
    await store.send('Hola');

    expect(store.messages().at(-1)).toEqual({ role: 'assistant', content: '', failure: 'tooMany' });
  });

  it('ignores empty questions', async () => {
    const api = new FakeChatApi(answer);
    const store = createStore(api);
    await store.send('   ');
    expect(api.questions).toHaveLength(0);
  });

  it('is disabled when no API is configured', () => {
    const store = createStore(null);
    expect(store.enabled).toBe(false);
    store.wakeUp();
  });
});
