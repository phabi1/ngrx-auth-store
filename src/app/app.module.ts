import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthStoreModule, AUTH_AUTHENTICATION_SERVICE } from 'projects/ngrx-auth-store/src/public_api';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthenticationService } from './services/authentication.service';
import { AppStoreModule } from './store/store.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    AppRoutingModule,
    AppStoreModule,
    AuthStoreModule
  ],
  providers: [
    { provide: AUTH_AUTHENTICATION_SERVICE, useClass: AuthenticationService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
