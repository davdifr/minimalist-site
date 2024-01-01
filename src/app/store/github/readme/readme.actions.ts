import { createAction, props } from '@ngrx/store';
import {
  GitHubError,
  GitHubReadme,
} from '../../../shared/models/github.models';

export const fetchReadme = createAction('[GitHub Readme] Fetch Readme');

export const fetchReadmeSuccess = createAction(
  '[GitHub Readme] Fetch Readme Success',
  props<{ data: GitHubReadme }>()
);

export const fetchReadmeFailure = createAction(
  '[GitHub Readme] Fetch Readme Failure',
  props<{ error: GitHubError }>()
);
