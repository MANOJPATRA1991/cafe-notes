import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coffee } from '../../logic/Coffee';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { GeolocationService } from '../../services/geolocation.service';
import { TasteRating } from '../../logic/TasteRating';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private geolocation: GeolocationService,
              private router: Router,
              private data: DataService
            ) { }

  coffee: Coffee;
  tasteEnabled: boolean = false;
  // Coffee types
  types = [
    "Espresso",
    "Ristretto",
    "Americano",
    "Cappuccino",
    "Frappe"
  ];

  routingSubscription: any;
  coffeeId: any;

  ngOnInit() {
    // Create a new Coffee object
    this.coffee = new Coffee();
    
    // Subscribe to route parameters
    this.routingSubscription = this.route.params.subscribe(params => {
      console.log(params["id"]);
      if (params["id"]) {
        this.data.getCoffee(params["id"], response => {
          this.coffee = response;
          if (this.coffee.tasteRating) {
            this.tasteEnabled = true;
          }
        });
      }
    });

    // Request user location
    this.geolocation.requestLocation(location => {
      if (location) {
        this.coffee.location.latitude = location.latitude;
        this.coffee.location.longitude = location.longitude;
      } else if (typeof location === 'string') {
        
      }
    });
  }

  /**
   * Check if testRating is selected
   * @param {Boolean} checked 
   */
  tasteRatingChanged(checked: Boolean) {
    if (checked) {
      this.coffee.tasteRating = new TasteRating();
    } else {
      this.coffee.tasteRating = null;
    }
  }

  /**
   * Cancel and go back to home page
   */
  cancel() {
    this.router.navigate(["/"]);
  }
  
  /**
   * Save coffee details to database
   */
  save() {
    this.data.save(this.coffee, result => {
      if (result) {
        this.router.navigate(["/"]);
      }
    });
  }

}
