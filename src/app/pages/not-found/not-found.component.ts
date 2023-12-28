import { Component } from '@angular/core';
import { LoggerService } from '../../shared/services/logger.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  styleUrl: './not-found.component.css',
  template: `<h1>404 - Not Found</h1>`,
})
export class NotFoundComponent {
  constructor(private loggerService: LoggerService) {}

  ngOnInit(): void {
    this.loggerService.log('NotFoundComponent initialized');
  }
  ngOnDestroy(): void {
    this.loggerService.log('NotFoundComponent destroyed');
  }
}
