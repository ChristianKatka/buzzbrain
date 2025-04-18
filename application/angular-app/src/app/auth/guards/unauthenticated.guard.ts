import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthTokensSelectors } from '../../../store/selectors';

@Injectable({
  providedIn: 'root',
})
export class UnauthenticatedGuard {
  store = inject(Store);
  router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.store.select(AuthTokensSelectors.isAuthenticated).pipe(
      map((isLoggedIn) => this.checkIfUserIsUnauthenticated(isLoggedIn)),
      tap((isUnAuthenticated) => {
        this.ifUserTypesUnAllowedPathInUrlThenRedirect(isUnAuthenticated);
      })
    );
  }

  checkIfUserIsUnauthenticated(isLoggedIn: boolean): boolean {
    // if user is logged in we dont want him to acces login page
    if (isLoggedIn) {
      return false;
    } else {
      return true;
    }
  }

  ifUserTypesUnAllowedPathInUrlThenRedirect(isUnAuthenticated: boolean) {
    const userIsLoggedInSoRedirectToHome = !isUnAuthenticated;

    if (userIsLoggedInSoRedirectToHome) {
      this.router.navigate(['/home']);
    }
  }
}
