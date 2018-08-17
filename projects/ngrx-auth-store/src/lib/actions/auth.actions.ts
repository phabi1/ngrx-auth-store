import { Action } from '@ngrx/store';
import { identity } from 'rxjs';
import { Identity } from '../interfaces/identity';
import { RedirectModes } from '../enums/redirect-modes.enum';

export enum AuthActionTypes {
  Authenticate = '[Auth] Authenticate',
  Authenticated = '[Auth] Authenticated',
  SignRedirect = '[Auth] Sign Redirect',
  Redirect = '[Auth] Redirect'
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

export type AuthActions
  = Authenticate
  | Authenticated
  | SignRedirect
  | Redirect;
