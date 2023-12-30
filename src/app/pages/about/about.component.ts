import { Component, inject } from '@angular/core';
import { LoggerService } from '../../shared/services/logger.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  private logger = inject(LoggerService);

  ngOnInit(): void {
    this.logger.log('AboutComponent initialized');
  }

  ngOnDestroy(): void {
    this.logger.log('AboutComponent destroyed');
  }
}
