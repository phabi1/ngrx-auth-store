import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrivateComponent } from './private.component';
import { PrivateRoutingModule } from './private.routing';

@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule
  ],
  declarations: [
    PrivateComponent
  ]
})
export class PrivateModule { }
