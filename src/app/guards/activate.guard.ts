import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

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
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.fbAuth.authState.subscribe(user => {
        if(user) {
          this.currentUser = true;
        }
      });
      if(this.currentUser) {
        return true;
      } else {
        this.router.navigate(["/login"]);
        return false;
      }
    }
}
