import { Component, inject } from '@angular/core';
import { QuestionService } from '../../user-services/question.service';
import {COMMA,ENTER} from '@angular/cdk/keycodes'
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})
export class PostQuestionComponent {

   tags:any[]=[];
   addOnBlur=true;
   isSubmitting:boolean;
   validateForm:FormGroup;

   readonly separatorKeysCodes=[ENTER,COMMA] as const;
   announcer = inject(LiveAnnouncer);

   add(event:MatChipInputEvent):void{
      const value =(event.value || '').trim();
      if(value){
        this.tags.push({ name :value})
      }

      event.chipInput!.clear();
   }

   remove(tag:any):void{
       const index= this.tags.indexOf(tag);
       if(index>=0){
         this.tags.splice(index,1)
         this.announcer.announce(`Removed ${tag}`)

       }
       
   }

   edit(tag:any, event:MatChipEditedEvent){
      const value = event.value.trim();
      if(!value){
        this.remove(tag);
        return;
      }
      const index= this.tags.indexOf(tag);
      if(index>=0){
        this.tags[index].name=value;
      }
   }

   
   constructor(private service:QuestionService,private fb:FormBuilder){}

  ngOnInit(){
    this.validateForm=this.fb.group({
      title:['', Validators.required],
      body:['', Validators.required],
      tags:['', Validators.required],
    })
  }

  postQuestion(){
    this.service.postQuestion(this.validateForm.value).subscribe(res=>{
      console.log(res)
    })
  }
}
