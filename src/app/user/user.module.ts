import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostQuestionComponent } from './components/post-question/post-question.component';
import { SharedModule } from 'src/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewQuestionComponent } from './components/view-question/view-question.component';
import { GetQuestionUserIdComponent } from './components/get-question-user-id/get-question-user-id.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PostQuestionComponent,
    ViewQuestionComponent,
    GetQuestionUserIdComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    SharedModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
