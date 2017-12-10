import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataService } from '../../services/data.service';
import { Coffee } from '../../logic/Coffee';
import { GeolocationService } from '../../services/geolocation.service';
import { UserserviceService } from '../../services/userservice.service';
import { moveIn, fallIn, moveInLeft } from '../../router.animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})

export class ListComponent implements OnInit {
  
  list: Coffee[];
  name: any;
  state: string = '';

  constructor(
    private data: DataService,
    private router: Router,
    private geoLocation: GeolocationService,
    public fbAuth: AngularFireAuth,
    private userService: UserserviceService
  ) { 
    this.fbAuth.authState.subscribe(user => {
      if(user) {
        this.name = user.displayName;
      }
    })
  }


  ngOnInit() {
    // Get list of coffee
    if(navigator.onLine) {
      this.data.getList(list => {
        this.list = [];
        list.forEach(_coffee => {
          console.log(_coffee.toJSON());
          var it = _coffee.toJSON();
          it["_id"] = _coffee.key;
          this.list.push(it as Coffee);
          console.log(this.list);
        });
      });
    }
  }

  /**
   * Log out user
   */
  logout() {
    this.userService.logout();
  }

  /**
   * Edit coffee details
   * @param {Coffee} coffee 
   */
  editDetails(coffee: Coffee) {
    this.router.navigate(["/coffee", coffee._id]);
  }

  /**
   * Go to map and find location
   * @param {Coffee} coffee 
   */
  goToMap(coffee: Coffee) {
    const mapURL = this.geoLocation.getMapLink(coffee.location);
    location.href = mapURL;
  }

  /**
   * Share coffee details
   * @param {Coffee} coffee 
   */
  share(coffee: Coffee) {
    const shareText = `I had this coffee at ${coffee.place} and for me it's a ${coffee.rating} star coffee`;
    // Check if web share API is available in browser
    if ('share' in navigator) {
      navigator['share']({
        title: coffee.name,
        text: shareText,
        url: window.location.href  
      })
      .then(() => console.log("Shared!!"))
      .catch((error) => console.log('Error sharing', error));  
    } else {
      // Move to Whatsapp
      const shareURL = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      location.href = shareURL;
    }
  }

}
