import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';

export const selectGameCategoriesState = (state: AppState) =>
  state.gameCategories;

export const getGameCategoriesControlData = createSelector(
  selectGameCategoriesState,
  (state) => {
    return {
      isLoading: state.isLoading,
      gameCategories: Object.values(state.gameCategories),
    };
  }
);

export const shouldFetchGameCategories = createSelector(
  selectGameCategoriesState,
  (state) => {
    if (!state.fetchedTimeStamp) return true;

    const now = Date.now();
    const diff = now - state.fetchedTimeStamp;

    const maxAge = 1000 * 60 * 60; // 1 hour in ms

    return diff > maxAge;
  }
);

export const getSelectedGameCategory = createSelector(
  selectGameCategoriesState,
  (state) => {
    if (!state.selectedGameCategory) return undefined;

    return state.gameCategories[state.selectedGameCategory];
  }
);
