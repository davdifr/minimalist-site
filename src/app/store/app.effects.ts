import { GitHubReadmeEffects } from './github/readme/readme.effects';
import { GitHubRepositoriesEffects } from './github/repositories/repositories.effects';

export const effects = [GitHubRepositoriesEffects, GitHubReadmeEffects];
