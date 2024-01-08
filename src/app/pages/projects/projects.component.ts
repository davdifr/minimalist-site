import { Component, inject, OnInit } from '@angular/core';
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
import {first, Observable} from 'rxjs';
import {GitHubError, GitHubRepository} from "../../shared/models/github.models";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RepositoryComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  private store: Store<AppState> = inject(Store<AppState>);

  repositories$: Observable<GitHubRepository[] | null> = this.store.select(selectRepositories);
  error$: Observable<GitHubError | null> = this.store.select(selectRepositoriesError);
  isLoading$: Observable<boolean> = this.store.select(selectRepositoriesLoading);
  alreadyLoadedOnce$: Observable<boolean> = this.store.select(selectRepositoriesAlreadyLoadedOnce);

  ngOnInit(): void {
    this.alreadyLoadedOnce$.pipe(first()).subscribe((initialized) => {
      if (!initialized) {
        this.store.dispatch(fetchRepositories());
      }
    });
  }
}
