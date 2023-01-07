import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PrincipalComponent } from './pages/principal/principal.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
      children: [
      {
        path: '',
        component: PrincipalComponent,
        data: {
          nombre: 'Bienvenido'
        }
      },
      {
        path: 'students',
        loadChildren: () => import('./pages/students-page/students-page.module').then(m => m.StudentsPageModule),
        data: {
          nombre: 'Students'
        }
      },
      // {
      //   path: 'proveedores',
      //   loadChildren: () => import('./proveedores/proveedores.module').then(m => m.ProveedoresModule),
      //   data: {
      //     nombre: 'Proveedores'
      //   }
      // }
    ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
