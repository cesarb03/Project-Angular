import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Sesion } from 'src/app/core/interface/sesion.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  sesionSubject: BehaviorSubject<Sesion>;

  constructor() {
    const sesion: Sesion = {
      sesionActiva: false,
    };
    this.sesionSubject = new BehaviorSubject(sesion);
  }

  login(usuario: string, contrasena: string, admin: boolean, id: number, nombre: string, img: string) {
    const sesion: Sesion = {
      sesionActiva: true,
      usuarioActivo: {
        id: id,
        usuario: usuario,
        contrasena: contrasena,
        admin: admin,
        nombre:nombre,
        img:img
      },
    };
    this.sesionSubject.next(sesion);
  }

  obtenerDatosSesion(): Observable<Sesion> {
    return this.sesionSubject.asObservable();
  }

  clearToken(){
    return sessionStorage.setItem("token",'')
  }
}
