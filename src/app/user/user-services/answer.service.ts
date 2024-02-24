import { AnimateTimings } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/services/storage.service';


const BASIC_URL ="http://localhost:9091/api/"
@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http:HttpClient) { }


  postAnswer(answerDto:any):Observable<any>{
    console.log(answerDto)
    return this.http.post<[]>(BASIC_URL+"answer",answerDto,{
      headers:this.createAuthorizationHeader()
    })
  }

  postAnswerImage(file:any, answerId:number):Observable<any>{
    return this.http.post<[]>(BASIC_URL+`image/${answerId}`,file,{
      headers:this.createAuthorizationHeader()
    })
  }


    
  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set(
      "Authorization", "Bearer " +StorageService.getToken()
    )
  }

}
