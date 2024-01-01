import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

@Pipe({
  name: 'markdown',
  standalone: true,
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string): string {
    return marked.parse(value) as string;
  }
}
