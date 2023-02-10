import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPageComponent } from './courses-page.component';
import { CoursesPageRoutingModule } from './courses-page-routing.module';
import { MyMaterialModule } from 'src/app/shared/modules/my-material.module';


@NgModule({
  declarations: [
    CoursesPageComponent
  ],
  imports: [
    CommonModule,
    CoursesPageRoutingModule,
    MyMaterialModule,

  ]
})
export class CoursesPageModule { }
