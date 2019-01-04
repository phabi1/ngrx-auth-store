import { InjectionToken } from '@angular/core';
import { AuthenticationService } from '../interfaces/authentication-service';

export const AUTH_AUTHENTICATION_SERVICE: InjectionToken<AuthenticationService>
  = new InjectionToken<AuthenticationService>('auth.authentication.service');
export const AUTH_PRIVATE_CONFIG = new InjectionToken('auth.config.private');
export const AUTH_CONFIG = new InjectionToken('auth.config');
