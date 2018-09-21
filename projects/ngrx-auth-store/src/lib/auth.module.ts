import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';
import { AuthActionTypes, Authenticated, SignRedirect } from './actions/auth.actions';
import { HasIdentityDirective } from './directives/has-identity.directive';
import { RedirectModes } from './enums/redirect-modes.enum';
import { AuthenticationService } from './interfaces/authentication-service';
import { AuthStoreConfig } from './interfaces/config';
import { AUTH_AUTHENTICATION_SERVICE, AUTH_CONFIG, AUTH_PRIVATE_CONFIG } from './tokens';

export const DEFAULT_AUTH_FEATURENAME = 'auth';

export function _createAuthConfig(config: AuthStoreConfig): AuthStoreConfig {
    return {
        stateKey: DEFAULT_AUTH_FEATURENAME,
        signInUrl: '/signin',
        signUpUrl: '/signup',
        signOutUrl: '/signout',
        ...config
    };
}

@NgModule({
    providers: [
        {
            provide: AUTH_PRIVATE_CONFIG,
            useValue: {},
        },
        {
            provide: AUTH_CONFIG,
            useFactory: _createAuthConfig,
            deps: [AUTH_PRIVATE_CONFIG],
        }
    ]
})
export class AuthStoreRootModule {
    constructor(
        private actions: ActionsSubject,
        @Inject(AUTH_AUTHENTICATION_SERVICE) private authenticationService: AuthenticationService,
        @Inject(AUTH_CONFIG) private authConfig: AuthStoreConfig,
        private router: Router,
        private store: Store<any>,
    ) {
        console.log('auth store root module');
        this.setUpAuthenticateListener();
        this.setUpRedirectionListener();
    }

    protected setUpAuthenticateListener() {
        this.actions.pipe(
            ofType(AuthActionTypes.Authenticate),
            switchMap(() => this.authenticationService.authenticate()
                .pipe(
                    tap((res) => {
                        let action;
                        if (res.valid) {
                            action = new Authenticated({ token: res.token, refreshToken: res.refreshToken, identity: res.identity });
                        } else {
                            action = new Authenticated({ token: null, refreshToken: null, identity: null });
                        }
                        this.store.dispatch(action);
                    })
                )
            )
        ).subscribe();
    }

    protected setUpRedirectionListener() {
        this.actions.pipe(
            ofType(AuthActionTypes.SignRedirect),
            tap((action: SignRedirect) => {
                let redirectUrl: string;
                switch (action.payload.mode) {
                    case RedirectModes.Signin:
                        redirectUrl = this.authConfig.signInUrl;
                        break;
                    case RedirectModes.Signup:
                        redirectUrl = this.authConfig.signUpUrl;
                        break;
                    case RedirectModes.Custom:
                        redirectUrl = action.payload.url;
                        break;
                }
                this.router.navigateByUrl(redirectUrl);
            })
        ).subscribe();
    }
}

@NgModule({
    imports: [],
    exports: [HasIdentityDirective],
    declarations: [HasIdentityDirective]
})
export class AuthStoreModule {
    public static forRoot(config: AuthStoreConfig): ModuleWithProviders {

        const service: any = config.service;
        service.provide = AUTH_AUTHENTICATION_SERVICE;

        return {
            ngModule: AuthStoreRootModule,
            providers: [
                {
                    provide: AUTH_PRIVATE_CONFIG,
                    useValue: config,
                },
                service,
            ]
        };
    }
}
