import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  errorMessage: string;
  form;

  constructor(private fb:FormBuilder, private myRoute: Router, private auth: AuthService) {
    this.form = fb.group({
      email:['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }

  login(){
    this.auth.doLogin(this.form.value).then(res => {
      this.myRoute.navigate(['product-list']);
    }, err => {
      alert(`Wrong username or password!`);
      this.errorMessage = err.message;
    });
  }
  fbLogin(){
    this.auth.doFacebookLogin().then(res => {
      this.myRoute.navigate(['product-list']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    });
  }
  googleLogin(){
    this.auth.doGoogleLogin().then(res => {
      this.myRoute.navigate(['product-list']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    });
  }
  githubLogin(){
    this.auth.doGithubLogin().then(res => {
      this.myRoute.navigate(['product-list']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    });
  }
}
