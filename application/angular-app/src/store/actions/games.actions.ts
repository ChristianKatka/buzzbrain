import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

export const getGamesByCategory = createActionGroup({
  source: '[Games] get',
  events: {
    Initiate: emptyProps(),
    Success: props<{ games: any }>(),
    noFetchNeeded: emptyProps(),
    Error: props<{ error: any }>(),
  },
});

export const selectGame = createAction(
  '[Games] Select Game',
  props<{ gameId: string }>()
);
