import { GitHubRepositoriesState } from './github/repositories/repositories.state';

export interface AppState {
  githubRepositories: GitHubRepositoriesState;
}
