import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetAllComponent } from './get-all.component';
import { NavBarComponent } from './nav-bar.component';
import { GetOneComponent } from './get-one.component';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';
import { AboutComponent } from './about.component';
import { PutComponent } from './put.component';
import { PostComponent } from './post.component';
import { DeleteComponent } from './delete.component';
import { CourseListComponent } from './course-list.component';
import { CourseInfoComponent } from './course-info.component';
import { CourseCartComponent } from './course-cart.component';
import { CourseTimetableComponent } from './course-timetable.component';
import { CourseCellComponent } from './course-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    GetAllComponent,
    NavBarComponent,
    GetOneComponent,
    HomeComponent,
    NotFoundComponent,
    AboutComponent,
    PutComponent,
    PostComponent,
    DeleteComponent,
    CourseListComponent,
    CourseInfoComponent,
    CourseCartComponent,
    CourseTimetableComponent,
    CourseCellComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
