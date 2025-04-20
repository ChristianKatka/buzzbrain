import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as authEffects from '../store/effects/auth/auth.effects';
import * as gameCategoriesEffects from '../store/effects/game-categories.effects';
import { metaReducers } from '../store/reducers';
import { authTokensReducer } from '../store/reducers/auth/auth-tokens.reducer';
import { authUiReducer } from '../store/reducers/auth/auth-ui.reducer';
import { gameCategoriesReducer } from '../store/reducers/game-categories.reducer';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(
      {
        authTokens: authTokensReducer,
        authUi: authUiReducer,
        // gameCategories: gameCategoriesReducer,
      },
      {
        metaReducers: metaReducers,
      }
    ),
    provideEffects(authEffects, gameCategoriesEffects),
    provideStoreDevtools({
      maxAge: 25,
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: false,
    }),
    provideHttpClient(),
  ],
};
