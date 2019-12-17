import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Course } from './courseModelClasses';

//local grid
class GridCell {
  cellNumber: number;
  courseCode: string;
  section: string;
  termSectionId: number;
  professor: string;
  cellColour: string;
}

@Component({
  selector: 'app-course-timetable',
  templateUrl: './course-timetable.component.html',
  styleUrls: ['./course-timetable.component.css']
})
export class CourseTimetableComponent implements OnInit, DoCheck {

  //courses
  @Input()
  coursesSelected: Course[] = [];
  coursesSelectedForUI: any[];
  gridCells: GridCell[][];

  //instance
  constructor() { 
    this.clearGrid();
    this.coursesSelectedForUI = [];
  }

  //initialize
  ngOnInit() {
    
  }

  //check grid
  ngDoCheck() {
    this.coursesSelectedForUI = [];
    this.coursesSelected.forEach(c => {
      this.coursesSelectedForUI.push({ ...c, gridCells: this.getPeriods(c) });
    });
    this.coursesSelectedForUI.sort((a, b) => a.gridCells[0] - b.gridCells[0]);
    this.updateGrid();
  }

  //clear grid
  clearGrid(): void {
    this.gridCells = [];
    for (let i = 0; i < 75; i++) {
      this.gridCells.push([]);
    }
  }

  //update grid
  updateGrid(): void {
    this.clearGrid();

    this.coursesSelectedForUI.forEach((c, i) => {
      let periods = this.getPeriods(c);
      
      periods.forEach(p => {
        let gc = new GridCell();
        gc.cellNumber = p;
        gc.courseCode = c.courseCode;
        gc.section = c.section;
        gc.termSectionId = c.termSectionId;
        gc.professor = c.professor;
        gc.cellColour = `bgclr${i}`
        this.gridCells[p].push(gc);
      });
    });
  }

  //get periods
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

}
