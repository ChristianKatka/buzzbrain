import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import { getSelectedGameCategory } from './game-categories.selectors';

export const selectGamesState = (state: AppState) => state.games;

export const getGamesControlData = createSelector(
  selectGamesState,
  getSelectedGameCategory,
  (state, selectedGameCategory) => {
    if (!selectedGameCategory) return;

    return {
      isLoading: state.isLoading,
      games: state.gamesByCategory[selectedGameCategory],
    };
  }
);

export const shouldFetchGamesForSelectedCategory = createSelector(
  selectGamesState,
  getSelectedGameCategory,
  (state, selectedGameCategory) => {
    if (!selectedGameCategory) return false;

    const lastFetched = state.fetchedGameCategories[selectedGameCategory];
    if (!lastFetched) return true; // never fetched before

    const now = Date.now();
    const diff = now - lastFetched;
    const maxAge = 1000 * 60 * 60; // 1 hour

    return diff > maxAge;
  }
);
