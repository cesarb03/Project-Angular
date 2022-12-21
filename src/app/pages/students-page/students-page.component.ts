import { Component } from '@angular/core';
import { Student } from 'src/app/interface/students.interface';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from 'src/app/shared/components/student-dialog/student-dialog.component';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent {
  // Estudiante precargados
  students : Student[] = [
    {id:1, firstName:'Lionel',  lastName: 'Messi',    email:'lmessi@gmail.com',    isActive: true},
    {id:2, firstName:'Angel',   lastName: 'Di Maria', email:'adimaria@gmail.com',  isActive: true},
    {id:3, firstName:'Lautaro', lastName: 'Martinez', email:'lmartinez@gmail.com', isActive: false},
    {id:4, firstName:'Emiliano',lastName: 'Martinez', email:'emartinez@gmail.com', isActive: true}
  ]

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['id', 'details', 'firstName', 'lastName', 'email', 'isActive', 'edit', 'delete'];

  constructor(private readonly dialogService: MatDialog) {}

  // Agrega un estudiante
  // addStudent() {
  //   const dialog = this.dialogService.open(StudentDialogComponent, { width: '60%' });
  //   dialog.afterClosed().subscribe((value) => {
  //     if (value) {
  //       const lastId = this.students[this.students.length -1]?.id;
  //       this.students = [...this.students, this.students(lastId+1, value.firstName, value.lastName, value.email, value.isActive)];
  //     }
  //   })
  // }

  // Modifica un estudiante
  editStudent(student: Student) {
    const dialog = this.dialogService.open(StudentDialogComponent, { data: student, width: '60%' });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.students = this.students.map((stu) => stu.id === student.id ? { ...stu, ...data } : stu);
      }
    })
  }

  // Elimina un estudiante
  removeStudent(student: Student) {
    this.students = this.students.filter((stu) => stu.id !== student.id);
  }

  // details(student: Student) {
  //   this.dialogService.open(StudentDetailsComponent, { data: student });
  // }
}
