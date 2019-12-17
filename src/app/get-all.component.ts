import { Component, OnInit } from '@angular/core';
import { Student } from "./studentModelClasses";
import { StudentModelManagerService } from './student-model-manager.service';

@Component({
  selector: 'app-get-all',
  templateUrl: './get-all.component.html',
  styleUrls: ['./get-all.component.css']
})
export class GetAllComponent implements OnInit {

  //student
  students: Student[];

  //instance
  constructor(private s: StudentModelManagerService) { }

  //initialize
  ngOnInit() {
    this.s.studentsGetAll().subscribe(data => {
      this.students = data;
    });
  }

  //bsd filter
  getBSD() {
    this.s.studentsGetAllBSD().subscribe(data => {
      this.students = data;
    });
  }

  //cpa filter
  getCPA() {
    this.s.studentsGetAllCPA().subscribe(data => {
      this.students = data;
    });
  }

}
