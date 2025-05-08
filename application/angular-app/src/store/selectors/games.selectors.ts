import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import { getSelectedGameCategory } from './game-categories.selectors';

export const selectGamesState = (state: AppState) => state.games;

export const getGamesControlData = createSelector(
  selectGamesState,
  getSelectedGameCategory,
  (state, selectedGameCategory) => {
    if (!selectedGameCategory) return undefined;
    if (!state.gamesByCategory[selectedGameCategory.categoryId])
      return undefined;

    return {
      isLoading: state.isLoading,
      games: Object.values(
        state.gamesByCategory[selectedGameCategory.categoryId]
      ),
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

export const getSelectedGame = createSelector(
  selectGamesState,
  getSelectedGameCategory,
  (state, selectedGameCategory) => {
    if (!selectedGameCategory) return undefined;
    if (!state.selectedGame) return undefined;

    const selectedGategoryGames: any =
      state.gamesByCategory[selectedGameCategory.categoryId];

    return selectedGategoryGames[state.selectedGame];
  }
);
