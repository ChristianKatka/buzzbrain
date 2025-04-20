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

      // There Is a Refresh Token:
      store.dispatch(AuthActions.RefreshTokens.initiate());

      return store.select(AuthUiSelectors.isInitialAppLoading).pipe(
        filter((loading) => loading === false),
        take(1),
        map(() => true)
      );
    })
  );
};

// export const startupGuard: CanActivateFn = () => {
//   const store = inject(Store);
//   const router = inject(Router);

//   //   •	Route guards pause navigation until their Observable<boolean> resolves
//   //   •	That means you can safely run refresh logic there
//   //   •	All subsequent guards (like AuthenticatedGuard) now run after the refresh token is verified

//   //   •	Check if a refresh token exists.
//   //   •	If yes → dispatch refresh, wait until loading is complete (isInitialAppLoading === false)
//   //   •	Then let the route activate.
//   return store.select(AuthTokensSelectors.getRefreshToken).pipe(
//     take(1), // Only take the first value and stop listening. We only care what the refresh token is right now — no need to track changes over time.
//     switchMap((refreshToken) => {
//       console.log('startupGuard → refreshToken:', refreshToken);
//       if (!refreshToken) {
//         router.navigate(['/login']);
//         // store.dispatch(AuthActions.Logout());
//         // Redirect to login instead of allowing the root route to activate
//         // return of(router.createUrlTree(['/login'])); // 🚨 Key fix: Redirect to login
//         return of(true); // let user fall through to login.  Let routing continue — the guard returns true so Angular doesn’t block navigation (and login route can be shown).
//       }

//       // There Is a Refresh Token:
//       store.dispatch(AuthActions.RefreshTokens.initiate());

//       return store.select(AuthUiSelectors.isInitialAppLoading).pipe(
//         // Start watching the isInitialAppLoading — it tells us whether the app is still waiting for the refresh to finish.
//         filter((loading) => loading === false), // Wait until loading is done (RefreshTokens finished). Ignore true values.
//         take(1), // Once we see loading is false, we take that value and stop listening.
//         map(() => true) //  Convert the result into true, which tells Angular: ✅ “Yes, you can now activate this route.”
//       );
//     })
//   );
// };
