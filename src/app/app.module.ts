import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthenticationService} from './services/authentication.service';
import {PlayeroneService} from './playerone.service';

import{SocketIoModule,SocketIoConfig} from 'ng-socket-io';
import {environment} from '../config/url';
let url1 = environment.url1;


let config ={
  url:url1,
  options:{}
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    SocketIoModule.forRoot(config),
     IonicModule.forRoot(), 
     AppRoutingModule,
     FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
     IonicStorageModule ],



  providers: [
    StatusBar,
    SplashScreen,
    AuthGuardService,
    AuthenticationService,
    PlayeroneService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
