import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

let registration = undefined;

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    // Work around for angular firebase
    registerServiceWorker();
  })
  .catch(err => console.log(err));

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/ngsw-worker.js')
    .then(reg => {
      registration = reg;
      console.log('[Service worker] registration successful');
    })
    .catch(err => {
      console.log('Error during service worker registration:', err);
    });
  } else {
    console.log('[Service Worker] not supported');
  }
}