import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomeModule' },
  { path: 'private', loadChildren: './pages/private/private.module#PrivateModule' },
  { path: 'login', loadChildren: './pages/signin/signin.module#SigninModule' },
  { path: 'logout', loadChildren: './pages/signout/signout.module#SignoutModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
