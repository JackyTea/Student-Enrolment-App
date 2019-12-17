import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Student } from "./studentModelClasses";
import { Course } from "./courseModelClasses";
import { Observable, of } from 'rxjs';
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudentModelManagerService {

  //url
  private url: string = 'https://fast-caverns-15998.herokuapp.com/api/students';
  private urlBSD: string = 'https://fast-caverns-15998.herokuapp.com/api/students/bsd';
  private urlCPA: string = 'https://fast-caverns-15998.herokuapp.com/api/students/cpa';
  private urlMongoose: string = 'https://fast-caverns-15998.herokuapp.com/api/students/mongoose';

  //student object
  student: Student;

  //instance
  constructor(private http: HttpClient) { }

  //set and get student
  setStudent(student: Student): void {
    this.student = student;
  }

  getStudent(): Student {
    return this.student;
  }

  //cart saved
  cartSaved: Course[];

  //set, get and clear saved courses
  setSavedCourses(courses: Course[]): void {
    this.cartSaved = courses;
  }

  getSavedCourses(): Course[] {
    return this.cartSaved;
  }

  clearSavedCourses(): void {
    this.cartSaved = [];
  }

  //http header options
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  //templated error handler
  private errorHandler<T>(operation = 'operation', res?: T) {
    return (err: any): Observable<T> => {
      console.log(err);
      return of(res as T);
    };
  }

  // save cart
  studentsSaveCart(studentId: string, courses: Course[]): Observable<any> {
    return this.http.put<Student>(`${this.url}/${studentId}/cart/save`, courses, this.options).pipe(
      tap(() => {
        console.log(`Added courses`);
      }),
      catchError(this.errorHandler<Student>('Unable to edit student!'))
    );
  }

  // get all students
  studentsGetAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  // get all BSD students
  studentsGetAllBSD(): Observable<Student[]> {
    return this.http.get<Student[]>(this.urlBSD);
  }

  // get all CPA students
  studentsGetAllCPA(): Observable<Student[]> {
    return this.http.get<Student[]>(this.urlCPA);
  }

  // get one student
  studentsGetOne(studentId: string): Observable<Student> {
    return this.http.get<Student>(`${this.url}/${studentId}`);
  }

  // get one student by mongoose identifier
  studentsGetOneMongooseId(mongooseId: string): Observable<Student> {
    return this.http.get<Student>(`${this.urlMongoose}/${mongooseId}`);
  }

  // add new student
  studentsPost(newStudent: Student): Observable<Student> {
    return this.http.post<Student>(this.url, newStudent, this.options).pipe(
      tap((newItem: Student) => {
        console.log(`Added student with ID: ${newStudent.studentId}`)
      }),
      catchError(this.errorHandler<Student>('Unable to add student!'))
    );
  }

  // edit student
  studentsPut(studentId: string, newStudent: Student): Observable<Student> {
    return this.http.put<Student>(`${this.url}/${studentId}`, newStudent, this.options).pipe(
      tap((newStudent: Student) => {
        console.log(`Edited student with ID: ${newStudent.studentId}`)
      }),
      catchError(this.errorHandler<Student>('Unable to edit student!'))
    );
  }

  // delete student
  studentsDelete(studentId: string) {
    return this.http.delete(`${this.url}/${studentId}`).pipe(
      tap(() => {
        console.log(`Removed student with ID: ${studentId}`)
      }),
      catchError(this.errorHandler('Unable to remove student!'))
    );
  }
}
