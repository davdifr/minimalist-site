import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GitHubService } from '../../../shared/services/github.service';
import { LoggerService } from '../../../shared/services/logger.service';
import { ErrorService } from '../../../shared/services/error.service';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  fetchReadme,
  fetchReadmeFailure,
  fetchReadmeSuccess,
} from './readme.actions';
import { GitHubReadme } from '../../../shared/models/github.models';

export class GitHubReadmeEffects {
  private action$: Actions<any> = inject(Actions);
  private github: GitHubService = inject(GitHubService);
  private logger: LoggerService = inject(LoggerService);
  private error: ErrorService = inject(ErrorService);

  fetchGitHubReadme$ = createEffect(() =>
    this.action$.pipe(
      ofType(fetchReadme),
      switchMap(() => {
        this.logger.log('[GitHub Readme] Fetch Readme effect triggered');
        return this.github.getReadme().pipe(
          map((data: GitHubReadme) => {
            this.logger.log(
              '[GitHub Readme] Fetch Readme effect completed successfully'
            );
            return fetchReadmeSuccess({ data });
          }),
          catchError((error: any) => {
            this.logger.error('[GitHub Readme] Fetch Readme effect failed');
            this.error.handleError(error);
            return of(fetchReadmeFailure({ error }));
          })
        );
      })
    )
  );
}
