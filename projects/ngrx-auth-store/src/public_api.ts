/*
 * Public API Surface of ngrx-auth-store
 */

export { Authenticate, Authenticated, Redirect, AuthActionTypes } from './lib/actions/auth.actions';
export { AuthStoreModule } from './lib/auth.module';
export { IsLoggedGuard } from './lib/guards/is-logged.guard';
export { NotLoggedGuard } from './lib/guards/not-logged.guard';
export { AuthenticationResult, AuthenticationService } from './lib/interfaces/authentication-service';
export { AuthStoreConfig } from './lib/interfaces/config';
export { Identity } from './lib/interfaces/identity';
export { State, reducer } from './lib/reducers/auth.reducer';
export * from './lib/selectors/auth.selectors';
export { AUTH_AUTHENTICATION_SERVICE } from './lib/tokens';
