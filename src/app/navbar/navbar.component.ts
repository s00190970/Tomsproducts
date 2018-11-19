import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  title: string = "Toms Products";

  isLoggedIn: boolean;

  constructor(private auth: AuthService, private myRoute: Router) { }

  userLoggedIn():boolean{
    this.isLoggedIn = this.auth.isLoggedIn();
    return this.isLoggedIn;
  }

  onLogout(){
    this.auth.doLogout();
    this.isLoggedIn = this.auth.isLoggedIn();
    this.myRoute.navigate(["login"]);
  }

}
