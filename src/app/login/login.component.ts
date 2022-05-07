import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewChild ,ElementRef } from '@angular/core';

import { ToastrService } from 'ngx-toastr';


import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';

declare var window: any;
declare var FB: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  // belong to google Login
  @ViewChild("loginRef", { static: true }) loginElement? : ElementRef;
  auth2: any;
  show: any;
  Name: any;

  allUsers = [];
  toastr: any;
  constructor(
    public translate:TranslateService,
    private api:ApiService,
    private router:Router) { }

  loginForm:FormGroup= new FormGroup({
    password : new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
  });
  ngOnInit(): void {
    this.googleInitialize();
    /* Facebook Login */
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '675372383694333',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      FB.AppEvents.logPageView();
    };
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = <HTMLScriptElement>d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode?.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

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

  submitLoginForm(){
    this.api.getUsersInfo().subscribe((data)=>{
      this.allUsers = data;
      console.log(this.allUsers);
      for(let i=0;i<data.length;i++){
        if(data[i].email === this.loginForm.get('email')?.value && data[i].password === this.loginForm.get('password')?.value){
          console.log(data[i].password);
          this.router.navigateByUrl('/mcq')
        }
      }
    })


  }

  /* GOOgle Login */
  googleInitialize(): void {
    window["googleSDKLoaded"] = () => {
      window["gapi"].load("auth2", () => {
        this.auth2 = window["gapi"].auth2.init({
          client_id:"523677402492-o587lbuqhp4ssuni1qfl1vpo93s2dd3c.apps.googleusercontent.com",
          cookie_policy: "single_host_origin",
          scope: "profile email",
        });
        this.prepareLogin();
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = <HTMLScriptElement>d.createElement(s);
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, "script", "google-jssdk");
  }

  prepareLogin() {
    this.auth2.attachClickHandler(
      this.loginElement?.nativeElement,
      {},
      (googleUser:any) => {
        let profile = googleUser.getBasicProfile();
        console.log("Token || " + googleUser.getAuthResponse().id_token);
        this.show = true;
        this.Name = profile.getName();
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());
        this.router.navigateByUrl('/mcq');
      },
      (error:any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }


  /*Facebook */
  submitLogin(){
    console.log("submit login to facebook");
    // FB.login();
    FB.login((response:any)=>
        {
          console.log('submitLogin',response);
          if(response.authResponse)
          {
            this.toastr.successToastr('login successful', 'Success!');
            this.router.navigateByUrl('mcq');
          }
          else
          {
           console.log('User login failed');
          }
    });

  }


}
