import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Redirect } from '../actions/auth.actions';
import { AuthStoreConfig } from '../interfaces/config';
import { AUTH_CONFIG } from '../tokens';
import { LoggedGuardBase } from './logged.guard';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedGuard extends LoggedGuardBase implements CanActivate {

  constructor(
    @Inject(AUTH_CONFIG) authConfig: AuthStoreConfig,
    store: Store<any>) {
    super(authConfig, store);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check(state);
  }

  protected check(state: RouterStateSnapshot) {
    return this.isLogged().pipe(
      tap((isLogged) => {
        console.log(isLogged);
        if (isLogged) {
          this.store.dispatch(new Redirect());
        }
      }),
      map((isLogged) => !isLogged)
    );
  }
}
