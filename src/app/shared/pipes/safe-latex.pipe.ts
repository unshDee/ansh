import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import katex from 'katex';

@Pipe({ name: 'safeLatex', standalone: true })
export class SafeLatexPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(latex: string, displayMode: boolean = true): SafeHtml {
    const html = katex.renderToString(latex, {
      throwOnError: false,
      displayMode,
    });
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
