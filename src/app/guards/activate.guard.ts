import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';

@Injectable()
export class ActivateGuard implements CanActivate {

  constructor(
    private fbAuth: AngularFireAuth,
    private router: Router,
    private user: UserserviceService
  ) { }

  currentUser: boolean = false;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.fbAuth.authState
      .take(1).map(state => !!state)
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(["/login"]);
        }
      });
    }
}
