import { Component } from '@angular/core';
import { QuestionService } from '../../user-services/question.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  questions:any[];
  pageNum:number=0;
  total:number;

  constructor(private service:QuestionService){}

  ngOnInit(){
   this.getAllQuestions();
  }

  getAllQuestions(){
    this.service.getAllQuestion(this.pageNum).subscribe(res=>{
       this.questions= res.questionDtoList;
       this.total=res.totalPages*5
    })
  }

  pageIndexChange(event:any){
       this.pageNum=event.pageIndex;
       this.getAllQuestions();
  }
}
