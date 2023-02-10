import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from 'src/app/core/interface/user.interface';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnDestroy {

  formulario: FormGroup;

  usuarios!: Usuario[];
  usuarios$!: Observable<Usuario[]>;
  subscription!: Subscription;

  validacion!: Usuario;

  constructor(
    private sesioService: AuthService,
    private router: Router,
    private usuarioService: UserService
  ){
    this.formulario = new FormGroup({
      usuario: new FormControl('', [Validators.email, Validators.required]),
      contrasena: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.usuarios$ = this.usuarioService.obtenerUsuarios();
    this.subscription = this.usuarios$.subscribe(
      (usuarios) => (this.usuarios = usuarios)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  validacionUsuario() {
    const formUsuario = this.formulario.value.usuario;
    const formPass = this.formulario.value.contrasena;
    const encontrarUsuario = this.usuarios.find(
      (el) => el.usuario === formUsuario
    );

    if (encontrarUsuario != undefined) {
      if (encontrarUsuario.contrasena === formPass) {
        this.validacion = encontrarUsuario;
        this.sesioService.login(
          encontrarUsuario.usuario,
          encontrarUsuario.contrasena,
          encontrarUsuario.admin,
          encontrarUsuario.id,
          encontrarUsuario.nombre,
          encontrarUsuario.img
        );
        this.router.navigate(['/students']);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'contraseña incorrecta',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'usuario icorrecto',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}