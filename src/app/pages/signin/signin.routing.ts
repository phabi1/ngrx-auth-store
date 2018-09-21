import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoggedGuard } from 'ngrx-auth-store';
import { SigninComponent } from './signin.component';

const routes: Routes = [
  { path: '', component: SigninComponent, canActivate: [NotLoggedGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninRoutingModule {}
