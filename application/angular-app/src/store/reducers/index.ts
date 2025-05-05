import { MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AuthTokensState } from './auth/auth-tokens.reducer';
import { AuthUiState } from './auth/auth-ui.reducer';
import { GameCategoriestate } from './game-categories.reducer';
import { GamesState } from './games.reducer';

export interface AppState {
  authUi: AuthUiState;
  authTokens: AuthTokensState;
  gameCategories: GameCategoriestate;
  games: GamesState;
}

export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: ['authTokens', 'gameCategories', 'games'], // <-- the slice(s) you want to sync
    rehydrate: true,
    storage: localStorage,
  })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];
