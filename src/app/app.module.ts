import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GeolocationService } from './services/geolocation.service';
import { DataService } from './services/data.service';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule,
  MatToolbarModule,
  MatCardModule,
  MatSlideToggleModule
} from '@angular/material';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatToolbarModule,
    MatCardModule,
    MatSlideToggleModule
  ],
  providers: [
    GeolocationService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
