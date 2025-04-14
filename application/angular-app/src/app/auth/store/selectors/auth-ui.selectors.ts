import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';

export const selectAuthUiState = (state: AppState) => state.authUi;

export const getAuthControlData = createSelector(selectAuthUiState, (state) => {
  return {
    isLoading: state.isLoading,
    errorMessage: state.errorMessage,
  };
});
export const isInitialAppLoading = createSelector(
  selectAuthUiState,
  (state) => state.isInitialAppLoading
);
