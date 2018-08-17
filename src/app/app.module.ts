import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthStoreModule, AUTH_AUTHENTICATION_SERVICE, IsLoggedGuard, NotLoggedGuard } from 'projects/ngrx-auth-store/src/public_api';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivateComponent } from './pages/private/private.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignoutComponent } from './pages/signout/signout.component';
import { AuthenticationService } from './services/authentication.service';
import { AppStoreModule } from './store/store.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'private', component: PrivateComponent, canActivate: [IsLoggedGuard] },
  { path: 'login', component: SigninComponent, canActivate: [NotLoggedGuard] },
  { path: 'logout', component: SignoutComponent, canActivate: [IsLoggedGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrivateComponent,
    SigninComponent,
    SignoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    AppStoreModule,
    AuthStoreModule.forRoot({
      signInUrl: '/login'
    }),
  ],
  providers: [
    { provide: AUTH_AUTHENTICATION_SERVICE, useClass: AuthenticationService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
