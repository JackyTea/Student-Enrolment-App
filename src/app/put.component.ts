import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { StudentModelManagerService } from './student-model-manager.service';
import { NgForm } from '@angular/forms';
import { Student } from './studentModelClasses';

@Component({
  selector: 'app-put',
  templateUrl: './put.component.html',
  styleUrls: ['./put.component.css']
})
export class PutComponent implements OnInit {

  //students
  studentId: string;
  student: Student;
  updatedStudent: Student;

  //instance
  constructor(private s: StudentModelManagerService, private route: ActivatedRoute, private router: Router) { }

  //initialize
  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get("studentId");
    this.s.studentsGetOne(this.studentId).subscribe(data => {
      this.student = data;
      this.updatedStudent = this.student;
    });
  }

  //edit student
  editStudent(f: NgForm): void {
    /*
    this.s.studentsPut(this.student.studentId, this.updatedStudent).subscribe(data => {
      console.log(data);
    });
    */
    this.router.navigate(['/getall']);
  }
}
