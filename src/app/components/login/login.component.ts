import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserserviceService } from '../../services/userservice.service';

import { moveIn } from '../../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  error: any;

  constructor(
    public fbAuth: AngularFireAuth,
    private router: Router,
    private user: UserserviceService
  ) { 
      this.fbAuth.authState.subscribe(user => {
        if (user) {
          this.router.navigate(["/list"]);
        }
      });
  }

  ngOnInit() {
  }

  /**
   * Log in user with Facebook
   */
  loginFb() {
    this.user.loginFb((result) => {
      if (result === true) {
        this.router.navigate(["/list"]);
      } else {
        this.error = result;
      }
    });
  }

  /**
   * Log in user with Google
   */
  loginGoogle() {
    this.user.loginGoogle((result) => {
      if (result === true) {
        this.router.navigate(["/list"]);
      } else {
        this.error = result;
      }
    });
  }

}
