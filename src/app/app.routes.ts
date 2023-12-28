import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '404',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    data: {
      title: '404 - Not Found',
      showInNavbar: true,
    },
  },
  {
    path: '**',
    redirectTo: '/404',
    data: {
      title: '404 - Not Found',
      showInNavbar: false,
    },
  },
];
