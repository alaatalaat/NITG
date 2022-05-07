import { Router } from '@angular/router';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(public translate:TranslateService,private api:ApiService,private router:Router){
  }

  ngOnInit(): void {
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = this.signupForm.get('password')?.value;
    let confirmPass = this.signupForm.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true }
  }
  signupForm:FormGroup= new FormGroup({
    userName : new FormControl('', [Validators.required]),
    password : new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    phone:new FormControl('',[Validators.required]),
  })


  submit(){
    console.log(this.signupForm.value);
    // this.signupForm.reset();

    this.api.postUser(this.signupForm.value).subscribe({
      next : (res) =>{
        alert("Successfully Signup 👍 ");
        this.signupForm.reset();
        this.router.navigateByUrl('signin');
      },
      error : ()=>{
        alert("Error While Signup ❌")
      }
    })
  }


  togglePassword(el:HTMLElement){
    let passwordInput = document.getElementsByTagName("input")[1];
    if(passwordInput.type === "password"){
      passwordInput.type = "text";
      el.className = 'fa fa-eye';
    }else{
      passwordInput.type = "password";
      el.className = 'fa fa-eye-slash';
    }
  }

  toggleConfirmPassword(el:HTMLElement){
    let confirmPasswordInput = document.getElementsByTagName("input")[2];
    if(confirmPasswordInput.type === "password"){
      confirmPasswordInput.type = "text";
      el.className = 'fa fa-eye';
    }else{
      confirmPasswordInput.type = "password";
      el.className = 'fa fa-eye-slash';
    }
  }

}
