import { Component, inject } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NavigationService } from '../../shared/services/navigation.service';
import { printLog } from '../../shared/decorators/print-log.decorator';

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
  private navigation = inject(NavigationService);
  routes: Route[] = [];

  ngOnInit(): void {
    this.routes = this.getRoutes();
  }

  //@printLog
  private getRoutes(): Route[] {
    return this.navigation.getNavigationRoutes();
  }
}
