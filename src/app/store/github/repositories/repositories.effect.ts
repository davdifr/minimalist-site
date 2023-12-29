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
import { Injectable } from '@angular/core';

@Injectable()
export class GitHubRepositoriesEffects {
  constructor(
    private actions$: Actions,
    private githubService: GitHubService,
    private loggerService: LoggerService,
    private errorService: ErrorService
  ) {}

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
        this.loggerService.log(
          '[GitHub Repositories] Fetch Repositories effect triggered'
        );
        return this.githubService.getRepositories().pipe(
          map((data: GitHubRepository[]) => {
            this.loggerService.log(
              '[GitHub Repositories] Fetch Repositories effect completed successfully'
            );
            return fetchRepositoriesSuccess({ data });
          }),
          catchError((error: any) => {
            this.loggerService.error(
              '[GitHub Repositories] Fetch Repositories effect failed'
            );
            this.errorService.handleError(error);
            return of(fetchRepositoriesFailure({ error }));
          })
        );
      })
    )
  );
}
