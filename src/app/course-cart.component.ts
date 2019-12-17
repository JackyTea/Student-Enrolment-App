import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Student } from "./studentModelClasses";
import { StudentModelManagerService } from './student-model-manager.service';
import { CourseModelManagerService } from './course-model-manager.service';
import { Course } from './courseModelClasses';

@Component({
  selector: 'app-course-cart',
  templateUrl: './course-cart.component.html',
  styleUrls: ['./course-cart.component.css']
})
export class CourseCartComponent implements OnInit, DoCheck {

  //local student
  student: Student;

  //courses
  @Input()
  coursesSelected: Course[] = [];
  coursesPossible: Course[] = [];
  coursesMatched: Course[] = [];
  coursesSelectedForUI: any[];

  //instance
  constructor(private router: Router, private route: ActivatedRoute, private s: StudentModelManagerService, private c: CourseModelManagerService) { }

  //initialize
  ngOnInit() {
    this.student = this.s.getStudent();
    if(!this.student) {
      this.router.navigate(['/getall']);
    }
    this.c.coursesGetAll().subscribe(data => {
      this.coursesPossible = data;
      this.courseMatch();
    });
    var actionDiv = document.querySelector("#action-message");
    actionDiv.innerHTML = "";
  }

  //check ui
  ngDoCheck() {
    this.coursesSelectedForUI = [];
    this.coursesSelected.forEach(c => {
      this.coursesSelectedForUI.push({ ...c, gridCells: this.getPeriods(c) });
    });
    this.coursesSelectedForUI.sort((a, b) => a.gridCells[0] - b.gridCells[0]);
  }

  //time periods
  private getPeriods(c: Course): number[] {
    let day = 1;
    if (c.classTue == 'Y') day = 16;
    if (c.classWed == 'Y') day = 31;
    if (c.classThu == 'Y') day = 46;
    if (c.classFri == 'Y') day = 61;

    let timesStart = ["8:00", "8:55", "9:50", "10:45", "11:40", "12:35", "13:30", "14:25", "15:20", "16:15", "17:10", "18:05"];
    let periodStart = timesStart.findIndex(t => t == c.classStart);

    let timesEnd = ["8:50", "9:45", "10:40", "11:35", "12:30", "13:25", "14:20", "15:15", "16:10", "17:05", "18:00", "18:55"];
    let periodEnd = timesEnd.findIndex(t => t == c.classEnd);

    let periods: number[] = [];
    for (let i = periodStart; i <= periodEnd; i++) {
      periods.push(day + i);
    }
    return periods;
  }

  //possible courses
  courseMatch(): void {
    //check if course is full or not
    this.coursesPossible = this.coursesPossible.filter((course) => {
      return course.enrolTotal < 4
    });

    //look for prerequisites
    for (var i = 0; i < this.coursesPossible.length; i++) {
      var hasPreReqs = false;
      for (var j = 0; j < this.student.credits.length; j++) {
        if (this.coursesPossible[i].prerequisite.includes(this.student.credits[j].courseCode)) {
          hasPreReqs = true;
        }
        else {
          hasPreReqs = false;
        }
        if (hasPreReqs == true) {
          this.coursesMatched.push(this.coursesPossible[i]);
        }
      }
    }

    //remove old courses
    for (var i = 0; i < this.student.credits.length; i++) {
      this.coursesMatched = this.coursesMatched.filter((course) => {
        return course.courseCode != this.student.credits[i].courseCode;
      })
    }

    //get unique values
    this.coursesMatched = this.coursesMatched.filter((object, position, array) => {
      return array.map(courseData => courseData.termSectionId).indexOf(object.termSectionId) === position;
    });

    //get rid of seconds
    for(var i = 0; i < this.coursesMatched.length; i++) {
      this.coursesMatched[i].classStart =  this.coursesMatched[i].classStart.substring(0, this.coursesMatched[i].classStart.length - 3);

      this.coursesMatched[i].classEnd =  this.coursesMatched[i].classEnd.substring(0, this.coursesMatched[i].classEnd.length - 3);
    }
  }

  //courses selected
  courseSelect(course: Course): void {
    if (this.coursesSelected.includes(course)) {
      this.coursesSelected.splice(this.coursesSelected.indexOf(course), 1);
    }
    else {
      this.coursesSelected.push(course);
    }
  }

  //is course selected?
  isCourseSelected(course: Course): boolean {
    return this.coursesSelected.includes(course);
  }

  //save shopping cart
  taskSaveCart(): void {
    //pass filled array
    this.s.setSavedCourses(this.coursesSelected);
    this.student.coursesSaved = this.coursesSelected;
    this.s.studentsSaveCart(this.student.studentId, this.coursesSelected).subscribe();
    var actionDiv = document.querySelector("#action-message");
    actionDiv.innerHTML = "";
    var saveMsg = document.createTextNode("Cart saved!");
    actionDiv.appendChild(saveMsg);
  }

  //clear shopping cart
  taskClear(): void {
    //pass empty array
    this.coursesSelected = [];
    this.s.clearSavedCourses();
    this.s.studentsSaveCart(this.student.studentId, this.coursesSelected).subscribe();
    var actionDiv = document.querySelector("#action-message");
    actionDiv.innerHTML = "";
    var clearMsg = document.createTextNode("Cart cleared!");
    actionDiv.appendChild(clearMsg);
  }

  //confirm timetable
  taskConfirmTable(): void {
    //confirmation logic not complete...
    console.log("Work in progress");
    var actionDiv = document.querySelector("#action-message");
    actionDiv.innerHTML = "";
    var confirmMsg = document.createTextNode("Cart confirmation is currently not working!");
    actionDiv.appendChild(confirmMsg);
  }
}
