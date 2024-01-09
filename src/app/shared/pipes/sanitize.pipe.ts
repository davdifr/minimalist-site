import { Pipe, PipeTransform, SecurityContext, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { printLog } from '../decorators/print-log.decorator';

@Pipe({
  name: 'sanitize',
  standalone: true,
})
export class SanitizePipe implements PipeTransform {
  #sanitizer: DomSanitizer = inject(DomSanitizer);

  // @printLog
  transform(value: string): SafeHtml {
    return this.#sanitizer.bypassSecurityTrustHtml(value);
    // const sanitizedContent = this.sanitizer.sanitize(
    //   SecurityContext.HTML,
    //   value
    // );

    // if (!sanitizedContent) {
    //   throw new Error('Sanitization failed for HTML content');
    // }

    // return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);
  }
}
