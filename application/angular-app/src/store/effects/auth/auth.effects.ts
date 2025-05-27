import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { catchCognitoErrorsIfAny } from './utils/catch-cognito-errors-if-any.util';
import { AuthService } from '../../../app/auth/services/auth.service';
import { AuthActions } from '../../actions';
import { AuthTokensSelectors } from '../../selectors';

export const AuthInitEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const authService = inject(AuthService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(AuthActions.AuthInit),
      withLatestFrom(store.select(AuthTokensSelectors.getRefreshToken)),
      withLatestFrom(store.select(AuthTokensSelectors.isAuthenticated)),
      switchMap(([[_, refreshToken], isAuthenticated]) => {
        if (isAuthenticated) {
          return of(AuthActions.AuthInitAlreadyAuthenticated());
        }

        if (!refreshToken) {
          // When there is no refresh token, user is not authenticated so logout
          return of(AuthActions.Logout());
        }
        return authService.refreshTokens(refreshToken).pipe(
          map((response) => {
            if (response?.error) {
              return AuthActions.RefreshTokens.error({
                error: response.errorMessage,
              });
            }
            return AuthActions.RefreshTokens.success({ response });
          }),
          catchError((error) => of(AuthActions.RefreshTokens.error({ error })))
        );
      })
    );
  },
  { functional: true }
);

export const refreshTokensEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const authService = inject(AuthService);
    const store = inject(Store);

    return actions$.pipe(
      ofType(AuthActions.RefreshTokens.initiate),
      withLatestFrom(store.select(AuthTokensSelectors.getRefreshToken)),
      switchMap(([action, refreshToken]) => {
        if (!refreshToken) {
          // When there is no refresh token, user is not authenticated so logout
          return of(AuthActions.Logout());
        }
        return authService.refreshTokens(refreshToken).pipe(
          map((response) => {
            if (response?.error) {
              return AuthActions.RefreshTokens.error({
                error: response.errorMessage,
              });
            }
            return AuthActions.RefreshTokens.success({ response });
          }),
          catchError((error) => of(AuthActions.RefreshTokens.error({ error })))
        );
      })
    );
  },
  { functional: true }
);

// when there is problem authenticating user with refresh token -> unauthenticate user by logging out
export const updateSessionWithRefreshTokenErrorEffect = createEffect(
  () => {
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(AuthActions.RefreshTokens.error),
      map(() => AuthActions.Logout())
    );
  },
  { functional: true }
);

export const registerEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const authService = inject(AuthService);

    return actions$.pipe(
      ofType(AuthActions.Register.initiate),
      switchMap(({ credentials }) =>
        authService.register(credentials).pipe(
          map((response) => {
            if (response?.error) {
              return AuthActions.Register.error({
                error: {},
                errorMessage: response.errorMessage,
              });
            }
            return AuthActions.Register.success({ response });
          }),
          catchError((error) =>
            of(AuthActions.Register.error({ error, errorMessage: '' }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const registerSuccessEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const router = inject(Router);

    return actions$.pipe(
      ofType(AuthActions.Register.success),
      tap(() => {
        router.navigate(['/welcome']);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const loginEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const authService = inject(AuthService);

    return actions$.pipe(
      ofType(AuthActions.Login.initiate),
      switchMap(({ credentials }) =>
        authService.login(credentials).pipe(
          map((response) => catchCognitoErrorsIfAny(response)),
          catchError((error) =>
            of(AuthActions.Login.error({ error, errorMessage: '' }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const loginOrRefreshTokensSuccessEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const router = inject(Router);

    return actions$.pipe(
      ofType(AuthActions.Login.success, AuthActions.RefreshTokens.success),
      tap(() => {
        const currentUrl = router.url;

        const isLoginPage = currentUrl === '/login';

        const isRegisterPage = currentUrl === '/register';

        if (isLoginPage) {
          router.navigate(['/dashboard']);
        }
        if (isRegisterPage) {
          router.navigate(['/welcome']);
        }
        // Else: stay on the same page
      })
    );
  },
  { functional: true, dispatch: false }
);

export const logoutEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const router = inject(Router);

    return actions$.pipe(
      ofType(AuthActions.Logout),
      tap(() => {
        router.navigate(['/login']);
      })
    );
  },
  { functional: true, dispatch: false }
);
