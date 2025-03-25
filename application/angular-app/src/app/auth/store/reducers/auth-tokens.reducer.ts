import { createReducer, on } from '@ngrx/store';
import { jwtDecode } from 'jwt-decode';
import { AuthActions } from '../actions';
import { includeExistingRefreshTokenWithNewTokens } from './utils/include-existing-refresh-token-with-new-tokens.util';

export interface AuthTokensState {
  tokens: any;
  decodedAccessToken: any;
}

export const initialState: AuthTokensState = {
  tokens: undefined,
  decodedAccessToken: undefined,
};

export const authTokensReducer = createReducer(
  initialState,

  // Refresh token is provided only in register and login
  on(
    AuthActions.Register.success,
    AuthActions.Login.success,
    (state, { response }) => {
      return {
        ...state,
        tokens: response.AuthenticationResult,
        decodedAccessToken: jwtDecode(
          response.AuthenticationResult.AccessToken
        ),
      };
    }
  ),

  // reuse a Refresh Token as long as it is valid (API will tell when its no longer valid)
  // updating session/tokens with refresh token wont return new refresh token
  on(AuthActions.RefreshTokens.success, (state, { response }) => {
    return {
      ...state,
      tokens: includeExistingRefreshTokenWithNewTokens(
        state.tokens.RefreshToken,
        response.AuthenticationResult
      ),
      decodedAccessToken: jwtDecode(response.AuthenticationResult.AccessToken),
    };
  }),
  on(AuthActions.Logout, () => initialState)
);
