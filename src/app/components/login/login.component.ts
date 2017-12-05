import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../logic/User';
import { UserserviceService } from '../../services/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserserviceService,
    private router: Router
  ) { }

  user: User;

  ngOnInit() {
    this.user = new User();
  }

  /**
   * Log in user
   * @param {Object} user : Log in user
   */
  login(user) {
    this.userService.login(user, (result) => {
      if (result) {
        this.router.navigate(["/"]);
      }
    });
  }

}
