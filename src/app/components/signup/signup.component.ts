import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserserviceService } from '../../services/userservice.service';

import { moveIn, fallIn } from '../../router.animations';

import { User } from '../../logic/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {

  state: string = '';
  error: any;
  user: User;

  constructor(
    public fbAuth: AngularFireAuth,
    private router: Router,
    private userService: UserserviceService
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  /**
   * Sign up user with email and password
   */
  signUp() {
    this.userService.signUp(this.user, result => {
      if(result === true) {
        this.router.navigate(["/list"]);
      } else {
        this.error = result;
      }
    })
  }

}
