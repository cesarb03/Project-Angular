import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from 'src/app/core/interface/user.interface';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy{

  formularioRegister: FormGroup;

  usuarios!: Usuario[];
  usuarios$!: Observable<Usuario[]>;
  subscription!: Subscription;

  constructor(
    private router: Router,
    private usuarioService: UserService
  ) {
    this.formularioRegister = new FormGroup({
      usuario: new FormControl('', [Validators.email, Validators.required]),
      contrasena: new FormControl('', [Validators.minLength(6), Validators.required,]),
      admin: new FormControl(),
      nombre: new FormControl(''),
      img: new FormControl(''),
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

  agregarUsuario() {
    let id: number = Math.max.apply(null,this.usuarios.map((o) => o.id));

    const usuario: Usuario = {
      id: id + 1,
      usuario: this.formularioRegister.value.usuario,
      contrasena: this.formularioRegister.value.contrasena,
      admin: this.formularioRegister.value.admin,
      nombre: this.formularioRegister.value.nombre,
      img:this.formularioRegister.value.img
    };

    this.usuarioService.agregarUsuario(usuario).subscribe(() => {
      this.router.navigate(['/auth'])
    });
  }

  validacionRegistro() {
    const formUsuario = this.formularioRegister.value.usuario;
    const formPass = this.formularioRegister.value.contrasena;
    const encontrarUsuario = this.usuarios.find(
      (el) => el.usuario === formUsuario
    );
    if (encontrarUsuario === undefined) {
      this.agregarUsuario();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se Agrego un nuevo Usuario',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Lo sentimos el Usuario ya se encuentra registrado',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
