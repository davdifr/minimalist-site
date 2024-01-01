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

  repositories$ = this.store.select(selectRepositories);
  repositoriesError$ = this.store.select(selectRepositoriesError);
  repositoriesIsLoading$ = this.store.select(selectRepositoriesLoading);

  constructor() {
    this.fetchRepositories();
  }

  ngOnInit(): void {
    this.logger.log('ProjectsComponent initialized');
  }

  ngOnDestroy(): void {
    this.logger.log('ProjectsComponent destroyed');
  }

  private fetchRepositories(): void {
    this.store.dispatch(fetchRepositories());
  }
}
