import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/core/interface/students.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StudentsService } from '../../students-page/service/students.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss'],
})

export class StudentDialogComponent implements OnInit, OnDestroy{

  alumnos: Student[];
  alumnoSubcription: Subscription;
  alumnosFormulario: FormGroup;
  id: number;

  constructor(
    private readonly dialogRef: DialogRef,
    // @Inject(MAT_DIALOG_DATA) public data: Student | null,
    private alumnoService : StudentsService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.alumnoSubcription = this.alumnoService.obtenerAlumnos().subscribe((alumno) => this.alumnos = alumno)

    this.alumnosFormulario = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName:new FormControl('', [Validators.required]),
      email:new FormControl('', [Validators.required]),
      isActive:new FormControl(''),
    })
  }

  guardarAlumno(){
    let idAlumno:number = Math.max.apply(null, this.alumnos.map(o => o.id));

    let student : Student = {
      id: idAlumno+1,
      firstName: this.alumnosFormulario.value.firstName,
      lastName:this.alumnosFormulario.value.lastName,
      email:this.alumnosFormulario.value.email,
      isActive:this.alumnosFormulario.value.isActive
    }
    this.alumnoService.agregarAlumno(student).subscribe(()=>this.router.navigate(['/students']));
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se Agrego un nuevo Alumno',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  ngOnDestroy(): void {
    this.alumnoSubcription.unsubscribe();
  }

  close() {
    this.dialogRef.close();
  }

}
