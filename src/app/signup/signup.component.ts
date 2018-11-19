import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  pwd: string;
  pwd2: string;
  name: string;
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

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
      console.log(this.email);
      console.log(this.pwd);
    }
  }

}
