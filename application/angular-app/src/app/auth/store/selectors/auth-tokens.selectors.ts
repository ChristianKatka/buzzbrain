import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';

export const selectAuthTokensState = (state: AppState) => state.authTokens;

export const isAuthenticated = createSelector(
  selectAuthTokensState,
  (state) => {
    if (!state.decodedAccessToken) return false;

    const epochDateTimeNowInSeconds = Math.floor(Date.now() / 1000); // Returns the current time in seconds (Unix epoch)
    const jwtExpirationTime = state.decodedAccessToken.exp;

    const jwtExpirationMinus5Seconds = jwtExpirationTime - 5;

    return jwtExpirationMinus5Seconds > epochDateTimeNowInSeconds;
  }
);

export const getRefreshToken = createSelector(
  selectAuthTokensState,
  (state) => {
    if (!state?.tokens) return undefined;

    return state.tokens.RefreshToken;
  }
);

export const getIdToken = createSelector(selectAuthTokensState, (state) => {
  if (!state.tokens) return undefined;

  return state.tokens.IdToken;
});
