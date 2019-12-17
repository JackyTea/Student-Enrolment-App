import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  //url
  currentURL: string; 

  //instance
  constructor(private r: Router) { }

  //initialize
  ngOnInit() {
    this.currentURL = this.r.url;
  }

}
