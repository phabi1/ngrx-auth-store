import { Identity } from './identity';
import { Observable } from 'rxjs';

export interface AuthenticationResult {
  valid: boolean;
  token?: string;
  refreshToken?: string;
  identity?: Identity;
  error?: any;
}

export interface AuthenticationService {
  authenticate(): Observable<AuthenticationResult>;
  refresh (refreshToken?: string): Observable<AuthenticationResult>;
}
