import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import katex from 'katex';

@Pipe({ name: 'safeLatex', standalone: true })
export class SafeLatexPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(latex: string, ...args: any[]): SafeHtml {
    const html = katex.renderToString(latex, {
      throwOnError: false,
      displayMode: true,
    });
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
