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
import { GameCategoriesService } from '../../app/services/game-categories.service';
import { AuthActions, gameCategoriesActions } from '../actions';
import { shouldFetchGameCategories } from '../selectors/game-categories.selectors';

export const getGameCategoriesEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const gameCategoriesService = inject(GameCategoriesService);

    return actions$.pipe(
      ofType(gameCategoriesActions.getGameCategories.initiate),
      withLatestFrom(store.select(shouldFetchGameCategories)),
      switchMap(([_, shouldFetch]) => {
        if (!shouldFetch) {
          return of(gameCategoriesActions.getGameCategories.noFetchNeeded());
        }

        return gameCategoriesService.getGameCategories().pipe(
          map((gameCategories) => {
            if (gameCategories?.error?.message === 'Unauthorized') {
              return AuthActions.RefreshTokens.initiate();
            }

            return gameCategoriesActions.getGameCategories.success({
              gameCategories,
            });
          }),
          catchError((error) => {
            console.error('getGameCategories error:', error);
            return of(gameCategoriesActions.getGameCategories.error({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const selectGameCategoryEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const router = inject(Router);

    return actions$.pipe(
      ofType(gameCategoriesActions.selectGameCategory),
      tap(({ categoryId }) => {
        router.navigate([`/category/${categoryId}`]);
      })
    );
  },
  { functional: true, dispatch: false }
);
