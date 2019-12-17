import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Student } from "./studentModelClasses";
import { StudentModelManagerService } from './student-model-manager.service';
import { CourseModelManagerService } from './course-model-manager.service';

@Component({
  selector: 'app-get-one',
  templateUrl: './get-one.component.html',
  styleUrls: ['./get-one.component.css']
})
export class GetOneComponent implements OnInit {

  //student and courses
  studentId: string;
  student: Student;

  //instance
  constructor(private route: ActivatedRoute, private s: StudentModelManagerService, private c: CourseModelManagerService) { }

  //initialize
  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get("studentId");
    this.s.studentsGetOne(this.studentId).subscribe(data => {
      this.student = data;
      this.s.setStudent(this.student);
      this.student.coursesSaved = this.s.getSavedCourses();
    });
  }

}
