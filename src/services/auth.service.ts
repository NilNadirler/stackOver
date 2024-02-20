import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL=['http://localhost:9091/']

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   

  constructor(private http:HttpClient) {
  
   }

   signup(signupRequest:any):Observable<any>{
    return this.http.post(BASIC_URL+"sign-up",signupRequest)
   }

   login(loginRequest:any):Observable<any>{
    return this.http.post(BASIC_URL+"authenticate",loginRequest)
   }
}
