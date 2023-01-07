import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyMaterialModule } from 'src/app/shared/modules/my-material.module';
import { StudentsPageComponent } from './students-page.component';
import { StudentsPageRoutingModule } from './students-page-routing.module';
import { StudentDialogComponent } from '../components/student-dialog/student-dialog.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    StudentsPageComponent,
    StudentDialogComponent
  ],
  imports: [
    CommonModule,
    MyMaterialModule,
    StudentsPageRoutingModule,
    RouterModule
  ]
})
export class StudentsPageModule { }
