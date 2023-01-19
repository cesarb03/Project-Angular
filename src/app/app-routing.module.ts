import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
      children: [
      {
        path: 'home',
        component: PrincipalComponent,
      },
      {
        path: 'students',
        canActivate: [AuthGuard],

        loadChildren: () => import('./pages/students-page/students-page.module').then(m => m.StudentsPageModule),
      }, 
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      }, 
      {
        path: '**',
        redirectTo: 'auth'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
