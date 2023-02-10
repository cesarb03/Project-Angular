import { Component } from '@angular/core';
import { Student } from 'src/app/core/interface/students.interface';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from '../components/student-dialog/student-dialog.component';
import { map, Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Sesion } from 'src/app/core/interface/sesion.interface';
import { AuthService } from '../../auth/services/auth.service';
import { StudentsService } from './service/students.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss'],
})
export class StudentsPageComponent {
//   // Estudiante precargados
//   students: Student[] = [
//     {
//       id: 1,
//       firstName: 'Cesar',
//       lastName: 'Bergamasco',
//       email: 'cb@gmail.com',
//       isActive: true,
//     },
//     {
//       id: 2,
//       firstName: 'Daniela',
//       lastName: 'Dominguez',
//       email: 'dd@gmail.com',
//       isActive: true,
//     },
//     {
//       id: 3,
//       firstName: 'Nina',
//       lastName: 'Bergamasco',
//       email: 'nb@gmail.com',
//       isActive: false,
//     },
//     {
//       id: 4,
//       firstName: 'Victoria',
//       lastName: 'Bergamasco',
//       email: 'vb@gmail.com',
//       isActive: true,
//     },
//   ];

//   // Columnas que se van a mostrar en la tabla
//   displayedColumns = [
//     'id',
//     'firstName',
//     'lastName',
//     'email',
//     'isActive',
//     'edit',
//     'delete',
//   ];

//   constructor(private readonly dialogService: MatDialog) {}

//   // Agrega un estudiante
//   addStudent() {
//     const dialog = this.dialogService.open(StudentDialogComponent, {
//       width: '22',
//     });
//     dialog.afterClosed().subscribe((value) => {
//       if (value) {
//         const lastId: number = this.students[this.students.length - 1]?.id;
//         this.students = [
//           ...this.students,
//           {
//             id: lastId + 1,
//             firstName: value.firstName,
//             lastName: value.lastName,
//             email: value.email,
//             isActive: value.isActive,
//           },
//         ];
//       }
//     });
//   }

//   // Modifica un estudiante
//   editStudent(student: Student) {
//     const dialog = this.dialogService.open(StudentDialogComponent, {
//       data: student,
//       width: '21%',
//     });
//     dialog.afterClosed().subscribe((data) => {
//       if (data) {
//         this.students = this.students.map((stu) =>
//           stu.id === student.id ? { ...stu, ...data } : stu
//         );
//       }
//     });
//   }

//   // Elimina un estudiante
//   removeStudent(student: Student) {
//     this.students = this.students.filter((stu) => stu.id !== student.id);
//   }

//   // details(student: Student) {
//   //   this.dialogService.open(StudentDetailsComponent, { data: student });
//   // }
// }
alumno: Student;
alumnos: Student[];
alumnosSubcription!: Subscription
alumnos$!: Observable<Student[]>

dataSource: MatTableDataSource<Student>
displayedColumns: string[] = [
      'id',
      'firstName',
      'lastName',
      'email',
      'isActive',
      'edit',
      'delete',
    ];

sesion$:Observable<Sesion>;
subscription: Subscription;
sesion: Sesion;

constructor(
  private readonly dialogService: MatDialog,
  private alumnoService: StudentsService,
  private sesionService: AuthService,
  private router: Router
) { }

ngOnInit(): void {
  this.alumnos$ = this.alumnoService.obtenerAlumnos();
  this.alumnosSubcription = this.alumnos$.subscribe((alumnos: Student[]) => {
    this.alumnos = alumnos
  })

  this.sesion$ = this.sesionService.obtenerDatosSesion();
  this.subscription = this.sesion$.subscribe(
    (sesion: Sesion) => (this.sesion = sesion));

  this.dataSource = new MatTableDataSource<Student>(this.alumnos);
}


  // Agrega un estudiante
  addStudent() {
    const dialog = this.dialogService.open(StudentDialogComponent, {
      width: '22',
    });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        const lastId: number = this.alumnos[this.alumnos.length - 1]?.id;
        this.alumnos = [
          ...this.alumnos,
          {
            id: lastId + 1,
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            isActive: value.isActive,
          },
        ];
      }
    });
  }


editarAlumno(alumno: Student) {
  this.router.navigate(['/alumnos/edit', alumno])
}

  // Modifica un estudiante
  editStudent(student: Student) {
    const dialog = this.dialogService.open(StudentDialogComponent, {
      data: student,
      width: '21%',
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.alumnos = this.alumnos.map((stu) =>
          stu.id === student.id ? { ...stu, ...data } : stu
        );
      }
    });
  }

eliminarAlumno(elemento: Student) {
  this.alumnoService.eliminarAlumno(elemento).subscribe(() => {
    this.alumnos$ = this.alumnoService.obtenerAlumnos();
  });
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Se elimno correctamente',
    showConfirmButton: false,
    timer: 1500,
  });
}

applyFilter(event: Event) {
  const valorObtenido = (event.target as HTMLInputElement).value;
  this.alumnos$ = this.alumnoService.obtenerAlumnos().pipe(
    map(c => c.filter(
      alumno => alumno.firstName.toLocaleLowerCase().includes(valorObtenido.toLocaleLowerCase())
    ))
  );
}

ngOnDestroy(): void {
  this.alumnosSubcription.unsubscribe();
  this.subscription.unsubscribe();
}
}