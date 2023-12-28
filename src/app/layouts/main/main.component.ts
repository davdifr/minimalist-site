import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { LoggerService } from '../../shared/services/logger.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  template: `<app-navbar></app-navbar> <router-outlet></router-outlet>`,
})
export class MainComponent {
  constructor(private loggerService: LoggerService) {}

  ngOnInit() {
    this.loggerService.log('MainLayoutComponent initialized');
  }
  ngOnDestroy() {
    this.loggerService.log('MainLayoutComponent destroyed');
  }
}
