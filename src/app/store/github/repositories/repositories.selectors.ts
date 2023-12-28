import { GitHubRepositories } from '../../../shared/models/github.models';
import { AppState } from '../../app.state';

/**
 * Selector for GitHub repositories.
 * This selector is used to select the repositories from the state.
 * @param {AppState} state - The state of the application.
 * @returns {GitHubRepositories[]} - An array of GitHubRepositories objects representing the repositories.
 */
export const selectRepositories = (state: AppState): GitHubRepositories[] =>
  state.githubRepositories.repositories;

/**
 * Selector for GitHub repositories error.
 * This selector is used to select the error from the state.
 * @param {AppState} state - The state of the application.
 * @returns {string} - A string representing the error message.
 */
export const selectRepositoriesError = (state: AppState): any =>
  state.githubRepositories.error;

/**
 * Selector for GitHub repositories loading state.
 * This selector is used to select the loading state from the state.
 * @param {AppState} state - The state of the application.
 * @returns {boolean} - A boolean indicating whether the repositories are being loaded.
 */
export const selectRepositoriesLoading = (state: AppState): boolean =>
  state.githubRepositories.isLoading;