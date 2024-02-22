import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from '../guards/user-auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostQuestionComponent } from './components/post-question/post-question.component';
import { ViewQuestionComponent } from './components/view-question/view-question.component';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent, canActivate:[UserAuthGuard]},
  {path:'question', component:PostQuestionComponent, canActivate:[UserAuthGuard]},
  {path:'question/:questionId', component:ViewQuestionComponent, canActivate:[UserAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
