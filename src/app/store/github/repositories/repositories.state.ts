import { GitHubRepositories } from '../../../shared/models/github.models';

export interface GitHubRepositoriesState {
  repositories: GitHubRepositories[];
  isLoading: boolean;
  error: string;
}
