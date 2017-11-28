import { Injectable } from '@angular/core';
import { Coffee } from '../logic/Coffee';

@Injectable()
export class DataService {

  constructor() { }

  /**
   * Get list of coffees
   * @param {function} callback : Handle response
   */
  getList(callback) {
    // TODO: Change it to a real coffee list
    const list = [
      new Coffee("Double Espresso", "Sunny Cafe", new PlaceLocation("123 Market St", "San Fransisco")),
      new Coffee("Caramel Americano", "Starcoffee", new PlaceLocation("Gran via 34", "Madrid"))
    ];
  }

  /**
   * Add coffee to the list
   * @param {Coffee} coffee : Coffee details 
   * @param {function} callback : Handle response 
   */
  save(coffee, callback) {
    // TODO: Change it with a Real Web Service
    callback(true);
  }
}
