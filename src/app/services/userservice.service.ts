import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserserviceService {

  constructor(
    private fbAuth: AngularFireAuth,
    private router: Router
  ) { }

  /**
   * Log in user with facebook
   * @param {Function} callback : Callback function
   */
  loginFb(callback) {
    this.fbAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    ).then(success => {
      callback(true);
    }).catch(err => {
      callback(err);
    });
  }

  /**
   * Log in user with Google
   * @param {Function} callback : Callback function
   */
  loginGoogle(callback) {
    this.fbAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then(success => {
      callback(true);
    }).catch(err => {
      callback(err);
    });
  }

  /**
   * Sign up user with email and password 
   * @param {User} user : User data
   * @param {Function} callback : Callback function
   */
  signUp (user, callback) {
    this.fbAuth.auth.createUserWithEmailAndPassword(
      user.email, user.password
    ).then((response) => {
      this.fbAuth.auth.currentUser.updateProfile({
        displayName: user.displayName,
        photoURL: ''
      });
      callback(true);
    })
    .catch(err => {
      callback(err);
    })
  }


  /**
   * Log in user
   * @param {User} user : User data
   * @param {Function} callback : Callback function
   */
  login(user, callback) {
    // Login user
    this.fbAuth.auth.signInWithEmailAndPassword(
      user.email, user.password
    ).then((response) => {
      callback(true);
    })
    .catch(err => {
      callback(err);
    });
  }

  /**
   * Log out user
   */
  logout() {
    if (navigator.onLine) {
      this.fbAuth.auth.signOut();
      this.router.navigate(["/login"]);
    }
  }

}
