import { Injectable, inject } from '@angular/core';
import { Route, Router } from '@angular/router';

/**
 * Retrieves the navigation routes that should be displayed in the navbar.
 * @returns An array of Route objects representing the navigation routes.
 */
@Injectable({ providedIn: 'root' })
export class NavigationService {
  router = inject(Router);

  getNavigationRoutes(): Route[] {
    return this.router.config
      .flatMap((route) => [route, ...(route.children || [])])
      .filter((route) => route.data?.['showInNavbar']);
  }
}
