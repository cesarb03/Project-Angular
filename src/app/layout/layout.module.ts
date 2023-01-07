import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MyMaterialModule } from '../shared/modules/my-material.module';
import { LayoutComponent } from './layout.component';



@NgModule({
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    MyMaterialModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
