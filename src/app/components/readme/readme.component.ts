import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';
import { SanitizePipe } from '../../shared/pipes/sanitize.pipe';
import { Base64Service } from '../../shared/services/base64.service';

@Component({
  selector: 'app-readme',
  standalone: true,
  imports: [CommonModule, MarkdownPipe, SanitizePipe],
  styleUrl: './readme.component.css',
  template: ` <div [innerHTML]="content | markdown | sanitize"></div>`,
})
export class ReadmeComponent {
  private base64 = inject(Base64Service);
  @Input('encoded') encoded: string = '';

  content: string = '';

  ngOnInit() {
    this.content = this.base64.decode(this.encoded);
  }
}
