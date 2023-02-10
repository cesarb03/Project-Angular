import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/interface/course.interface';
import { CoursesService } from '../../core/services/courses/courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent {
  // courses: Observable<Course[]>


  constructor(public coursesService: CoursesService) {}
  ngOnInit(): void {
    this.coursesService.loadCurses();
  }






}
