import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedGuard } from 'ngrx-auth-store';
import { PrivateComponent } from './private.component';

const routes: Routes = [
  { path: '', component: PrivateComponent, canActivate: [IsLoggedGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {}
