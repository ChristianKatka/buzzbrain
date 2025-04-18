import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GameCategoriesService } from '../../app/services/game-categories.service';
import { gameCategoriesActions } from '../actions';

export const loginEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const gameCategoriesService = inject(GameCategoriesService);

    return actions$.pipe(
      ofType(gameCategoriesActions.getGameCategories.initiate),
      switchMap(() =>
        gameCategoriesService.getGameCategories().pipe(
          map((gameCategories) =>
            gameCategoriesActions.getGameCategories.success({ gameCategories })
          ),
          catchError((error) =>
            of(gameCategoriesActions.getGameCategories.error({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
