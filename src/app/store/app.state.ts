import { GitHubRepositoriesState } from './github/repositories/repositories.state';

/**
 * Interface representing the overall state of the application.
 */
export interface AppState {
  githubRepositories: GitHubRepositoriesState;
}

/**
 * Generic interface for representing the state of a data request operation.
 *
 * @template T The type of the data being requested.
 * @template E The type of any error that might occur during the request.
 */
export interface RequestState<T, E> {
  data: T;
  isLoading: boolean;
  error: E | null;
}
