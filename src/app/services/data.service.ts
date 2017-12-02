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
