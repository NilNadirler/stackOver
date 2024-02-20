import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/auth.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  loginForm!:FormGroup

  constructor(private service:AuthService, private fb:FormBuilder, private storage:StorageService,
    private router:Router,private toastr:ToastrService){}


  ngOnInit(){
      this.loginForm= this.fb.group({
        email:['', Validators.required],
        password:['', Validators.required],
      })
  }

  login(){
      this.service.login(this.loginForm.value).subscribe(res=>{
        console.log(res)
         this.storage.saveToken(res.token)
         this.storage.saveUser(res.userId)
         this.router.navigateByUrl("user/dashboard")
      },(responseError)=>{
        console.log(responseError.error)
        if(responseError.status == 403){
          this.toastr.error("Please register first")
        }
    })
  }
}
