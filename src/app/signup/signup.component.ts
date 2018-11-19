import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  email: string;
  pwd: string;
  pwd2: string;
  name: string;
  constructor(private auth: AuthService, private myRoute: Router) { }

  passwordNotMatch() { // here we have the 'passwords' group
  if(this.pwd!==this.pwd2){
    return true;
  }  
  return false;   
}

  register(){
    if(this.passwordNotMatch()){
      alert("Passwords don't match");
    }
    else{
      this.auth.signup(this.email,this.pwd, this.name);
      this.myRoute.navigate(['login']);
    }
  }

}
