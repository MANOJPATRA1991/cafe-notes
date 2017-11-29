import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Coffee } from '../../logic/Coffee';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private data: DataService,
              private router: Router,
              private geoLocation: GeolocationService) { }

  list: [Coffee];

  ngOnInit() {
    // Get list of coffee
    this.data.getList(list => {
      console.log(list);
      this.list = list;
    });
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
