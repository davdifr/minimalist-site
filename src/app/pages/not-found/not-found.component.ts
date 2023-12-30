import { Component, inject } from '@angular/core';
import { LoggerService } from '../../shared/services/logger.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  styleUrl: './not-found.component.css',
  template: `<h1>404 - Not Found</h1>`,
})
export class NotFoundComponent {
  private logger = inject(LoggerService);

  ngOnInit(): void {
    this.logger.log('NotFoundComponent initialized');
  }
  ngOnDestroy(): void {
    this.logger.log('NotFoundComponent destroyed');
  }
}
