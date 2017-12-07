import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserserviceService } from '../../services/userservice.service';

import {moveIn, fallIn} from '../router.animations';

import { User } from '../../logic/User';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})

export class EmailComponent implements OnInit {

  state: string = '';
  error: any;
  user: User;

  constructor(
    public fbAuth: AngularFireAuth,
    private router: Router,
    private userService: UserserviceService
  ) { 
    this.fbAuth.authState.subscribe(user => {
      if(user) {
        this.router.navigate(["/list"]);
      }
    })
  }

  /**
   * Log in user with email and password
   */
  login() {
    this.userService.login(this.user, result => {
      if(result === true) {
        this.router.navigate(["/list"]);
      } else {
        this.error = result;
      }
    })
  }

  ngOnInit() {
  }

}
