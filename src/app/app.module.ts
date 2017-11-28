import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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

import { GeolocationService } from './services/geolocation.service';
import { DataService } from './services/data.service';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { CoffeeComponent } from './components/coffee/coffee.component';
import { routes } from './routing';

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
