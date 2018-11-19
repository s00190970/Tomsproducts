import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  title: string = "Toms Products";
  username: string = "user";
  isLoggedIn: boolean;

  constructor(private auth: AuthService, private myRoute: Router) { }

  ngOnInit(){
    
  }

  userLoggedIn():boolean{
    this.isLoggedIn = this.auth.isLoggedIn();
    this.username=this.auth.getUsername();
    return this.isLoggedIn;
    
  }

  onLogout(){
    this.auth.doLogout();
    this.isLoggedIn = this.auth.isLoggedIn();
    this.myRoute.navigate(["login"]);
  }

}
