import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const getGameCategories = createActionGroup({
  source: '[GameCategories] get',
  events: {
    Initiate: emptyProps(),
    Success: props<{ gameCategories: any }>(),
    Error: props<{ error: any }>(),
  },
});
