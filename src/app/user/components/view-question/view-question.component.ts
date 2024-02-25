import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  validateForm:FormGroup;
  imagePreview:string | ArrayBuffer | null;
  selectedFile:File | null
  formData:FormData= new FormData();
  answers=[];

  constructor(private service:QuestionService, private activatedRoute:ActivatedRoute,
    private answerService:AnswerService, private fb:FormBuilder,private toastr:ToastrService){}
  
  ngOnInit(){
   
    this.validateForm= this.fb.group({
      body:[null, Validators.required]
    })

    this.getQuestionById()
 
  }

  getQuestionById(){
    this.service.getQuestionById(this.questionId).subscribe(res=>{
      console.log(res)
      this.question= res.questionDto
      console.log(this.question)
      res.answerDtoList.forEach(element => {
          if(element.file !=null){
            element.convertedImg = 'data:image/jpeg;base64,'+ element.file.data;
          }
       this.answers.push(element)

      }); 
      })
    
    
  }

  addAnswer(){
    const data = this.validateForm.value;
    data.questionId= this.questionId;
    data.userId= StorageService.getUserId()
    this.formData.append("multipartFile", this.selectedFile)
    this.answerService.postAnswer(data).subscribe(res=>{
      this.answerService.postAnswerImage(this.formData,res.id).subscribe((res)=>{
        console.log("Post Answer Image API", res)
      })
      console.log("Post Answer API response",res)
    })
    }

    onFileSelected(event:any){
      this.selectedFile= event.target.files[0];
      this.previewImage();
    }

    previewImage(){
      const reader= new FileReader();
      reader.onload= ()=>{
        this.imagePreview= reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }

    addVote(voteType:string){
      const data={
        voteType: voteType,
        userId: StorageService.getUserId(),
        questionId:this.questionId
      }

      this.service.addVoteToQuestion(data).subscribe((res)=>{
        if(res.id !=null){
          this.toastr.success("Vote added successfully")
        }else{
          this.toastr.error("Somethin went wrong")
        }
      })
    }
  }


