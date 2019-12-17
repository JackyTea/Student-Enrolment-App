import { Component, OnInit, Input } from '@angular/core';

//local class
class GridCell {
  cellNumber: number;
  courseCode: string;
  section: string;
  termSectionId: number;
  cellColour: string;
}

@Component({
  selector: 'app-course-cell',
  templateUrl: './course-cell.component.html',
  styleUrls: ['./course-cell.component.css']
})
export class CourseCellComponent implements OnInit {

  //courses in cell
  @Input()
  cellData: GridCell[];

  //instance
  constructor() { }

  //initialize
  ngOnInit() { }

}
