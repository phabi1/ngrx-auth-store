import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Authenticated } from 'projects/ngrx-auth-store/src/lib/actions/auth.actions';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { Signin, SigninActionTypes, SigninFailure, SigninSuccess } from '../actions/signin.actions';
import { of, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class SigninEffects {

  @Effect()
  signin$: Observable<SigninSuccess | SigninFailure> = this.actions$.pipe(
    ofType(SigninActionTypes.Signin),
    map((action: Signin) => action.payload),
    switchMap((payload) => this.authenticationService.signin(payload.credentials)),
    map((res) => {
      if (res.valid) {
        this.store.dispatch(new Authenticated({ token: res.token, refreshToken: res.refreshToken, identity: res.identity }));
        return new SigninSuccess();
      } else {
        return new SigninFailure({
          error: res.error
        });
      }
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private authenticationService: AuthenticationService
  ) { }
}
