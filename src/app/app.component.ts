import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stackOver';


  isUserLoggedIn!:boolean

  constructor(private router:Router){}

  ngOnInit(){
    this.updateUserLoggedInStatus();
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.updateUserLoggedInStatus();
      }
    })
  }
  

  private updateUserLoggedInStatus(){
    this.isUserLoggedIn=StorageService.isUserLoggedIn();
  }

  logout(){

    StorageService.signOut()
    localStorage.clear();
    this.router.navigateByUrl("/login")
  }
}
