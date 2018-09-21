import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthActionTypes, Authenticated, Redirected, SignRedirect } from '../actions/auth.actions';
import { RedirectModes } from '../enums/redirect-modes.enum';
import { AuthenticationService } from '../interfaces/authentication-service';
import { getRedirectUrl } from '../selectors/auth.selectors';
import { AUTH_AUTHENTICATION_SERVICE, AUTH_SIGNIN_URL, AUTH_SIGNUP_URL } from '../tokens';

@Injectable()
export class AuthEffects {

  @Effect()
  authenticate$: Observable<Authenticated> = this.actions$.pipe(
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
  signRedirec$: Observable<SignRedirect> = this.actions$.pipe(
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

  @Effect()
  redirect$: Observable<Redirected> = this.actions$.pipe(
    ofType(AuthActionTypes.Redirect),
    mergeMap(() => this.store.pipe(select(getRedirectUrl), first())),
    tap((redirectUrl) => {
      redirectUrl = redirectUrl || '/';
      this.router.navigateByUrl(redirectUrl);
    }),
    map(() => new Redirected())
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
