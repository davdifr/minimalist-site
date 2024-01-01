import { createReducer, on } from '@ngrx/store';
import { GitHubReadmeState } from './readme.state';
import {
  fetchReadme,
  fetchReadmeFailure,
  fetchReadmeSuccess,
} from './readme.actions';

const initialState: GitHubReadmeState = {
  data: null,
  isLoading: false,
  error: null,
};

export const githubReadmeReducer = createReducer(
  initialState,
  on(fetchReadme, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(fetchReadmeSuccess, (state, { data }) => ({
    ...state,
    data,
    isLoading: false,
  })),
  on(fetchReadmeFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }))
);
