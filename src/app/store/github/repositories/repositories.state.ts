import {
  GitHubError,
  GitHubRepository,
} from '../../../shared/models/github.models';
import { RequestState } from '../../app.state';

export type GitHubRepositoriesState = RequestState<
  GitHubRepository[],
  GitHubError
>;
