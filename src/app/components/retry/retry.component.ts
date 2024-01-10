import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-retry',
  standalone: true,
  imports: [],
  styleUrl: './retry.component.css',
  template: `<button (click)="retryClicked()">Retry</button>`,
})
export class RetryComponent {
  @Output() retry = new EventEmitter<void>();

  retryClicked(): void {
    this.retry.emit();
  }
}
