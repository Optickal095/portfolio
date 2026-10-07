/** Languages the assistant answers in; also the languages of the site. */
export type ChatLocale = 'es' | 'en';

/** A CV section an answer cites, named in both languages of the site. */
export interface ChatSource {
  es: string;
  en: string;
}

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

/** Why an answer could not be given; the page shows its own text for each. */
export type ChatFailure = 'connection' | 'tooMany' | 'invalid' | 'unavailable';

export interface ChatMessage extends ChatTurn {
  sources?: ChatSource[];
  /** Set when this assistant message reports a failure instead of an answer. */
  failure?: ChatFailure;
}

/** The API accepts up to 10 previous turns of up to 2000 characters each. */
export const MAX_HISTORY_TURNS = 10;
export const MAX_TURN_LENGTH = 2000;

/** The previous turns sent with a new question: failures left out, within the API's limits. */
export function historyFor(messages: ChatMessage[]): ChatTurn[] {
  return messages
    .filter((message) => !message.failure)
    .slice(-MAX_HISTORY_TURNS)
    .map(({ role, content }) => ({ role, content: content.slice(0, MAX_TURN_LENGTH) }));
}
