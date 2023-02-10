import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Sesion } from 'src/app/core/interface/sesion.interface';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private sesionService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.sesionService.obtenerDatosSesion().pipe(
    //   map((sesion: Sesion) => {
    //     if (sesion.usuarioActivo) {
    //       return true;
    //     } else {
    //       this.router.navigate(['/login'])
    //       return false
    //     }
    //   })
    // )
    return this.sesionService.obtenerDatosSesion()
    .pipe(
      map((sesion: Sesion) => {
      if (!sesion.usuarioActivo) {
            return true;
            } else {
              this.router.navigate(['/login'])
              return false
            }
    }));

  }

}
