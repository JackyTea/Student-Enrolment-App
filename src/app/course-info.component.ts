import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CourseModelManagerService } from './course-model-manager.service';
import { Course } from './courseModelClasses';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  //course info
  courseId: number;
  course: Course;

  //instance
  constructor(private route: ActivatedRoute,  private c: CourseModelManagerService) { }

  //initialize
  ngOnInit() {
    var stringID = this.route.snapshot.paramMap.get("courseId");
    this.courseId = parseInt(stringID);
    console.log(this.courseId);
    this.c.coursesGetById(this.courseId).subscribe(data => {
      this.course = data;
    })
  }

}
