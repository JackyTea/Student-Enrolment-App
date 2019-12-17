import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { StudentModelManagerService } from "./student-model-manager.service";
import { Student } from "./studentModelClasses";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  //student 
  studentId: string;
  student: Student;

  //instance
  constructor(private s: StudentModelManagerService, private route: ActivatedRoute, private router: Router) { }

  //initialize
  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get("studentId");
    this.s.studentsGetOne(this.studentId).subscribe(data => {
      this.student = data;
    });
  }

  //delete student
  deleteStudent(f: NgForm): void {
    //this.s.studentsDelete(this.studentId).subscribe();
    this.router.navigate(['/getall']);
  }

}
