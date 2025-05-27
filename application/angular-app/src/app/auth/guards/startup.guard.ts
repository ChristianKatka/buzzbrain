import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { AuthActions } from '../../../store/actions';
import { AuthTokensSelectors, AuthUiSelectors } from '../../../store/selectors';

export const startupGuard: CanActivateFn = () => {
  const store = inject(Store);

  return store.select(AuthTokensSelectors.getRefreshToken).pipe(
    take(1),
    switchMap((refreshToken) => {
      console.log('startupGuard → refreshToken:', refreshToken);
      if (!refreshToken) {
        store.dispatch(AuthActions.Logout());
        return of(true);
      }

      store.dispatch(AuthActions.AuthInit());

      return store.select(AuthUiSelectors.isInitialAppLoading).pipe(
        filter((loading) => loading === false),
        take(1),
        map(() => true)
      );
    })
  );
};
