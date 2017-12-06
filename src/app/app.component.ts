import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate, SwPush } from '@angular/service-worker';

import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    private snackbar: MatSnackBar,
    private ngsw: SwUpdate,
    private ngsp: SwPush,
    private http: Http,
    private data: DataService,
    private router: Router
  ) {

  }

  /**
   * Update UI based on online or offline
   */ 
  updateNetworkStatusUI () {
    if(navigator.onLine) {
      (document.querySelector("body") as any).style = "";
    } else {
      // 100% OFFLINE
      (document.querySelector("body") as any).style = "filter: grayscale(1)";
    }
  }

  /**
   * Subscribe for push notifications
   */
  subscribeToPush() {
    if((Notification as any).permission === 'granted') {
      this.ngsp.unsubscribe()
      .then(() => {
        this.snackbar.open(
          "You are no longer subscribed to receive notifications",
          "",
          {
            duration: 4000
          }
        );
      })
    }
    else {
      this.ngsp.requestSubscription({
        serverPublicKey: environment.config.VAPID_PUBLIC_KEY
      })
      .then(pushSubscription => {
        console.log(pushSubscription);
        this.snackbar.open(
          "You are now subscribed to push notifications",
          "",
          {
            duration: 5000
          }
        );
      });
    }
  }

  ngOnInit() {
    
    // Checking SW update status
    this.ngsw.available.subscribe(update => {
      if (update.type == 'UPDATE_AVAILABLE') {
        const sb = this.snackbar.open(
          "There is an update available",
          "Install now",
          {
            duration: 5000
          }
        );
        sb.onAction().subscribe(() => {
          this.ngsw.activateUpdate().then(() => {
            location.reload();
          });
        });
      }
    })
    this.ngsw.checkForUpdate();

    // Checking network status
    this.updateNetworkStatusUI();
    window.addEventListener("online", this.updateNetworkStatusUI);
    window.addEventListener("offline", this.updateNetworkStatusUI);

    // Checking installation status
    if ((navigator as any).standalone === false) {
      // This is an iOS device and we are in the browser
      this.snackbar.open(
        "You can add this PWA to the home screen",
        "",
        {
          duration: 3000
        }
      );
    }
    if ((navigator as any).standalone === undefined) {
      // It's not iOS
      if (window.matchMedia("display-mode: browser").matches) {
        // We are in the browser
        window.addEventListener("beforeinstallprompt", event => {
          event.preventDefault();
          const sb = this.snackbar.open(
            "Do you want to install this App?",
            "Install",
            {
              duration: 5000
            }
          );
          sb.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoice.then( result => {
              if (result.outcome === "dismissed") {
                //TODO: Track no installation
                this.snackbar.open(
                  "App installation dismissed",
                  "",
                  {
                    duration: 2000
                  }
                );
              } else {
                //TODO: It was installed
                this.snackbar.open(
                  "App installed",
                  "",
                  {
                    duration: 2000
                  }
                );
              }
            })
          });
          return false;
        })
      }
    }
  }
}
