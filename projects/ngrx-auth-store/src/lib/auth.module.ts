import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { AuthEffects } from './effects/auth.effects';
import * as fromAuth from './reducers/auth.reducer';
import { AUTH_SIGNIN_URL, AUTH_SIGNUP_URL } from './tokens';
import { AUTH_STATE_KEY } from './utils';
import { Authenticate } from './actions/auth.actions';

export interface AuthStoreConfig {
  signInUrl?: string;
  signUpUrl?: string;
}

@NgModule({
  imports: [
    StoreModule.forFeature(AUTH_STATE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthStoreModule {
  public static forRoot(config?: AuthStoreConfig): ModuleWithProviders {

    const defaultConfig: AuthStoreConfig = {
      signInUrl: '/signin',
      signUpUrl: '/signup'
    };

    config = config || {};

    const _config = { ...defaultConfig, ...config };

    return {
      ngModule: AuthStoreModule,
      providers: [
        { provide: AUTH_SIGNIN_URL, useValue: _config.signInUrl },
        { provide: AUTH_SIGNUP_URL, useValue: _config.signUpUrl }
      ]
    };
  }

  constructor(
    private store: Store<any>
  ) {
    this.store.dispatch(new Authenticate());
  }
}
