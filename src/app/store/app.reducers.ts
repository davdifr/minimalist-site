import { githubReadmeReducer } from './github/readme/readme.reducer';
import { githubRepositoriesReducer } from './github/repositories/repositories.reducer';

export const reducers = {
  githubRepositories: githubRepositoriesReducer,
  githubReadme: githubReadmeReducer,
};
