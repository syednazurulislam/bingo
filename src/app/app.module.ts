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
import {LoginGuardService} from './services/Loginguard';
import {AuthenticationService} from './services/authentication.service';
import {PlayeroneService} from './playerone.service';
 import { Vibration } from '@ionic-native/vibration/ngx';
import{SocketIoModule,SocketIoConfig} from 'ng-socket-io';
import {environment} from '../config/url';
import {SmartaudioService} from './smartaudio.service';
// import { Storage } from '@ionic/storage';
import {ModalboxPageModule} from './modalbox/modalbox.module';
import {NativeAudio} from '@ionic-native/native-audio/ngx';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { Network } from '@ionic-native/network/ngx';
import {NointernetService} from './nointernet.service'
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
    ModalboxPageModule,
     IonicStorageModule.forRoot() ],



  providers: [
    StatusBar,
    SplashScreen,
    AuthGuardService,
    AuthenticationService,
    PlayeroneService,
      Vibration,
      NativeAudio,
      SmartaudioService,
      LoginGuardService,
      NointernetService,
      CanDeactivateGuard,
      Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
