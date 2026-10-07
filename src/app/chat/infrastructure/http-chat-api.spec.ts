import { ChatApiError, type ChatAnswerEvent } from '../application/chat-api.port';
import { failureFor, HttpChatApi } from './http-chat-api';
import { readSseEvents } from './sse';

/** A streamed response whose body arrives in the given pieces. */
function sseResponse(pieces: string[], status = 200): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const piece of pieces) controller.enqueue(encoder.encode(piece));
      controller.close();
    },
  });
  return new Response(body, { status });
}

const question = { message: 'Hola', history: [], locale: 'es' as const };

async function collect(events: AsyncIterable<ChatAnswerEvent>) {
  const all: ChatAnswerEvent[] = [];
  for await (const event of events) all.push(event);
  return all;
}

describe('readSseEvents', () => {
  it('parses events split across chunks, including multi-byte characters', async () => {
    const response = sseResponse([
      'data: {"type":"token","text":"¿Q',
      'ué?"}\n',
      '\ndata: {"type":"done"}\n\n',
    ]);
    const events = [];
    for await (const event of readSseEvents(response.body!)) events.push(event);
    expect(events).toEqual([{ type: 'token', text: '¿Qué?' }, { type: 'done' }]);
  });
});

describe('HttpChatApi', () => {
  it('posts the question and yields tokens and sources, skipping the final event', async () => {
    const calls: { url: string; init?: RequestInit }[] = [];
    const fetchFn = (async (url: string, init?: RequestInit) => {
      calls.push({ url, init });
      return sseResponse([
        'data: {"type":"token","text":"Hola"}\n\n',
        'data: {"type":"sources","sources":[]}\n\n',
        'data: {"type":"done"}\n\n',
      ]);
    }) as typeof fetch;

    const events = await collect(new HttpChatApi('https://api.test', fetchFn).ask(question));

    expect(calls[0].url).toBe('https://api.test/chat/stream');
    expect(JSON.parse(String(calls[0].init?.body))).toEqual(question);
    expect(events).toEqual([
      { type: 'token', text: 'Hola' },
      { type: 'sources', sources: [] },
    ]);
  });

  it('reports a connection failure when the request cannot be made', async () => {
    const fetchFn = (async () => {
      throw new TypeError('Failed to fetch');
    }) as typeof fetch;
    await expect(
      collect(new HttpChatApi('https://api.test', fetchFn).ask(question)),
    ).rejects.toEqual(new ChatApiError('connection'));
  });

  it('maps HTTP statuses to failures', async () => {
    const fetchFn = (async () => new Response('{}', { status: 429 })) as typeof fetch;
    await expect(
      collect(new HttpChatApi('https://api.test', fetchFn).ask(question)),
    ).rejects.toMatchObject({
      failure: 'tooMany',
    });
    expect([failureFor(400), failureFor(503)]).toEqual(['invalid', 'unavailable']);
  });

  it('reports an error event in the middle of the stream as unavailable', async () => {
    const fetchFn = (async () =>
      sseResponse([
        'data: {"type":"token","text":"Ho"}\n\n',
        'data: {"type":"error","message":"x"}\n\n',
      ])) as typeof fetch;
    await expect(
      collect(new HttpChatApi('https://api.test', fetchFn).ask(question)),
    ).rejects.toMatchObject({
      failure: 'unavailable',
    });
  });
});
