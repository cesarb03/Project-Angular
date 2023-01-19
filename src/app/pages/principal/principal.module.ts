import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { RouterModule } from '@angular/router';
import { MyMaterialModule } from '../../shared/modules/my-material.module';



@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MyMaterialModule
  ]
})
export class PrincipalModule { }
