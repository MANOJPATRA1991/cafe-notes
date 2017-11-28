import { Injectable } from '@angular/core';
import { PlaceLocation } from '../logic/PlaceLocation';

@Injectable()
export class GeolocationService {

  constructor() { }

  /**
   * Request user locatiion
   * @param {function} callback : Handle response
   */
  requestLocation(callback) {
    // W3C Geolocation API
    navigator.geolocation.getCurrentPosition(
      // location acquired
      position => {
        callback(position.coords);
      },
      // unsuccessful
      error => {
        if (error.POSITION_UNAVAILABLE) {
          callback("Position not available");
        } else if (error.PERMISSION_DENIED) {
          callback("User denied location sharing");
        } else {
          callback("Timed out. Connection Error");
        }
      }
    )
  }

  /**
   * Get the location and 
   * open a map native app to show the location
   * @param {PlaceLocation} location : The location of the coffee shop 
   */
  getMapLink(location: PlaceLocation) {
    let query = "";
    // if location contains coordinates
    if (location.latitude) {
      query = `${location.latitude}, ${location.longitude}`;
    // if location contains address
    } else {
      query = `${location.address}, ${location.city}`;
    }
    // check for apple devices
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return `https://maps.apple.com/?q=${query}`;
    } else {
      return `https://maps.google.com/?q=${query}`;
    }
  }

}
