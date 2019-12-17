import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Course } from "./courseModelClasses";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseModelManagerService {

  //urls
  private url: string = 'https://fast-caverns-15998.herokuapp.com/api/courses';
  private urlCPA: string = 'https://fast-caverns-15998.herokuapp.com/api/courses/cpa';
  private urlBSD: string = 'https://fast-caverns-15998.herokuapp.com/api/courses/bsd';

  //selected courses
  coursesSelected: Course[] = [];

  //instance
  constructor(private http: HttpClient) { }

  //set and get and remove selected courses
  setSelectedCourse(course: Course) {
    this.coursesSelected.push(course);
  }

  getSelectedCourses(): Course[] {
    return this.coursesSelected;
  }

  removeSelectedCourse(course: Course) {
    if (this.coursesSelected.includes(course)) {
      this.coursesSelected.splice(this.coursesSelected.indexOf(course), 1);
    }
  }

  //get all courses
  coursesGetAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }

  //cpa winter filter
  coursesGetAllCPAWinter(): Observable<Course[]> {
    return this.http.get<Course[]>(this.urlCPA);
  }

  //bsd winter filter
  coursesGetAllBSDWinter(): Observable<Course[]> {
    return this.http.get<Course[]>(this.urlBSD);
  }

  //get one course
  coursesGetById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.url}/${courseId}`);
  }
}
