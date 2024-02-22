import { AnimateTimings } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/services/storage.service';


const BASIC_URL ="http://localhost:9091/api/answer"
@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http:HttpClient) { }


  postAnswer(answerDto:any):Observable<any>{
    console.log(answerDto)
    return this.http.post<[]>(BASIC_URL,answerDto,{
      headers:this.createAuthorizationHeader()
    })
  }


    
  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set(
      "Authorization", "Bearer " +StorageService.getToken()
    )
  }

}
