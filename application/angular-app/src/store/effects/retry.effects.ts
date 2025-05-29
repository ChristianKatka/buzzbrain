import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  delay,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthService } from '../../app/auth/services/auth.service';
import { AuthActions, RetryActions } from '../actions';
import { AuthTokensSelectors } from '../selectors';

// This is needed when user lefts the app open and token will expire
// then user clicks to open ex. games. get games gets triggered. api returns unauthorized
// we need to authorize via refresh token and try again

export const AuthenticateWithRefreshTokenAfterUnauthorizedApiResponseEffect =
  createEffect(
    () => {
      const actions$ = inject(Actions);
      const authService = inject(AuthService);
      const store = inject(Store);

      return actions$.pipe(
        ofType(
          RetryActions.AuthenticateWithRefreshTokenAfterUnauthorizedApiResponse
            .initiate
        ),
        withLatestFrom(store.select(AuthTokensSelectors.getRefreshToken)),
        switchMap(([action, refreshToken]) => {
          // inside action is original action that was rejected because unauthorized
          if (!refreshToken) {
            // When there is no refresh token, user is not authenticated so logout
            return of(AuthActions.Logout());
          }
          return authService.refreshTokens(refreshToken).pipe(
            mergeMap((response) => {
              if (response?.error) {
                return of(
                  AuthActions.RefreshTokens.error({
                    error: response.errorMessage,
                  })
                );
              }

              return of(
                AuthActions.RefreshTokens.success({ response }),
                RetryActions.AuthenticateWithRefreshTokenAfterUnauthorizedApiResponse.success(
                  {
                    originalAction: action.originalAction, // action that got unauthorized
                  }
                )
              );
            }),
            catchError((error) =>
              of(AuthActions.RefreshTokens.error({ error }))
            )
          );
        })
      );
    },
    { functional: true }
  );

export const AuthenticateWithRefreshTokenAfterUnauthorizedApiResponseSuccessEffect =
  createEffect(
    () => {
      const actions$ = inject(Actions);

      return actions$.pipe(
        ofType(
          RetryActions.AuthenticateWithRefreshTokenAfterUnauthorizedApiResponse
            .success
        ),
        // delay is because i want strong guarantees (it works without delay, but it makes this more bulletproof), because on top we return two actions.
        // AuthActions.RefreshTokens.success and
        // RetryActions.AuthenticateWithRefreshTokenAfterUnauthorizedApiResponse.success
        // and tokens need to be in the state via reducer before we are allowed to call the original action.
        // other wise we might get unauthorized again, because tokens didint have time to go to the state
        // before we used selector to grab them for the original action
        switchMap((action) => of(action.originalAction).pipe(delay(0))) // Waits for the JavaScript call stack to clear
      );
    },
    { functional: true }
  );
