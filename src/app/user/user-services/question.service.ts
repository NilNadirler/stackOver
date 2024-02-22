import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/services/storage.service';


const BASIC_URL ="http://localhost:9091/api/question"

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  postQuestion(questionDto:any):Observable<any>{
    questionDto.userId= StorageService.getUserId()
    console.log(questionDto)
    return this.http.post<[]>(BASIC_URL,questionDto,{
      headers:this.createAuthorizationHeader()
    });
  }

  getAllQuestion(pageNumber:number):Observable<any>{
      return this.http.get<[]>(BASIC_URL+`/questions/${pageNumber}`,{
        headers:this.createAuthorizationHeader()
      })
  }

  getQuestionById(questionId:number):Observable<any>{
    console.log(questionId)
       return this.http.get<[]>(BASIC_URL+`/${questionId}`,{
          headers:this.createAuthorizationHeader()
       })
  }

  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set(
      "Authorization", "Bearer " +StorageService.getToken()
    )
  }
}
