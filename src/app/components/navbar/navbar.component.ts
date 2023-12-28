import { Component } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoggerService } from '../../shared/services/logger.service';
import { NavigationService } from '../../shared/services/navigation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  styleUrl: './navbar.component.css',
  template: `<nav aria-label="Main navigation">
    <ul>
      @for (route of routes; track $index) {
      <li>
        <a routerLink="{{ route.path }}" routerLinkActive="">{{
          route.data?.['title']
        }}</a>
      </li>
      }
    </ul>
  </nav>`,
})
export class NavbarComponent {
  routes: Route[] = [];

  constructor(
    private navigationService: NavigationService,
    private loggerService: LoggerService
  ) {}

  ngOnInit(): void {
    this.loggerService.log('NavbarComponent initialized');

    // Get the navigation routes from the NavigationService.
    this.routes = this.navigationService.getNavigationRoutes();
  }

  ngOnDestroy(): void {
    this.loggerService.log('NavbarComponent destroyed');
  }
}
