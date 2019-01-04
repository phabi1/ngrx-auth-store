import { Action } from '@ngrx/store';
import { RedirectModes } from '../enums/redirect-modes.enum';
import { Identity } from '../interfaces/identity';

export enum AuthActionTypes {
  Authenticate = '[Auth] Authenticate',
  Authenticated = '[Auth] Authenticated',
  SignRedirect = '[Auth] Sign Redirect',
  Redirect = '[Auth] Redirect',
  Redirected = '[Auth] Redirected',
  Refresh = '[Auth] Refresh',
  Refreshed = '[Auth] Refreshed'
}

export class Authenticate implements Action {
  readonly type = AuthActionTypes.Authenticate;
}
export class Authenticated implements Action {
  readonly type = AuthActionTypes.Authenticated;
  constructor(public payload: { token: string, refreshToken?: string, identity: Identity }) { }
}
export class SignRedirect implements Action {
  readonly type = AuthActionTypes.SignRedirect;
  constructor(public payload: { mode: RedirectModes, redirectUrl: string, url?: string }) { }
}

export class Redirect implements Action {
  readonly type = AuthActionTypes.Redirect;
}
export class Redirected implements Action {
  readonly type = AuthActionTypes.Redirected;
}

export class Refresh implements Action {
  readonly type = AuthActionTypes.Refresh;
}
export class Refreshed implements Action {
  readonly type = AuthActionTypes.Refreshed;
}

export type AuthActions
  = Authenticate
  | Authenticated
  | SignRedirect
  | Redirect
  | Redirected
  | Refresh
  | Refreshed;
