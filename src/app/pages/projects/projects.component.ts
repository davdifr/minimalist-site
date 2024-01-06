import { Component, inject } from '@angular/core';
import { LoggerService } from '../../shared/services/logger.service';
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
  error$ = this.store.select(selectRepositoriesError);
  isLoading$ = this.store.select(selectRepositoriesLoading);
  alreadyLoadedOnce$ = this.store.select(selectRepositoriesAlreadyLoadedOnce);

  ngOnInit(): void {
    this.logger.log('ProjectsComponent initialized');

    this.alreadyLoadedOnce$.subscribe((initialized) => {
      if (!initialized) {
        this.store.dispatch(fetchRepositories());
      }
    });
  }

  ngOnDestroy(): void {
    this.logger.log('ProjectsComponent destroyed');
  }
}
