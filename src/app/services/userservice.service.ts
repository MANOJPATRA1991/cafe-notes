import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserserviceService {

  constructor(private fbAuth: AngularFireAuth) { }

  /**
   * Log in user
   * @param user : USer data
   * @param callback : Callback function
   */
  login(user, callback) {
    // Login user
    this.fbAuth.auth.signInWithEmailAndPassword(
      user.email, user.password
    ).then((response) => {
      this.fbAuth.auth.currentUser.updateProfile({
        displayName: user.displayName,
        photoURL: ''
      })

      callback(true);
    })
    .catch(error => {
      // Create user if user doesn't exist
      this.fbAuth.auth.createUserWithEmailAndPassword(
        user.email, user.password
      ).then((response) => {
        callback(true);
        this.fbAuth.auth.currentUser.updateProfile({
          displayName: user.displayName,
          photoURL: ''
        })
      })
    });
  }

  /**
   * Log out user
   */
  logout() {
    this.fbAuth.auth.signOut();
  }

}
