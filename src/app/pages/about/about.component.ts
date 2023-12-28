import { Component } from '@angular/core';
import { LoggerService } from '../../shared/services/logger.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  constructor(private loggerService: LoggerService) {}

  ngOnInit(): void {
    this.loggerService.log('AboutComponent initialized');
  }

  ngOnDestroy(): void {
    this.loggerService.log('AboutComponent destroyed');
  }
}
