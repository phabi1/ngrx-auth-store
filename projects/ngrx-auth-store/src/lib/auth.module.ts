import { ModuleWithProviders, NgModule } from '@angular/core';
import { HasIdentityDirective } from './directives/has-identity.directive';
import { AuthStoreConfig } from './interfaces/config';
import { AUTH_AUTHENTICATION_SERVICE, AUTH_CONFIG, AUTH_PRIVATE_CONFIG } from './tokens';

export const DEFAULT_AUTH_FEATURENAME = 'auth';

export function _createAuthConfig(config: AuthStoreConfig): AuthStoreConfig {

    // Default configuration
    const defaultConfig = {
        stateKey: DEFAULT_AUTH_FEATURENAME,
        signInUrl: '/signin',
        signUpUrl: '/signup',
        signOutUrl: '/signout',
    };

    return {
        ...defaultConfig,
        ...config
    };
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
            ngModule: AuthStoreModule,
            providers: [
                {
                    provide: AUTH_PRIVATE_CONFIG,
                    useValue: config,
                },
                {
                    provide: AUTH_CONFIG,
                    useFactory: _createAuthConfig,
                    deps: [AUTH_PRIVATE_CONFIG],
                },
                service,
            ]
        };
    }
}
