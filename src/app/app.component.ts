import { Component } from '@angular/core';

import { Platform,AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthenticationService} from './services/authentication.service';
import {SmartaudioService} from './smartaudio.service';
import {Router} from '@angular/router';
import{Storage}from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import{PlayeroneService} from './playerone.service';
import{PlayertwoService} from './playertwo.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  disconnectsubscription:any;
  constructor(
    private platform: Platform,
    private alertctrl:AlertController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private smartaudioservice:SmartaudioService,
    private router:Router,
    private storage: Storage,
    private authservice:AuthenticationService,
    private network:Network,
    private playeroneservice:PlayeroneService,
    private playertwoservice:PlayertwoService
    
  ) {

    if(this.network.type == 'none'){
      alert('no internet');
    }
    this.disconnectsubscription= this.network.onDisconnect().subscribe(()=>{
      this.alertpresent();
    if(this.playeroneservice.p1gameboard==true||this.playertwoservice.p2gameboard==true){
      this.router.navigate(['/home'],{replaceUrl:true})
    }
    })
    this.initializeApp();
   
  }

  initializeApp() {
    this.platform.ready().
    
    then(() => {
      this.authservice.isAuthenticate().then(output=>{
        // alert(JSON.stringify(output) +" this is from component.ts page")
        if(output =='true'){
          this.router.navigate(['home'],{replaceUrl:true}) 
         
        }else{
          this.router.navigate(['/login'],{replaceUrl:true});
          
        }
      })
     
     this.statusBar.styleDefault();
     this. smartaudioservice.preload('p1playerclick', 'assets/audio/p1playerclick.mp3');
     this. smartaudioservice.preload('p2playerclick', 'assets/audio/p2playerclick.mp3');
     this.smartaudioservice.preload('bingowinner', 'assets/audio/bingowinner.mp3');
     this. smartaudioservice.preload('bingolost', 'assets/audio/bingolost.mp3');
     this.smartaudioservice.preload('bottlespin', 'assets/audio/bottlespin.mp3');
// this.authservice.authState.subscribe(state=>{
//   alert(state+" this is from component.ts page")
//   if(state){
//     this.router.navigate(['home'],{replaceUrl:true})
//   }else{
//     this.router.navigate(['login'],{replaceUrl:true});
//   }
// });

setInterval(()=>{
  this.splashScreen.hide();
},5000)
// this.storage.get('usertoken').then(responce=>{
//   if(responce){
// this.router.navigate(['/home'])
//   }else{
//     this.router.navigate(['/login'])

//   }
// })
    })
  }
  async alertpresent(){
    let alert = await this.alertctrl.create({
      header:'MESSAGE',
      message:'Please Check Your Internet Connection',
      buttons:[{
        text:'OK',
        handler:()=>{
        //  navigator['app'].exitApp();
        // this.disconnectsubscription.unsubscribe();
        }
      }],
  cssClass:'alertctrlcss'
    })
     await alert.present();
  }

  ionViewWillLeave(){
      this.disconnectsubscription.unsubscribe();
  }
} 
    
  

