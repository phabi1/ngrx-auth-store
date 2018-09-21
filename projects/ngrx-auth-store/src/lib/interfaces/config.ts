import { Provider } from '@angular/core';

export interface AuthStoreConfig {
  stateKey?: string;
  signInUrl?: string;
  signUpUrl?: string;
  signOutUrl?: string;
  service: Provider;
}
