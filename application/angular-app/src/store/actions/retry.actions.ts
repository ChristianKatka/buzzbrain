import { Action, createActionGroup, props } from '@ngrx/store';

export const AuthenticateWithRefreshTokenAfterUnauthorizedApiResponse =
  createActionGroup({
    source: '[Auth] AuthenticateWithRefreshTokenAfterUnauthorizedApiResponse',
    events: {
      Initiate: props<{ originalAction: Action }>(),
      Success: props<{ originalAction: Action }>(),
      Error: props<{ error: any }>(),
    },
  });
