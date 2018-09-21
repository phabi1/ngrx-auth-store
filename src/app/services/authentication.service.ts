import { Injectable } from '@angular/core';
import { AuthenticationResult, AuthenticationService as IAuthenticationService, Identity } from 'projects/ngrx-auth-store/src/public_api';
import { Observable, of, empty } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements IAuthenticationService {

  private TOKEN_RESOURCE_NAME = 'token';
  private REFRESH_TOKEN_RESOURCE_NAME = 'refresh_token';
  private IDENTITY_RESOURCE_NAME = 'identity';

  constructor() { }

  authenticate(): Observable<AuthenticationResult> {
    console.log('authenticate');
    return this.loadCredentials().pipe(
      map((credentials) => ({
        valid: true,
        token: credentials.token,
        refreshToken: credentials.refreshToken,
        identity: credentials.identity,
      }))
    );
  }

  signin(credentials: any): Observable<AuthenticationResult> {
    if (credentials.email === 'demo' && credentials.password === 'demo') {
      const token = 'token';
      const refreshToken = 'refresh_token';
      const identity = { uid: '1' };
      return this.storeCredentials(token, refreshToken, identity).pipe(
        map(() => ({ valid: true, token, identity })
        )
      );
    }
    return of({
      valid: false, error: 'Invalid credentials'
    });
  }

  refresh(refreshToken?: string): Observable<AuthenticationResult> {
    throw new Error('Method not implemented.');
  }

  private loadCredentials(): Observable<{ token: string, refreshToken: string, identity: Identity }> {
    const token = localStorage.getItem(this.TOKEN_RESOURCE_NAME);
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_RESOURCE_NAME);
    const data = localStorage.getItem(this.IDENTITY_RESOURCE_NAME);

    let identity: Identity = null;
    if (data) {
      identity = JSON.parse(data);
    }
    return of({ token, refreshToken, identity });
  }

  private storeCredentials(token: string, refreshToken: string, identity: Identity): Observable<never> {
    localStorage.setItem(this.TOKEN_RESOURCE_NAME, token);
    localStorage.setItem(this.REFRESH_TOKEN_RESOURCE_NAME, refreshToken);
    localStorage.setItem(this.IDENTITY_RESOURCE_NAME, JSON.stringify(identity));

    return empty();
  }

}
