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
import { GamesService } from '../../app/services/games.service';
import { AuthActions, gamesActions } from '../actions';
import { getSelectedGameCategory } from '../selectors/game-categories.selectors';
import { shouldFetchGamesForSelectedCategory } from '../selectors/games.selectors';

export const getGamesByCategoryEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const gamesService = inject(GamesService);

    return actions$.pipe(
      ofType(gamesActions.getGamesByCategory.initiate),
      withLatestFrom(store.select(shouldFetchGamesForSelectedCategory)),
      withLatestFrom(store.select(getSelectedGameCategory)),
      switchMap(([[_, shouldFetch], selectedCategory]) => {
        if (!shouldFetch) {
          return of(gamesActions.getGamesByCategory.noFetchNeeded());
        }

        return gamesService
          .getGamesByCategory(selectedCategory.categoryId)
          .pipe(
            map((games) => {
              if (games?.error?.message === 'Unauthorized') {
                return AuthActions.RefreshTokens.initiate();
              }
              return gamesActions.getGamesByCategory.success({
                games,
              });
            }),
            catchError((error) => {
              console.error('getGamesByCategoryEffect error:', error);
              return of(gamesActions.getGamesByCategory.error({ error }));
            })
          );
      })
    );
  },
  { functional: true }
);

export const selectGameEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const router = inject(Router);

    return actions$.pipe(
      ofType(gamesActions.selectGame),
      tap(({ gameId }) => {
        const currentUrl = router.url; // e.g., "/category/sport"
        router.navigate([`${currentUrl}/${gameId}`]);
      })
    );
  },
  { functional: true, dispatch: false }
);
