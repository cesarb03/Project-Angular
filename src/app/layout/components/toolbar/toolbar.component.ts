import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Sesion } from 'src/app/core/interface/sesion.interface';
import { Usuario } from 'src/app/core/interface/user.interface';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})

export class ToolbarComponent implements OnInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter();
  
  usuario: Usuario;
  sesion$:Observable<Sesion>;
  subscription: Subscription;
  sesion: Sesion;
  
  public usuarioActivo: Usuario | null = null;


  constructor( 
    private router: Router,
    private sesionService: AuthService
   ) { }

  ngOnInit(): void {
    this.sesion$ = this.sesionService.obtenerDatosSesion();
    this.subscription = this.sesion$.subscribe(
      (sesion: Sesion) => (this.sesion = sesion));
  }

  logOut() {
    this.sesion.sesionActiva = false;
    this.sesion.usuarioActivo = {
      admin: false,
      id: -1,
      contrasena: '',
      usuario: '',
      nombre:'',
      img:'',
    };
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
