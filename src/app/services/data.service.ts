import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Coffee } from '../logic/Coffee';
import { PlaceLocation } from '../logic/PlaceLocation';

@Injectable()
export class DataService {

  constructor(
    private http: Http
  ) { }

  // BASE URL
  public endpoint = "http://localhost:3000";
  
  /**
   * Get coffee details by id
   * @param {string} coffeeId 
   * @param {function} callback
   */
  getCoffee(coffeeId: string, callback) {
    this.http.get(`${this.endpoint}/coffees/${coffeeId}`)
    .subscribe(response => {
      callback(response.json());
    });
  }

  /**
   * Get list of coffees
   * @param {function} callback : Handle response
   */
  getList(callback) {
    this.http.get(`${this.endpoint}/coffees`)
    .subscribe(response => {
      console.log(response.json());
      callback(response.json());
    })
  }

  /**
   * Add coffee to the list
   * @param {Coffee} coffee : Coffee details 
   * @param {function} callback : Handle response 
   */
  save(coffee, callback) {
    // It's an update
    if(coffee._id) {
      
      this.http.put(`${this.endpoint}/coffees/${coffee._id}`, coffee)
      .subscribe(response => {
        callback(true);
      }) 

      // Push notification on coffee update
      let options = {
        body: `${coffee.name} details are updated`,
        icon: "../../icons/icon_96.png"
      }
      let n = new Notification("Update", options);
      setTimeout(n.close.bind(n), 4000);
      
    } else {
      // It's an insert
      this.http.post(`${this.endpoint}/coffees`, coffee)
      .subscribe(response => {
        callback(true);
      }) 

      // Push notification when new coffee is added
      let options = {
        body: `${coffee.name} is added to coffee list`,
        icon: "../../icons/icon_96.png"
      }
      let n = new Notification("New coffee added", options);
      setTimeout(n.close.bind(n), 4000);
    }
  }

  /**
   * Delete coffee from the list
   * @param {Coffee} coffee : Coffee details 
   * @param {function} callback : Handle response 
   */
  delete(coffee, callback) {
    this.http.delete(`${this.endpoint}/coffees/${coffee._id}`)
    .subscribe(response => {
      callback(true);
    })
  }
}
