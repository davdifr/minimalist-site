import { Component, inject } from '@angular/core';
import { LoggerService } from '../../shared/services/logger.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import {
  GitHubError,
  GitHubRepository,
} from '../../shared/models/github.models';
import {
  selectRepositories,
  selectRepositoriesError,
  selectRepositoriesLoading,
} from '../../store/github/repositories/repositories.selectors';
import { CommonModule } from '@angular/common';
import { fetchRepositories } from '../../store/github/repositories/repositories.actions';
import { RepositoryComponent } from '../../components/repository/repository.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RepositoryComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  private store = inject(Store<AppState>);
  private logger = inject(LoggerService);

  repositories$: Observable<GitHubRepository[] | null> =
    this.store.select(selectRepositories);

  repositoriesError$: Observable<GitHubError | null> = this.store.select(
    selectRepositoriesError
  );

  repositoriesIsLoading$: Observable<boolean> = this.store.select(
    selectRepositoriesLoading
  );

  ngOnInit(): void {
    this.logger.log('ProjectsComponent initialized');
    this.fetchRepositories();
  }

  ngOnDestroy(): void {
    this.logger.log('ProjectsComponent destroyed');
  }

  private fetchRepositories(): void {
    this.store.dispatch(fetchRepositories());
  }
}
