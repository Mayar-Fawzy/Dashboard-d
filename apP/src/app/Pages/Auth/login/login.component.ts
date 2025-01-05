import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NgModel, ReactiveFormsModule } from '@angular/forms';


import { AuthService } from '../../../core/Services/auth.service';
import { Toast } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { error } from 'node:console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorr:string='';
    isloading = false;
    constructor(private _ServService:AuthService  ,private _router:Router){}
    LoginForrm:FormGroup=new FormGroup({
       
       
        email:new FormControl(null ,[Validators.required,Validators.email]),
        password:new FormControl(null ,[Validators.required, Validators.pattern(/^[A-Z0-9a-z]{6,}/)]),
       
       })
     
       SubmitLogin()
       { 
        const email = this.LoginForrm.get('email')?.value;
        const password = this.LoginForrm.get('password')?.value;
        if(email=="mayar288@gmail.com"&& password=="Mayar2872003"){
          this._ServService.Login(this.LoginForrm.value).subscribe(
            {
  
              next:(res)=>{
                  console.log(res);
                  if(res.message=='success'){
                    localStorage.setItem('userToken',res.token);
                    //decode
                    this._ServService.saveuserdata();
                    this._router.navigate(['/home']);

                  }
                error:()=>{
                  console.log(res.error);
                }
  
               
              }
            }
          )
        }
        else{
          console.log("error email or password");
        }
      
       }
}
