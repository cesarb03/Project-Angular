import { Component } from '@angular/core';
import { CoursesService } from '../../core/services/courses/courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent {


  constructor(public coursesService: CoursesService) {}
  ngOnInit(): void {
    this.coursesService.loadCurses();
  }
}
