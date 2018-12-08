import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import * as firebase from 'firebase/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private user: Observable<firebase.User>;
  private username = "user";
  loggedInStatus: boolean = false; 

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private notifier: NotificationService) {
    this.user = _firebaseAuth.authState;
  }

  getUsername(): string { 
    if(firebase.auth().currentUser){
      if(firebase.auth().currentUser.displayName!==null){
        return firebase.auth().currentUser.displayName;
      }
      return firebase.auth().currentUser.email;
    }
    return this.username;
  }

  signup(email: string, password: string, name: string) {
    // clear all messages
    this.notifier.display(false, '');
    this._firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.sendEmailVerification();
        const message = 'A verification email has been sent, please check your email and follow the steps!';
        this.notifier.display(true, message);
        console.log("name: "+name);
        var userRef = firebase.database().ref(`/users/${res.user.uid}`);
        var newUser = userRef.push();
        console.log(newUser.toString());
        return newUser.set({
          email: res.user.email,
          uid: res.user.uid,
          registrationDate: new Date().toString(),
          displayName: name
        });
      })
      .catch(err => {
        if(err.message==="The email address is already in use by another account.")
          alert(err.message);
        this.notifier.display(true, err.message);
      });
  }

  setUserData(){
    this.user.subscribe(data=>{
      console.log(data.uid);
      var uid = data.uid;
      firebase.database().ref(`/users/${uid}`).set(({
        color: 'green'
      }))
    })
  }

  sendEmailVerification() {
    this._firebaseAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        });
    });
  }

  doRegister(value):Promise<any>{
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        this.loggedInStatus = true;
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this._firebaseAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
      this.loggedInStatus = false;

    });
  }

  isLoggedIn():boolean {
      return this.loggedInStatus;
  }

  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this._firebaseAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        this.loggedInStatus = true;
      }, err => {
        console.log(err);
        reject(err);
      })
    })
 }

 doGoogleLogin(){
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this._firebaseAuth.auth
    .signInWithPopup(provider)
    .then(res => {
      resolve(res);
      this.loggedInStatus = true;
    }, err =>{
      console.log(err);
      reject(err);
    })
  })
}
doGithubLogin(){
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    this._firebaseAuth.auth
    .signInWithPopup(provider)
    .then(res => {
      resolve(res);
      this.loggedInStatus = true;
    }, err => {
      console.log(err);
      reject(err);
    })
  })
}
}
