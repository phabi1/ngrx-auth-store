import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, mergeMap, first } from 'rxjs/operators';
import { AuthActionTypes, Authenticated, SignRedirect } from '../actions/auth.actions';
import { AuthenticationService } from '../interfaces/authentication-service';
import { AUTH_AUTHENTICATION_SERVICE, AUTH_SIGNIN_URL, AUTH_SIGNUP_URL } from '../tokens';
import { RedirectModes } from '../enums/redirect-modes.enum';
import { Store, select } from '@ngrx/store';
import { getRedirectUrl } from '../selectors/auth.selectors';

@Injectable()
export class AuthEffects {

  @Effect()
  authenticate$ = this.actions$.pipe(
    ofType(AuthActionTypes.Authenticate),
    switchMap(() => this.authenticationService.authenticate().pipe(
      map((res) => {
        if (res.valid) {
          return new Authenticated({ token: res.token, refreshToken: res.refreshToken, identity: res.identity });
        } else {
          return new Authenticated({ token: null, refreshToken: null, identity: null });
        }
      })
    ))
  );

  @Effect({ dispatch: false })
  signRedirec$ = this.actions$.pipe(
    ofType(AuthActionTypes.SignRedirect),
    tap((action: SignRedirect) => {
      let redirectUrl: string;
      switch (action.payload.mode) {
        case RedirectModes.Signin:
          redirectUrl = this.signinUrl;
          break;
        case RedirectModes.Signup:
          redirectUrl = this.signupUrl;
          break;
        case RedirectModes.Custom:
          redirectUrl = action.payload.url;
          break;
      }
      this.router.navigateByUrl(redirectUrl);
    })
  );

  @Effect({ dispatch: false })
  redirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.Redirect),
    mergeMap(() => this.store.pipe(select(getRedirectUrl), first())),
    tap((redirectUrl) => {
      redirectUrl = redirectUrl || '/';
      this.router.navigateByUrl(redirectUrl);
    })
  );

  constructor(
    private actions$: Actions,
    @Inject(AUTH_AUTHENTICATION_SERVICE) private authenticationService: AuthenticationService,
    @Inject(AUTH_SIGNIN_URL) private signinUrl: string,
    @Inject(AUTH_SIGNUP_URL) private signupUrl: string,
    private router: Router,
    private store: Store<any>
  ) { }
}
