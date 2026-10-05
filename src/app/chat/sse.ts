/**
 * Reads a Server-Sent Events response body and yields the JSON of each
 * `data:` field.
 *
 * `EventSource` only supports GET, and the chat API takes the question in a
 * POST body, so the stream is parsed by hand from `fetch`.
 */
export async function* readSseEvents<T>(body: ReadableStream<Uint8Array>): AsyncGenerator<T> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) return;
    // `stream: true` keeps a multi-byte character split across chunks intact.
    buffer += decoder.decode(value, { stream: true }).replaceAll('\r\n', '\n');

    let end: number;
    while ((end = buffer.indexOf('\n\n')) !== -1) {
      const block = buffer.slice(0, end);
      buffer = buffer.slice(end + 2);
      const data = block
        .split('\n')
        .filter((line) => line.startsWith('data:'))
        .map((line) => line.slice('data:'.length).trimStart())
        .join('\n');
      if (data) yield JSON.parse(data) as T;
    }
  }
}
