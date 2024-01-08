import { Component, inject, OnInit } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
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
export class NavbarComponent implements OnInit {
  private navigation: NavigationService = inject(NavigationService);
  routes: Route[] = [];

  ngOnInit(): void {
    this.routes = this.getRoutes();
  }

  private getRoutes(): Route[] {
    return this.navigation.getNavigationRoutes();
  }
}
