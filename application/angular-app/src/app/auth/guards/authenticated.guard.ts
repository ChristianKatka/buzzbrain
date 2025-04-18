import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AuthTokensSelectors } from '../../../store/selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard {
  store = inject(Store);
  router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.store.select(AuthTokensSelectors.isAuthenticated).pipe(
      tap((loggedIn) => {
        this.ifUserTypesUnAllowedPathInUrlThenRedirect(loggedIn);
      })
    );
  }

  ifUserTypesUnAllowedPathInUrlThenRedirect(loggedIn: boolean) {
    if (!loggedIn) {
      this.router.navigate(['/login']);
    }
  }
}
