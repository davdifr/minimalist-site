import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { LoggerService } from '../../shared/services/logger.service';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent, ThemeToggleComponent, RouterOutlet],
  template: `<app-navbar></app-navbar>
    <app-theme-toggle></app-theme-toggle>
    <main id="content" role="main">
      <router-outlet></router-outlet>
    </main>`,
})
export class MainComponent {
  private logger = inject(LoggerService);

  ngOnInit() {
    this.logger.log('MainLayoutComponent initialized');
  }
  ngOnDestroy() {
    this.logger.log('MainLayoutComponent destroyed');
  }
}
