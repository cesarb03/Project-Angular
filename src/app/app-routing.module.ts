import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { PrincipalModule } from './pages/principal/principal.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
      children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/principal/principal.module').then(m => m.PrincipalModule),
      }, 
      {
        path: 'students',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/students-page/students-page.module').then(m => m.StudentsPageModule),
      }, 
      {
        path: 'courses',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./pages/courses-page/courses-page.module').then(m => m.CoursesPageModule),
      }, 
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      }, 
      
    ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
