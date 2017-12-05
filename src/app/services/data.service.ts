import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Coffee } from '../logic/Coffee';
import { PlaceLocation } from '../logic/PlaceLocation';
import { 
  AngularFireDatabase,  
  AngularFireList
} from 'angularfire2/database';

@Injectable()
export class DataService {

  constructor(
    private http: Http, 
    private fbdatabase: AngularFireDatabase) { }

  // BASE URL
  public endpoint = "http://localhost:3000";

  coffeeList: AngularFireList<any>;
  
  /**
   * Get coffee details by id
   * @param {string} coffeeId 
   * @param {function} callback
   */
  getCoffee(coffeeId: string, callback) {
    this.fbdatabase.database.ref(`/coffees/${coffeeId}`)
    .on('value', snapshot => {
      callback(snapshot.val());
    });
    // this.http.get(`${this.endpoint}/coffees/${coffeeId}`)
    // .subscribe(response => {
    //   callback(response.json());
    // });
  }

  /**
   * Get list of coffees
   * @param {function} callback : Handle response
   */
  getList(callback) {
    this.coffeeList = this.fbdatabase.list('coffees');
    this.coffeeList
    .snapshotChanges().subscribe(coffees => {
      callback(coffees);
    });
    // this.http.get(`${this.endpoint}/coffees`)
    // .subscribe(response => {
    //   console.log(response.json());
    //   callback(response.json());
    // })
  }

  /**
   * Add coffee to the list
   * @param {Coffee} coffee : Coffee details 
   * @param {function} callback : Handle response 
   */
  save(coffee, callback) {
    // It's an update
    if(coffee._id) {
      this.coffeeList.update(coffee._id, coffee)
      .then(response => {
        callback(true);
      });
      // this.http.put(`${this.endpoint}/coffees/${coffee._id}`, coffee)
      // .subscribe(response => {
      //   callback(true);
      // }) 
    } else {
      // It's an insert
      this.coffeeList.push(coffee)
      .then(response => {
        callback(true);
      });
      // this.http.post(`${this.endpoint}/coffees`, coffee)
      // .subscribe(response => {
      //   callback(true);
      // }) 
    }
  }

  /**
   * Delete coffee from the list
   * @param {Coffee} coffee : Coffee details 
   * @param {function} callback : Handle response 
   */
  delete(coffee, callback) {
    this.coffeeList.remove(coffee._id)
    .then(response => {
      callback(true);
    });
    // this.http.delete(`${this.endpoint}/coffees/${coffee._id}`)
    // .subscribe(response => {
    //   callback(true);
    // })
  }

  /**
   * Add push notifications
   */
  pushNotification() {
    // Push notification on coffee update
    this.fbdatabase.database.ref('coffees')
    .on("child_changed", (snapshot) => {
      let updatedCoffee = snapshot.val();
      let options = {
        body: `${updatedCoffee.name} details are updated`,
        icon: "../../icons/icon_96.png"
      }
      let n = new Notification("Update", options);
      setTimeout(n.close.bind(n), 4000);
    });

    // Push notification when new coffee is added
    this.fbdatabase.database.ref('coffees').limitToLast(1)
    .on("child_added", (snapshot) => {
      let updatedCoffee = snapshot.val();
      let options = {
        body: `${updatedCoffee.name} is added to coffee list`,
        icon: "../../icons/icon_96.png"
      }
      let n = new Notification("New coffee added", options);
      setTimeout(n.close.bind(n), 4000);
    });
  }
}
