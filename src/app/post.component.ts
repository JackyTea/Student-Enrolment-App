import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { StudentModelManagerService } from './student-model-manager.service';
import { Student } from './studentModelClasses';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  //created student
  newStudent: Student;

  //instance
  constructor(private s: StudentModelManagerService, private router: Router) { }

  //initialize
  ngOnInit() {
    this.s.studentsGetOne("062915334").subscribe(data => {
      this.newStudent = data;
    });
  }

  //create student
  createStudent(f: NgForm): void {
    /*
    this.s.studentsPost(this.newStudent).subscribe(data => {
      console.log(data);
    });
    */
    this.router.navigate(['/getall']);
  }

}
