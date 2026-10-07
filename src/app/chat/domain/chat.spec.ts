import { historyFor, MAX_HISTORY_TURNS, type ChatMessage } from './chat';

describe('historyFor', () => {
  it('leaves out failed answers', () => {
    const messages: ChatMessage[] = [
      { role: 'user', content: 'Hola' },
      { role: 'assistant', content: '', failure: 'tooMany' },
      { role: 'user', content: '¿Qué hizo en Canai?' },
      { role: 'assistant', content: 'Fue Software Engineer.', sources: [{ es: 'a', en: 'b' }] },
    ];
    expect(historyFor(messages)).toEqual([
      { role: 'user', content: 'Hola' },
      { role: 'user', content: '¿Qué hizo en Canai?' },
      { role: 'assistant', content: 'Fue Software Engineer.' },
    ]);
  });

  it('keeps only the last turns, each within the length limit', () => {
    const messages: ChatMessage[] = Array.from({ length: 14 }, (_, i) => ({
      role: i % 2 ? 'assistant' : 'user',
      content: `${i}`.repeat(i === 13 ? 3000 : 1),
    }));
    const history = historyFor(messages);
    expect(history).toHaveLength(MAX_HISTORY_TURNS);
    expect(history[0].content).toBe('4');
    expect(history.at(-1)?.content).toHaveLength(2000);
  });
});
