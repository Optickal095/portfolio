import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { environment } from '../environments/environment';
import { CHAT_API } from './chat/application/chat-api.port';
import { HttpChatApi } from './chat/infrastructure/http-chat-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Composition root of the chat: the HTTP adapter when an API URL is configured, none otherwise.
    {
      provide: CHAT_API,
      useFactory: () => (environment.chatApiUrl ? new HttpChatApi(environment.chatApiUrl) : null),
    },
  ],
};
