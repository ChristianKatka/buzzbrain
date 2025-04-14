import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import * as authEffects from './auth/store/effects/auth.effects';
import { metaReducers } from './auth/store/reducers';
import { authTokensReducer } from './auth/store/reducers/auth-tokens.reducer';
import { authUiReducer } from './auth/store/reducers/auth-ui.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(
      {
        authTokens: authTokensReducer,
        authUi: authUiReducer,
      },
      {
        metaReducers: metaReducers,
      }
    ),
    provideEffects(authEffects),
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
