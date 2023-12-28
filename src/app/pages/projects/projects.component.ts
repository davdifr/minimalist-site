import { Component, inject } from '@angular/core';
import { LoggerService } from '../../shared/services/logger.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  constructor(private loggerService: LoggerService) {}

  ngOnInit(): void {
    this.loggerService.log('ProjectsComponent initialized');
  }

  ngOnDestroy(): void {
    this.loggerService.log('ProjectsComponent destroyed');
  }
}
