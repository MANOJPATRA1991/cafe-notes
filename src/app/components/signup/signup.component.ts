import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserserviceService } from '../../services/userservice.service';

import {moveIn, fallIn} from '../router.animations';

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

  constructor(
    public fbAuth: AngularFireAuth,
    private router: Router,
    private user: UserserviceService
  ) { }

  ngOnInit() {
  }

}
