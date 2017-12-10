# Cafe-Notes


A Progressive web app to make note of places where one can drink coffee. This app was developed by me during the process of learning Progress Web App development with Angular 4. 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.

## What did I learn

1. PWA Experience
  > * Installable with icon
  > * Works with any network status, even offline
  > * Reloads immediately and has a fast UX
  > * Can load outside of a browser's UI

2. Use of service worker

3. Use of web app manifest

4. Platform integration
  > * Modern browser API usage
  > * Web push notifications
  > * Geolocation and share functionality
  > * Integration with native apps

## Future enhancements coming soon

1. ~~Add form validation~~
2. ~~Add error handling~~
3. Use IndexedDB to store updates while offline
4. Use the background sync API for updating the background
5. Add server-side rendering for the initial view using Angular universal
6. Create a web push server architecture
7. ~~Improve desktop and tablet view~~
8. ~~Authentication and Database per user~~

## App dependencies

1. [Angular material](https://material.angular.io/guide/getting-started)
2. [Angular](https://angular.io/guide/quickstart)
3. [Angular Animations](https://angular.io/guide/animations)
4. [Hammerjs](https://hammerjs.github.io/) for detecting gestures on mobile devices
5. [Material icons](https://material.io/icons/)
6. [NeDB](https://github.com/louischatriot/nedb) for database storage on server side
7. [express-nedb-rest](https://github.com/bi-tm/express-nedb-rest) adds RESTAPI support for nedb database

## Dev Dependencies

1. Angular service worker

    This is installed using `npm install --save-dev @angular/service-worker`

## Test requirements

To test this app,

1. Clone this repository and move into **coffeeapp**.

> In order for service worker to work, you need to have angular-cli 1.6.0 installed.
>
> Steps to install **angular-cli 1.6.0**:
>
> 1. Uninstall previous version of angular-cli
>
>       `npm uninstall -g @angular/cli` 
>
> 2. Install angular-cli 1.6.0
>
>       `npm install -g @angular/cli@latest`
>
> 3. Remove node_modules and dist folder from project directory
>
>       `rm -rf node_modules dist`
> 4. Install latest angular-cli locally
>
>       `npm install --save-dev @angular/cli@latest`

2. Run `npm install` from the project directory to install dependencies.

3. Since, this app uses service worker, we need to use a production build. To create a production build, use `npm run build-prod-ngsw`.

4. Install a static server such as SimpleHttpServer.

5. Move into the dist folder and run `simplehttpserver`.

6. Go to *http://localhost:8000* (8000 is the default port for simplehttpserver) to see the app.

