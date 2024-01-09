import { createReducer, on } from '@ngrx/store';
import { GitHubRepositoriesState } from './repositories.state';
import {
  fetchRepositories,
  fetchRepositoriesFailure,
  fetchRepositoriesSuccess,
} from './repositories.actions';

const initialState: GitHubRepositoriesState = {
  data: [],
  isLoading: false,
  error: null,
  alreadyLoadedOnce: false,
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
    error: null,
  })),
  on(fetchRepositoriesSuccess, (state, { data }) => ({
    ...state,
    data,
    isLoading: false,
    error: null,
    alreadyLoadedOnce: true,
  })),
  on(fetchRepositoriesFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }))
);
