import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, mergeMap, Observable, take, tap } from 'rxjs';
import { Course } from '../../interface/course.interface';

export interface ICoursesService {
  courses$: Observable<Course[]>;
  loadCurses(): void;
  createCourses(data: Pick<Course, 'url' | 'name'>): void;
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService implements ICoursesService {
  private readonly baseUrl = 'https://63cadfea4f53a004202cf446.mockapi.io/api/';
  private courses = new BehaviorSubject<Course[]>([])
  public courses$: Observable<Course[]>;
  constructor(private httpClient: HttpClient) {
    this.courses$ = this.courses.asObservable();
  }

  loadCurses() {
    this.httpClient.get<Course[]>(`${this.baseUrl}/cursos`)
      .subscribe((apiCourses) => {
        this.courses.next(apiCourses)
      })
  }

  createCourses(data: Pick<Course, 'url' | 'name'>) {
    this.courses$
      .pipe(
        take(1),
        mergeMap(
          (currentCourses) =>
            this.httpClient.post<Course>(`${this.baseUrl}/cursos`, data)
              .pipe(
                tap(
                  (createCourse => this.courses.next([...currentCourses, createCourse]))
                )
              )
        ),
      ).subscribe()
  }
}
