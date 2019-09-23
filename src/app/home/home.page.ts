import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {NavController, AlertController,LoadingController} from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Subscription, from } from 'rxjs';
import {NointernetService} from '../nointernet.service';
import{PlayeroneService}from '../playerone.service';
import{PlayertwoService}from '../playertwo.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
  private disconnectsubscription:Subscription= new Subscription();
  constructor(private router:Router,private playeroneservice:PlayeroneService,private loading:LoadingController,private playertwoservice:PlayertwoService,private navctrl:NavController,private nointernetservice:NointernetService, public network:Network,private alertctrl:AlertController) {
   this.playeroneservice.p1gameboard=false;
   this.playertwoservice.p2gameboard=false;
   this.loading.dismiss();
  
   
   }
  

  ngOnInit() {
    // this.authservice.setValue(true);
  }


  p1boardcreation(){
    if(this.network.type=='none'){
      this.alertpresent();

    }else{
    // this.navctrl.navigateForward(['/p1boardcreation']);
    this.router.navigate(['/p1boardcreation']);
    }
  }
  waitingplayerslist(){
    if(this.network.type=='none'){
      this.alertpresent();
    }else{
    this.navctrl.navigateForward(['/waitingplayerslist']);
    }
  }
  async alertpresent(){
    let alert = await this.alertctrl.create({
      header:'MESSAGE',
      message:'Please Check Your Internet Connection',
      buttons:[{
        text:'OK',
        handler:()=>{
          
          
        }
      }]
      ,  cssClass:'alertctrlcss'
    })
     await alert.present();
  }
  // ionViewWillLeave(){
  //    this.disconnectsubscription.unsubscribe();
  // }

}
