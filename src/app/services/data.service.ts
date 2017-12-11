import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { 
  AngularFireDatabase, 
  AngularFireList 
} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Coffee } from '../logic/Coffee';
import { PlaceLocation } from '../logic/PlaceLocation';
import 'rxjs/add/operator/takeLast';

declare var idbKeyval: any;
const key = 'coffees';

@Injectable()
export class DataService {

  constructor(
    private http: Http,
    private fbDatabase: AngularFireDatabase,
    private fbAuth: AngularFireAuth,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }
  
  /**
   * Get coffee details by id
   * @param {string} coffeeId 
   * @param {function} callback
   */
  getCoffee(coffeeId: string, callback) {
    this.fbDatabase.database
    .ref(`${this.fbAuth.auth.currentUser.uid}/coffees/${coffeeId}`)
    .on('value', (snapshot) => {
      callback(snapshot.val());
    });
  }

  /**
   * Get list of coffees
   * @param {function} callback : Handle response
   */
  getList(callback) {
    this.fbDatabase.database
    .ref(`${this.fbAuth.auth.currentUser.uid}/coffees`)
    .on('value', (snapshot) => {
      callback(snapshot);
    });

    this.fbDatabase.list(`${this.fbAuth.auth.currentUser.uid}/coffees`)
    .snapshotChanges().takeLast(1).subscribe(coffees => {
      callback(coffees);
    })
  }

  /**
   * Add coffee to the list
   * @param {Coffee} coffee : Coffee details 
   * @param {function} callback : Handle response 
   */
  save(coffee) {
    let isPresent = false;
    if (navigator.onLine) {
      // Check if data is already present in the database
      this.fbDatabase
      .list(`${this.fbAuth.auth.currentUser.uid}/coffees`)
      .query.orderByChild("name")
      .equalTo(`${coffee.name}`).once("value")
      .then((snapshot) => {

        console.log(snapshot.val());
        if((snapshot.val().name === coffee.name) && (snapshot.val().place === coffee.place)) {
          isPresent = true;
          this.snackbar.open(
            "Coffee already in the database",
            "",
            {
              duration: 3000
            }
          );
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 3000);
        }
      });

      if (!isPresent) {
        this.addToCollection(coffee)
        .then(() => {
            this.saveToFirebase(coffee);
        });
      }
    } else {
      this.snackbar.open(
        "Coffee will be updated as soon as network is available",
        "",
        {
          duration: 3000
        }
      );
      setTimeout(() => {
        this.router.navigate(["/"]);
      }, 3000);
    }
  }

  /**
   * Delete coffee from the list
   * @param {Coffee} coffee : Coffee details 
   * @param {function} callback : Handle response 
   */
  delete(coffee) {
    if(navigator.onLine) {
      this.fbDatabase
      .list(`${this.fbAuth.auth.currentUser.uid}/coffees`)
      .remove(coffee._id);
      this.router.navigate(["/"]);
    } else {
      this.snackbar.open(
        "Only save operation is available when offline",
        "",
        {
          duration: 3000
        }
      );
    }
  }

  /**
   * Add to indexedDB
   * @param {Coffee} coffee : Coffee to add
   */
  addToCollection(coffee) {
    return idbKeyval.get(key)
    .then(data => this.addToCoffeesList(data, coffee))
    .then(coffees => idbKeyval.set(key, JSON.stringify(coffees)));
  }

  /**
   * Add coffee to existing list
   * @param {string/undefined} data : List of coffees
   * @param {Coffee} coffee : New or updated coffee
   */
  addToCoffeesList(data, coffee) {
    let coffees = [];
    if (data !== undefined) {
      coffees = JSON.parse(data) || [];
    }
    coffees.push(coffee);
    return coffees;
  }

  /**
   * Save coffee to realtime database
   * @param {Coffee} coffee : Coffee to add 
   * @param {Function} callback : Callback function
   */
  saveToFirebase(coffee) {
    // It's an update
    if(coffee._id) {
      this.fbDatabase
      .list(`${this.fbAuth.auth.currentUser.uid}/coffees`)
      .update(`${coffee._id}`, coffee)
      .then(() => {
        // Push notification on coffee update
        let options = {
          body: `${coffee.name} details are updated`,
          icon: "../../icons/icon_96.png"
        }
        let n = new Notification("Update", options);
        setTimeout(n.close.bind(n), 4000);
        this.removeCoffeeFromCollection();
        
        this.router.navigate(["/"]);
      });
    } else {
      // It's an insert
      this.fbDatabase
      .list(`${this.fbAuth.auth.currentUser.uid}/coffees`)
      .push(coffee)
      .then(response => {
        coffee["_id"] = response.key;
        this.fbDatabase
        .list(`${this.fbAuth.auth.currentUser.uid}/coffees`)
        .update(response.key, coffee)
        .then(() => {
          // Push notification when new coffee is added
          let options = {
            body: `${coffee.name} is added to coffee list`,
            icon: "../../icons/icon_96.png"
          }
          let n = new Notification("New coffee added", options);
          setTimeout(n.close.bind(n), 4000);
          this.removeCoffeeFromCollection();
          
          this.router.navigate(["/"]);
        });
      });
    }
  }

  /**
   * Remove coffee from indexed DB collection
   */
  removeCoffeeFromCollection() {
    this.getCoffeesFromCollection()
    .then(coffees => {
      coffees.pop();
      return coffees;
    })
    .then(coffees => {
      idbKeyval.set(key, JSON.stringify(coffees));
    })
    .then(() => {
      console.log('Coffee removed from collection');
    })
    .catch(err => {
      console.log('Unable to remove coffee from collection', err);
    });
  }

  /**
   * Get all coffees from collection
   */
  getCoffeesFromCollection() {
    return idbKeyval.get(key)
    .then(values => {
      let coffees = [];
      if (values !== undefined) {
        coffees = JSON.parse(values) || [];
      }
      return coffees;
    });
  }

  /**
   * Remove all coffees
   */
  removeAllCoffees() {
    return idbKeyval.clear()
    .then(() => {
      console.log('All coffees removed from collection');
    })
    .catch(err => console.log('Unable to remove coffees from outbox', err));
  }
}
