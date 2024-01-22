import { Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/about',
        pathMatch: 'full',
    },
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'about',
                loadComponent: () => import('./pages/about/about.component'),
                data: {
                    title: 'About',
                    showInNavbar: true,
                },
            },
            {
                path: 'projects',
                loadComponent: () =>
                    import('./pages/projects/projects.component'),
                data: {
                    title: 'Projects',
                    showInNavbar: true,
                },
            },
        ],
    },
    {
        path: '404',
        component: NotFoundComponent,
        data: {
            title: '404 - Not Found',
            showInNavbar: false,
        },
    },
    {
        path: '**',
        redirectTo: '/404',
    },
];
