import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPageComponent } from './courses-page.component';
import { CoursesPageRoutingModule } from './courses-page-routing.module';


@NgModule({
  declarations: [
    CoursesPageComponent
  ],
  imports: [
    CommonModule,
    CoursesPageRoutingModule
  ]
})
export class CoursesPageModule { }
