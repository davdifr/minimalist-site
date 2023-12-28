import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { preventDuplicateRequests } from './interceptors/prevent-duplicate.interceptor';
import { provideStore } from '@ngrx/store';
import { reducers } from './store/app.reducers';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { GitHubRepositoriesEffects } from './store/github/repositories/repositories.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(reducers),
    provideHttpClient(withInterceptors([preventDuplicateRequests])),
    provideStore(),
    provideEffects(GitHubRepositoriesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
