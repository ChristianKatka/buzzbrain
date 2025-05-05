import { createReducer, on } from '@ngrx/store';
import { AuthActions, gamesActions } from '../actions/index';

export interface GamesState {
  gamesByCategory: Record<string, any[]>; // or Record<string, Game[]>
  isLoading: boolean;
  selectedGame: undefined | string;
  // key = categoryId, value = timestamp of when it was fetched
  fetchedGameCategories: Record<string, number>;
}

export const initialState: GamesState = {
  gamesByCategory: {},
  isLoading: false,
  selectedGame: undefined,
  fetchedGameCategories: {},
};

export const gamesReducer = createReducer(
  initialState,
  on(gamesActions.getGamesByCategory.initiate, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(gamesActions.getGamesByCategory.success, (state, { games }) => {
    if (games.length === 0) return { ...state, isLoading: false };

    const fetchedCategory = games[0].categoryId;
    const fetchedAt = Date.now();

    return {
      ...state,
      isLoading: false,
      gamesByCategory: {
        ...state.gamesByCategory,
        [fetchedCategory]: games,
      },
      fetchedGameCategories: {
        ...state.fetchedGameCategories,
        [fetchedCategory]: fetchedAt,
      },
    };
  }),
  on(gamesActions.getGamesByCategory.noFetchNeeded, (state) => {
    return {
      ...state,
      isLoading: false,
    };
  }),

  on(AuthActions.Logout, () => initialState)
);
