import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SignRedirect } from '../actions/auth.actions';
import { RedirectModes } from '../enums/redirect-modes.enum';
import { AuthStoreConfig } from '../interfaces/config';
import { AUTH_CONFIG } from '../tokens';
import { LoggedGuardBase } from './logged.guard';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard extends LoggedGuardBase implements CanActivate, CanActivateChild {

  constructor(
    @Inject(AUTH_CONFIG) authConfig: AuthStoreConfig,
    store: Store<any>) {
    super(authConfig, store);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check(next, state);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.check(next, state);
  }

  protected check(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isLogged().pipe(
      tap((isLogged) => {
        if (!isLogged) {

          // Set initial redirect mode
          let mode: RedirectModes = RedirectModes.Signin;

          // Parse route config
          if (next.data && next.data.auth && next.data.auth.redirect) {

            // Set mode
            mode = next.data.auth.redirect;
          }

          // Dispatch redirect action
          this.store.dispatch(new SignRedirect({
            mode,
            redirectUrl: state.url
          }));
        }
      })
    );
  }
}
