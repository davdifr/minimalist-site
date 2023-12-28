import { createReducer, on } from '@ngrx/store';
import { GitHubRepositoriesState } from './repositories.state';
import {
  fetchRepositories,
  fetchRepositoriesFailure,
  fetchRepositoriesSuccess,
} from './repositories.actions';

const initialState: GitHubRepositoriesState = {
  repositories: [],
  isLoading: false,
  error: '',
};

/**
 * Reducer function for managing the state of GitHub repositories.
 * @param state - The current state of the GitHub repositories.
 * @param action - The action being dispatched.
 * @returns The new state of the GitHub repositories.
 */
export const githubRepositoriesReducer = createReducer(
  initialState,
  on(fetchRepositories, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(fetchRepositoriesSuccess, (state, { repositories }) => ({
    ...state,
    repositories,
    isLoading: false,
  })),
  on(fetchRepositoriesFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }))
);
