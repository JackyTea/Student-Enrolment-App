import { Component, OnInit } from '@angular/core';
import { CourseModelManagerService } from './course-model-manager.service';
import { Course } from './courseModelClasses';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  //courses
  courses: Course[];

  //instance
  constructor(private c: CourseModelManagerService) { }

  //initialize
  ngOnInit() {
    this.c.coursesGetAll().subscribe(data => {
      this.courses = data;
    });
  }

  //cpa filter
  getCPA() {
    this.c.coursesGetAllCPAWinter().subscribe(data => {
      this.courses = data;
    });
  }

  //bsd filter
  getBSD() {
    this.c.coursesGetAllBSDWinter().subscribe(data => {
      this.courses = data;
    });
  }

}
