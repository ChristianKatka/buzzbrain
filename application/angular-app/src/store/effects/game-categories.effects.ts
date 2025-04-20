import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { GameCategoriesService } from '../../app/services/game-categories.service';
import { gameCategoriesActions } from '../actions';
import { shouldFetchGameCategories } from '../selectors/game-categories.selectors';

export const loginEffect = createEffect(
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
