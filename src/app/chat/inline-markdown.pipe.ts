import { Pipe, PipeTransform } from '@angular/core';

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Turns the model's `**bold**` into `<strong>`. Everything else is escaped
 * first, so the answer can never inject markup.
 *
 * While an answer streams in, a `**` can arrive before its closing pair;
 * leftover markers are dropped so they never flash on screen.
 */
@Pipe({ name: 'inlineMarkdown' })
export class InlineMarkdownPipe implements PipeTransform {
  transform(text: string): string {
    return text
      .replace(/[&<>"']/g, (char) => ESCAPES[char])
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replaceAll('**', '');
  }
}
