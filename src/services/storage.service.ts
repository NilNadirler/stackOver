import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor() { }
  
  saveUser(userId: any) {
     window.localStorage.setItem("userId",userId);
  }
  saveToken(token: any) {
    window.localStorage.setItem("token",token)
  }

  static signOut(){
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("userId")
    window.localStorage.clear()
  }
  static getToken(){
    return localStorage.getItem("token");
  }

  static isUserLoggedIn(){
    if(this.getToken()==null){
      return false;
    }
    return true;
  }
  
  static getUserId(){
    return localStorage.getItem("userId")
  }

}
