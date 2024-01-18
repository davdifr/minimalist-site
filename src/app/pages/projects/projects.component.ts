import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
    selectRepositories,
    selectRepositoriesAlreadyLoadedOnce,
    selectRepositoriesError,
    selectRepositoriesLoading,
} from '../../store/github/repositories/repositories.selectors';
import { CommonModule } from '@angular/common';
import { fetchRepositories } from '../../store/github/repositories/repositories.actions';
import { RepositoryComponent } from '../../components/repository/repository.component';
import { first, Observable } from 'rxjs';
import {
    GitHubError,
    GitHubRepository,
} from '../../shared/models/github.models';
import { RetryComponent } from '../../components/retry/retry.component';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule, RepositoryComponent, RetryComponent],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
    #store: Store<AppState> = inject(Store<AppState>);
    #alreadyLoadedOnce$: Observable<boolean> = this.#store.select(
        selectRepositoriesAlreadyLoadedOnce
    );

    repositories$: Observable<GitHubRepository[] | null> =
        this.#store.select(selectRepositories);
    isLoading$: Observable<boolean> = this.#store.select(
        selectRepositoriesLoading
    );
    error$: Observable<GitHubError | null> = this.#store.select(
        selectRepositoriesError
    );

    ngOnInit(): void {
        this.fetchRepositories();
    }

    fetchRepositories(): void {
        this.#alreadyLoadedOnce$.pipe(first()).subscribe((initialized) => {
            if (!initialized) {
                this.#store.dispatch(fetchRepositories());
            }
        });
    }
}
