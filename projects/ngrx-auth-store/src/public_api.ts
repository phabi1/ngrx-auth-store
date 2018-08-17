/*
 * Public API Surface of ngrx-auth-store
 */

export { AuthStoreConfig, AuthStoreModule } from './lib/auth.module';
export { IsLoggedGuard } from './lib/guards/is-logged.guard';
export { NotLoggedGuard } from './lib/guards/not-logged.guard';
export { AuthenticationResult, AuthenticationService } from './lib/interfaces/authentication-service';
export { Identity } from './lib/interfaces/identity';
export { AUTH_AUTHENTICATION_SERVICE } from './lib/tokens';

