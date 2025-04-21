import { createReducer, on } from '@ngrx/store';
import { AuthActions, gameCategoriesActions } from '../actions/index';

export interface GameCategoriestate {
  gameCategories: any[];
  isLoading: boolean;
  fetchedTimeStamp: undefined | number; // used to determine if we should fetch data again or not
  selectedGameCategory: undefined | string;
}

export const initialState: GameCategoriestate = {
  gameCategories: [],
  isLoading: false,
  fetchedTimeStamp: undefined,
  selectedGameCategory: undefined,
};

export const gameCategoriesReducer = createReducer(
  initialState,
  on(gameCategoriesActions.getGameCategories.initiate, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    gameCategoriesActions.getGameCategories.success,
    (state, { gameCategories }) => {
      return {
        ...state,
        isLoading: false,
        fetchedTimeStamp: Date.now(),
        gameCategories,
      };
    }
  ),
  on(gameCategoriesActions.getGameCategories.noFetchNeeded, (state) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(gameCategoriesActions.selectGameCategory, (state, { categoryId }) => {
    return {
      ...state,
      selectedGameCategory: categoryId,
    };
  }),

  on(AuthActions.Logout, () => initialState)
);
