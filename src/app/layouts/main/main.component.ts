import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { LoggerService } from '../../shared/services/logger.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  template: `<app-navbar></app-navbar>
    <main id="content" role="main">
      <router-outlet></router-outlet>
    </main>`,
})
export class MainComponent {
  logger = inject(LoggerService);

  ngOnInit() {
    this.logger.log('MainLayoutComponent initialized');
  }
  ngOnDestroy() {
    this.logger.log('MainLayoutComponent destroyed');
  }
}
