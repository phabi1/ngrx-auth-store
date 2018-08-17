import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { Authenticate } from '../actions/auth.actions';
import { getAuthenticated, getAuthenticating, getHasIdentity } from '../selectors/auth.selectors';

export abstract class LoggedGuardBase {

  constructor(protected store: Store<any>) { }

  protected isLogged(): Observable<boolean> {
    return this._isAuthenticated().pipe(
      switchMap(() => this._hasIdentity())
    );
  }

  private _isAuthenticated(): Observable<boolean> {
    return this.store.select(getAuthenticated).pipe(
      filter((authenticated) => {
        if (!authenticated) {
          this.store.select(getAuthenticating)
            .pipe(
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
    return this.store.select(getHasIdentity).pipe(
      first()
    );
  }
}
