import { createReducer, on } from '@ngrx/store';
import { AuthActions, gameCategoriesActions } from '../actions/index';
import { arrayToDictionary } from '../../shared/utils/array-to-dictionary.util';

export interface GameCategoriestate {
  gameCategories: any;
  isLoading: boolean;
  fetchedTimeStamp: undefined | number; // used to determine if we should fetch data again or not
  selectedGameCategory: undefined | string;
}

export const initialState: GameCategoriestate = {
  gameCategories: {},
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
      const records = arrayToDictionary(gameCategories, 'categoryId');

      return {
        ...state,
        isLoading: false,
        fetchedTimeStamp: Date.now(),
        gameCategories: { ...state.gameCategories, ...records },
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
