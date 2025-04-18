import { createReducer, on } from '@ngrx/store';
import { AuthActions, gameCategoriesActions } from '../actions/index';

export interface GameCategoriestate {
  gameCategories: any[];
  isLoading: boolean;
}

export const initialState: GameCategoriestate = {
  gameCategories: [],
  isLoading: false,
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
        gameCategories,
      };
    }
  ),

  on(AuthActions.Logout, () => initialState)
);
