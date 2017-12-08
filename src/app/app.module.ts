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

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { routes } from './routing';

import { ListComponent } from './components/list/list.component';
import { CoffeeComponent } from './components/coffee/coffee.component';
import { LoginComponent } from './components/login/login.component';
import { EmailComponent } from './components/email/email.component';
import { SignupComponent } from './components/signup/signup.component';

import { ActivateGuard } from './guards/activate.guard';

import { GeolocationService } from './services/geolocation.service';
import { DataService } from './services/data.service';
import { UserserviceService } from './services/userservice.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CoffeeComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent
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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    GeolocationService,
    DataService,
    UserserviceService,
    {
      provide: LocationStrategy, 
      useClass: HashLocationStrategy
    },
    ActivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }