import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

export const getGameCategories = createActionGroup({
  source: '[GameCategories] get',
  events: {
    Initiate: emptyProps(),
    Success: props<{ gameCategories: any }>(),
    noFetchNeeded: emptyProps(),
    Error: props<{ error: any }>(),
  },
});

export const selectGameCategory = createAction(
  '[Game Categories] Select Game Category',
  props<{ categoryId: string }>()
);
