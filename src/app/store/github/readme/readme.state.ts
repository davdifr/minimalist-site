import {
  GitHubError,
  GitHubReadme,
} from '../../../shared/models/github.models';
import { RequestState } from '../../app.state';

export type GitHubReadmeState = RequestState<GitHubReadme, GitHubError>;
