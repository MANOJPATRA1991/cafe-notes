import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { 
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule,
  MatToolbarModule,
  MatCardModule,
  MatSlideToggleModule,
  MatSnackBarModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import 'hammerjs';

import { GeolocationService } from './services/geolocation.service';
import { DataService } from './services/data.service';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { CoffeeComponent } from './components/coffee/coffee.component';
import { routes } from './routing';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CoffeeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatToolbarModule,
    MatCardModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    environment.production
    ? ServiceWorkerModule.register('/ngsw-worker.js')
    : []
  ],
  providers: [
    GeolocationService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
