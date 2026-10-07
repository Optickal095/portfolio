import { InjectionToken } from '@angular/core';
import type { ChatFailure, ChatLocale, ChatSource, ChatTurn } from '../domain/chat';

export interface ChatQuestion {
  message: string;
  history: ChatTurn[];
  locale: ChatLocale;
}

/** An answer as it arrives: its text in pieces, then the sources it cites. */
export type ChatAnswerEvent =
  { type: 'token'; text: string } | { type: 'sources'; sources: ChatSource[] };

/** Raised by adapters with the kind of failure, never with transport details. */
export class ChatApiError extends Error {
  readonly failure: ChatFailure;

  constructor(failure: ChatFailure) {
    super(failure);
    this.failure = failure;
  }
}

/** Port to the "Pregúntale a mi CV" assistant. */
export interface ChatApi {
  ask(question: ChatQuestion): AsyncIterable<ChatAnswerEvent>;
  /** The server sleeps when idle on its free plan: a cheap request wakes it before the visitor asks. */
  wakeUp(): void;
}

/** `null` when no API is configured: the chat section is hidden. */
export const CHAT_API = new InjectionToken<ChatApi | null>('ChatApi');
