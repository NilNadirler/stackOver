import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  
   signupForm!:FormGroup

  constructor(private service:AuthService, private fb:FormBuilder,private toastr:ToastrService,
   private router:Router){}

  ngOnInit(){
    this.signupForm =this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
    },{validator:this.confirmationValidator})
  
  }

  private confirmationValidator(fg:FormGroup){
    const password = fg.get('password')?.value;
    const confirmPassword= fg.get('confirmPassword')?.value;
    if(password !=confirmPassword){
      fg.get('confirmPassword')?.setErrors({passwordMismatch:true});
    }else{
      fg.get('confirmPassword')?.setErrors(null)
    }
  }

  signup(){
    this.service.signup(this.signupForm.value).subscribe(res=>{
      if(res.id !==null){
        this.toastr.success("Successfully Register")
        this.router.navigateByUrl("/login")
       
      }
    }, responseError=>{
      this.toastr.error(responseError.error)
    })
  }
}
