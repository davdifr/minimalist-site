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
import { GitHubRepositories } from '../../../shared/models/github.models';
import { Injectable } from '@angular/core';

/**
 * Effects for GitHub repositories.
 * This class contains the effects for the GitHub repositories.
 */
@Injectable()
export class GitHubRepositoriesEffects {
  /**
   * Constructor for the GitHubRepositoriesEffects class.
   * @param {Actions} actions$ - An Observable of actions provided by NgRx.
   * @param {GitHubService} githubService - The service to fetch GitHub repositories.
   * @param {LoggerService} loggerService - The service to log messages.
   * @param {ErrorService} errorService - The service to handle errors.
   */
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
          'GitHubRepositoriesEffects.fetchGitHubRepositories$'
        );
        return this.githubService.getRepositories().pipe(
          map((repositories: GitHubRepositories[]) => {
            this.loggerService.log(
              'GitHubRepositoriesEffects.fetchGitHubRepositories$ - success'
            );
            return fetchRepositoriesSuccess({ repositories });
          }),
          catchError((error: any) => {
            this.loggerService.error(
              'GitHubRepositoriesEffects.fetchGitHubRepositories$ - error'
            );
            this.errorService.handleError(error);
            return of(fetchRepositoriesFailure({ error }));
          })
        );
      })
    )
  );
}
