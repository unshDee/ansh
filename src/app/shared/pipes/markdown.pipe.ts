import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

marked.use({
  renderer: {
    link(token) {
      const text = this.parser.parseInline(token.tokens);
      const title = token.title ? ` title="${token.title}"` : '';
      return `<a href="${token.href}"${title} target="_blank" rel="noopener noreferrer">${text}</a>`;
    },

    image(token) {
      const parts = (token.text ?? '').split('|');
      const alt = parts[0].trim();
      const mods = parts.slice(1).map((m) => m.trim().toLowerCase());

      const classes = ['md-img'];
      const styles: string[] = [];

      // Size: small | medium | large | 50% (any percent)
      const pct = mods.find((m) => /^\d+%$/.test(m));
      if (pct) {
        styles.push(`max-width:${pct}`);
      } else if (mods.includes('small')) {
        classes.push('md-img-small');
      } else if (mods.includes('medium')) {
        classes.push('md-img-medium');
      } else if (mods.includes('large')) {
        classes.push('md-img-large');
      }

      // Alignment: left | center | right
      if (mods.includes('right')) classes.push('md-img-right');
      else if (mods.includes('center')) classes.push('md-img-center');
      else if (mods.includes('left')) classes.push('md-img-left');

      const title = token.title ? ` title="${token.title}"` : '';
      const style = styles.length ? ` style="${styles.join(';')}"` : '';
      return `<img src="${token.href}" alt="${alt}"${title} class="${classes.join(' ')}"${style}>`;
    },
  },
});

@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return marked.parse(value) as string;
  }
}
