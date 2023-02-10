import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Student } from 'src/app/core/interface/students.interface';
import { environmentsPROD } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private apiURL = environmentsPROD.apiURL1;

  constructor(
    private http: HttpClient
  ) { }

  obtenerAlumnos(): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.apiURL}/students`).pipe(catchError(this.manejoError));
  }

  agregarAlumno(alumno:Student):Observable<Student>{
    return this.http.post<Student>(`${this.apiURL}/students`, alumno).pipe(catchError(this.manejoError));
  }
  eliminarAlumno(alumno:Student):Observable<Student>{
    return this.http.delete<Student>(`${this.apiURL}/students/${alumno.id}`).pipe(catchError(this.manejoError));
  }
  editarAlumno(alumno : Student):Observable<Student>{
    return this.http.put<Student>(`${this.apiURL}/students/${alumno.id}`, alumno).pipe(catchError(this.manejoError));
  }
  /*TESTING */
  testingAlumnos(){
    return this.http.get<Student[]>(`${this.apiURL}/students`)
  }

  private manejoError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.warn('error del aldo del cliente', error.error.message);
    } else {
      console.warn('error del aldo del servidor', error.error.message);
    }

    return throwError(() => new Error('error en la conmunicacion HTTP'));
  }
}
