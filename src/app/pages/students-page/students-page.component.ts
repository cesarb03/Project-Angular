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
    {id:1, firstName:'Cesar',  lastName: 'Bergamasco',    email:'cb@gmail.com',    isActive: true},
    {id:2, firstName:'Daniela',   lastName: 'Dominguez', email:'dd@gmail.com',  isActive: true},
    {id:3, firstName:'Nina', lastName: 'Bergamasco', email:'nb@gmail.com', isActive: false},
    {id:4, firstName:'Victoria',lastName: 'Bergamasco', email:'vb@gmail.com', isActive: true}
  ]

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'isActive', 'edit', 'delete'];

  constructor(private readonly dialogService: MatDialog) {}

  // Agrega un estudiante
  addStudent() {
    const dialog = this.dialogService.open(StudentDialogComponent, { width: '22' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        const lastId: number = this.students[this.students.length -1]?.id;
       this.students = [...this.students, { id: lastId+1, firstName: value.firstName, lastName: value.lastName, email: value.email, isActive: value.isActive }];
      }
    })
  }

  // Modifica un estudiante
  editStudent(student: Student) {
    const dialog = this.dialogService.open(StudentDialogComponent, { data: student, width: '21%' });
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
