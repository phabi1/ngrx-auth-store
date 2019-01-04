import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthStoreModule, AUTH_AUTHENTICATION_SERVICE, AuthEffects } from 'ngrx-auth-store';
import { environment } from '../../environments/environment';
import { SigninEffects } from './effects/signin.effects';
import { metaReducers, reducers } from './reducers';
import { AuthenticationService } from '../services/authentication.service';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      AuthEffects,
      SigninEffects
    ]),
    AuthStoreModule.forRoot({
      stateKey: 'auth',
      service: {
        provide: AUTH_AUTHENTICATION_SERVICE,
        useClass: AuthenticationService,
      },
      signInUrl: '/login',
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  declarations: []
})
export class AppStoreModule { }
