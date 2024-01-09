import {
  Component,
  ComponentRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
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
import { first, Observable, Subject, Subscription, takeUntil } from 'rxjs';
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
export class ProjectsComponent implements OnInit, OnDestroy {
  @ViewChild('retryComponent', { read: ViewContainerRef })
  container?: ViewContainerRef;

  #injector: Injector = inject(Injector);
  #destroy$: Subject<void> = new Subject();

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

    this.error$.pipe(takeUntil(this.#destroy$)).subscribe((error) => {
      if (error) {
        this.showRetryComponent();
      } else {
        this.container?.clear();
      }
    });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  private fetchRepositories(): void {
    this.#alreadyLoadedOnce$.pipe(first()).subscribe((initialized) => {
      if (!initialized) {
        this.#store.dispatch(fetchRepositories());
      }
    });
  }

  private showRetryComponent(): void {
    if (!this.container) {
      return;
    }

    this.container?.clear();

    const componentRef: ComponentRef<RetryComponent> =
      this.container?.createComponent(RetryComponent, {
        injector: this.#injector,
      });

    const subscription: Subscription = componentRef.instance.retry.subscribe(
      () => {
        subscription.unsubscribe();
        this.fetchRepositories();
      }
    );
  }
}
