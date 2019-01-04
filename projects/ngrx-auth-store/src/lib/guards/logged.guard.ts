import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { Authenticate } from '../actions/auth.actions';
import { AuthStoreConfig } from '../interfaces/config';
import { State } from '../reducers/auth.reducer';

export abstract class LoggedGuardBase {

  constructor(
    protected authConfig: AuthStoreConfig,
    protected store: Store<any>
  ) { }

  protected isLogged(): Observable<boolean> {
    return this._isAuthenticated().pipe(
      switchMap(() => this._hasIdentity())
    );
  }

  private _isAuthenticated(): Observable<boolean> {
    return this.store.pipe(
      select<State>(this.authConfig.stateKey),
      map((state) => state.authenticated),
      filter((authenticated) => {
        if (!authenticated) {
          this.store
            .pipe(
              select<State>(this.authConfig.stateKey),
              map(state => state.authenticating),
              first(),
            )
            .subscribe((authenticating) => {
              if (!authenticating) {
                this.store.dispatch(new Authenticate());
              }
            });
        }
        return authenticated;
      }),
      first(),
    );
  }

  private _hasIdentity(): Observable<boolean> {
    return this.store.pipe(
      select<State>(this.authConfig.stateKey),
      map((state) => {
        if (state.identity && !state.identity.uid) {
          return true;
        }
        return false;
      }),
      first()
    );
  }
}
