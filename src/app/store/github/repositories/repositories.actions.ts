import { createAction, props } from '@ngrx/store';
import { GitHubRepositories } from '../../../shared/models/github.models';

/**
 * Action to fetch GitHub repositories.
 * This action is dispatched to initiate the process of fetching repositories from GitHub.
 */
export const fetchRepositories = createAction(
  '[GitHub Repositories] Fetch Repositories'
);

/**
 * Action dispatched when the repositories have been successfully fetched.
 * This action is dispatched when the asynchronous operation of fetching repositories from GitHub has completed successfully.
 * @param {GitHubRepositories[]} repositories - An array of GitHubRepositories objects representing the fetched repositories.
 */
export const fetchRepositoriesSuccess = createAction(
  '[GitHub Repositories] Fetch Repositories Success',
  props<{ repositories: GitHubRepositories[] }>()
);

/**
 * Action dispatched when there is an error fetching the repositories.
 * This action is dispatched when the asynchronous operation of fetching repositories from GitHub has failed.
 * @param {string} error - A string representing the error message.
 */
export const fetchRepositoriesFailure = createAction(
  '[GitHub Repositories] Fetch Repositories Failure',
  props<{ error: string }>()
);
