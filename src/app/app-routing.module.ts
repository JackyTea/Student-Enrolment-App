import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetOneComponent } from './get-one.component';
import { GetAllComponent } from './get-all.component';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';
import { AboutComponent } from './about.component';
import { PutComponent } from './put.component';
import { PostComponent } from './post.component';
import { DeleteComponent } from './delete.component';
import { CourseListComponent } from './course-list.component';
import { CourseInfoComponent } from './course-info.component';
import { CourseCartComponent } from './course-cart.component';

const routes: Routes = [{ path: 'home', component: HomeComponent },
{ path: 'about', component: AboutComponent },
{ path: 'getall', component: GetAllComponent },
{ path: 'getall/:studentId', component: GetOneComponent },
{ path: 'put/:studentId', component: PutComponent },
{ path: 'post', component: PostComponent },
{ path: 'delete/:studentId', component: DeleteComponent },
{ path: 'courselist', component: CourseListComponent },
{ path: 'courselist/:courseId', component: CourseInfoComponent },
{ path: 'cart', component: CourseCartComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: '**', component: NotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
