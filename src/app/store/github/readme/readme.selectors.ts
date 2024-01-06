import {
  GitHubError,
  GitHubReadme,
} from '../../../shared/models/github.models';
import { AppState } from '../../app.state';

export const selectReadme = (state: AppState): GitHubReadme | null =>
  state.githubReadme.data;

export const selectReadmeError = (state: AppState): GitHubError | null =>
  state.githubReadme.error;

export const selectReadmeLoading = (state: AppState): boolean =>
  state.githubReadme.isLoading;

export const selectReadmeAlreadyLoadedOnce = (state: AppState): boolean =>
  state.githubReadme.alreadyLoadedOnce;
