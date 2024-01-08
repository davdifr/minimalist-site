import { CommonModule } from '@angular/common';
import { Component, Input, inject, OnInit } from '@angular/core';
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
export class ReadmeComponent implements  OnInit{
  @Input('encoded') encoded: string = '';
  private base64: Base64Service = inject(Base64Service);

  content: string = '';

  ngOnInit(): void {
    this.content = this.base64.decode(this.encoded);
  }
}
