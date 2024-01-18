import { Component, inject, OnInit } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NavigationService } from '../../shared/services/navigation.service';
import { GlobalKeydownService } from '../../shared/services/global-keydown.service';
import { Subject, takeUntil } from 'rxjs';

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
                <span title="Press {{ $index + 1 }} to navigate to this page">
                    [ {{ $index + 1 }} ]
                </span>
            </li>
            }
        </ul>
    </nav>`,
})
export class NavbarComponent implements OnInit {
    #navigation = inject(NavigationService);
    #keydown = inject(GlobalKeydownService);
    #destroy$ = new Subject();

    routes: Route[] = [];

    ngOnInit(): void {
        this.routes = this.getRoutes();

        this.#keydown.keydownEvents$
            .pipe(takeUntil(this.#destroy$))
            .subscribe((key) => {
                this.navigateByKey(key);
            });
    }

    private getRoutes(): Route[] {
        return this.#navigation.getNavigationRoutes();
    }

    private navigateByKey(key: string): void {
        const index = parseInt(key, 10) - 1;
        if (index >= 0 && index < this.routes.length) {
            this.#navigation.navigateTo(this.routes[index].path as string);
        }
    }

    ngOnDestroy(): void {
        this.#destroy$.next(true);
        this.#destroy$.complete();
    }
}
