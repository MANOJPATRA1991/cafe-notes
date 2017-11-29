import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Coffee } from '../logic/Coffee';
import { PlaceLocation } from '../logic/PlaceLocation';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

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
    })
  }

  /**
   * Get list of coffees
   * @param {function} callback : Handle response
   */
  getList(callback) {
    // TODO: Change it to a real coffee list
    // const list = [
    //   new Coffee("Double Espresso", "Sunny Cafe", new PlaceLocation("123 Market St", "San Fransisco")),
    //   new Coffee("Caramel Americano", "Starcoffee", new PlaceLocation("Gran via 34", "Madrid"))
    // ];
    // callback(list);
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
    // TODO: Change it with a Real Web Service
    // callback(true);
    if(coffee._id) {
      // It's an update
      this.http.put(`${this.endpoint}/coffees/${coffee._id}`, coffee)
      .subscribe(response => {
        callback(true);
      }) 
    } else {
      // It's an insert
      this.http.post(`${this.endpoint}/coffees`, coffee)
      .subscribe(response => {
        callback(true);
      }) 
    }
  }
}
