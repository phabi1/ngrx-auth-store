import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { Identity } from '../interfaces/identity';

export interface State {
  authenticating: boolean;
  authenticated: boolean;
  token?: string;
  refreshToken?: string;
  identity?: Identity;
  redirectUrl?: string;
}

export const initialState: State = {
  authenticating: false,
  authenticated: false,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {

    case AuthActionTypes.Authenticate:
      return { ...state, authenticating: true, authenticated: false };
    case AuthActionTypes.Authenticated:
      return {
        ...state,
        authenticating: false,
        authenticated: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        identity: action.payload.identity,
      };
    case AuthActionTypes.SignRedirect:
      return { ...state, redirectUrl: action.payload.redirectUrl };
    default:
      return state;
  }
}
