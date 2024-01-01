import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GitHubService } from '../../../shared/services/github.service';
import { LoggerService } from '../../../shared/services/logger.service';
import { ErrorService } from '../../../shared/services/error.service';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  fetchRepositories,
  fetchRepositoriesFailure,
  fetchRepositoriesSuccess,
} from './repositories.actions';
import { GitHubRepository } from '../../../shared/models/github.models';
import { Injectable, inject } from '@angular/core';

@Injectable()
export class GitHubRepositoriesEffects {
  private actions$ = inject(Actions);
  private github = inject(GitHubService);
  private logger = inject(LoggerService);
  private error = inject(ErrorService);

  /**
   * Effect to fetch GitHub repositories.
   * This effect is triggered when the fetchRepositories action is dispatched.
   * It calls the GitHubService to fetch the repositories, dispatches the fetchRepositoriesSuccess action if the operation is successful,
   * and dispatches the fetchRepositoriesFailure action if the operation fails.
   */
  fetchGitHubRepositories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRepositories),
      switchMap(() => {
        this.logger.log(
          '[GitHub Repositories] Fetch Repositories effect triggered'
        );
        return this.github.getRepositories().pipe(
          map((data: GitHubRepository[]) => {
            this.logger.log(
              '[GitHub Repositories] Fetch Repositories effect completed successfully'
            );
            return fetchRepositoriesSuccess({ data });
          }),
          catchError((error: any) => {
            this.logger.error(
              '[GitHub Repositories] Fetch Repositories effect failed'
            );
            this.error.handleError(error);
            return of(fetchRepositoriesFailure({ error }));
          })
        );
      })
    )
  );
}
