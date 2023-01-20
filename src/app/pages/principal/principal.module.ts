import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { RouterModule } from '@angular/router';
import { MyMaterialModule } from '../../shared/modules/my-material.module';
import { PrincipalRoutingModule } from './principal-routing.module';



@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MyMaterialModule,
    PrincipalRoutingModule
  ]
})
export class PrincipalModule { }
