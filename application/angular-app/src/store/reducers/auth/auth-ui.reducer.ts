import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../../actions/index';

export interface AuthUiState {
  isInitialAppLoading: boolean;
  isLoading: boolean;
  error: any;
  errorMessage: string | undefined;
}

export const initialState: AuthUiState = {
  isInitialAppLoading: false,
  isLoading: false,
  error: undefined,
  errorMessage: undefined,
};

export const authUiReducer = createReducer(
  initialState,
  on(AuthActions.Login.initiate, AuthActions.Register.initiate, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    AuthActions.Login.success,
    AuthActions.Register.success,
    (state, { response }) => {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        errorMessage: undefined,
      };
    }
  ),
  on(
    AuthActions.Login.error,
    AuthActions.Register.error,
    (state, { error, errorMessage }) => {
      return {
        ...state,
        isLoading: false,
        error,
        errorMessage,
      };
    }
  ),

  // Initial splash screen loader
  on(AuthActions.AuthInit, AuthActions.RefreshTokens.initiate, (state) => {
    return {
      ...state,
      isInitialAppLoading: true,
    };
  }),
  on(
    AuthActions.AuthInitAlreadyAuthenticated,
    AuthActions.RefreshTokens.error,
    AuthActions.RefreshTokens.success,
    AuthActions.Logout,
    (state) => {
      return {
        ...state,
        isInitialAppLoading: false,
      };
    }
  ),

  on(AuthActions.Logout, () => initialState)
);
