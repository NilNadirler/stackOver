import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/services/storage.service';
import { AnswerService } from '../../user-services/answer.service';
import { QuestionService } from '../../user-services/question.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent {

  questionId:number= this.activatedRoute.snapshot.params["questionId"]
  question:any;
  validateForm:FormGroup

  constructor(private service:QuestionService, private activatedRoute:ActivatedRoute,
    private answerService:AnswerService, private fb:FormBuilder){}
  
  ngOnInit(){
   
    this.validateForm= this.fb.group({
      body:[null, Validators.required]
    })

    this.getQuestionById()
  }

  getQuestionById(){
    this.service.getQuestionById(this.questionId).subscribe(res=>{
      this.question= res.questionDto
      console.log(this.question)
    })
  }

  addAnswer(){
    const data = this.validateForm.value;
    data.questionId= this.questionId;
    data.userId= StorageService.getUserId()
    this.answerService.postAnswer(data).subscribe(res=>{
    })
    this.validateForm.reset();
    }
  }


