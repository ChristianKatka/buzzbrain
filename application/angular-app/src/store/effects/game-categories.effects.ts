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
import { gameCategoriesActions, RetryActions } from '../actions';
import { shouldFetchGameCategories } from '../selectors/game-categories.selectors';

export const getGameCategoriesEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const store = inject(Store);
    const gameCategoriesService = inject(GameCategoriesService);

    return actions$.pipe(
      ofType(gameCategoriesActions.getGameCategories.initiate),
      withLatestFrom(store.select(shouldFetchGameCategories)),
      switchMap(([originalAction, shouldFetch]) => {
        console.log('1 getGameCategoriesEffect');

        console.log('shouldFetch');
        console.log(shouldFetch);

        if (!shouldFetch) {
          return of(gameCategoriesActions.getGameCategories.noFetchNeeded());
        }

        return gameCategoriesService.getGameCategories().pipe(
          map((gameCategories) => {
            return gameCategoriesActions.getGameCategories.success({
              gameCategories,
            });
          }),
          catchError((err) => {
            console.error('getGameCategories error:');
            console.log(err);
            console.log(err?.message);

            if (err?.error?.message === 'Unauthorized') {
              console.log('inside catch error of Unauthorized');

              return of(
                RetryActions.AuthenticateWithRefreshTokenAfterUnauthorizedApiResponse.initiate(
                  {
                    originalAction: originalAction,
                  }
                )
              );
            }

            console.log('ei osunut iffii ja palautettuuu get error');

            return of(
              gameCategoriesActions.getGameCategories.error({ error: err })
            );
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
