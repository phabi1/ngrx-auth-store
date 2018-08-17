import { Action } from '@ngrx/store';

export enum SigninActionTypes {
  Signin = '[Signin] Signin',
  SigninSuccess = '[Signin] Signin Success',
  SigninFailure = '[Signin] Signin Failure',
}

export class Signin implements Action {
  readonly type = SigninActionTypes.Signin;
  constructor(public payload: { credentials: any }) { }
}
export class SigninSuccess implements Action {
  readonly type = SigninActionTypes.SigninSuccess;
}
export class SigninFailure implements Action {
  readonly type = SigninActionTypes.SigninFailure;
  constructor(public payload: { error: any }) { }
}

export type SigninActions
  = Signin
  | SigninSuccess
  | SigninFailure;
