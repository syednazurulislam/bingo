import { Component, OnInit } from '@angular/core';
import {environment} from "../../config/url";
let url = environment.url;
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { NavController,AlertController,LoadingController} from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import{Storage}from '@ionic/storage';
import{Router}from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // disconnectsubscription:any;
  url:string;
  token:any;
  name:string;
  email:any;
  id:string;
  phonenumber:string;
  totalgames:number;
  newresponse:any;
  constructor(public network:Network,
             public https:HttpClient,
             public storage:Storage,
             public router:Router,
             public loader:LoadingController
    ) {
    this.url=url;

  }
  ionViewWillLeave(){ 
    // this.disconnectsubscription.unsubscribe();
  }
ionViewWillEnter(){
  this.storage.get("usertoken").then(val=>{
    this.token=val;
    const httpoptions={
      headers: new HttpHeaders({ 'Authorization':this.token})
    };
    this.https.post(this.url+"/api/profile","data",httpoptions).subscribe(result=>{
this.newresponse=result;
 this.email=this.newresponse.Email;
 this.id=this.newresponse._id;
 this.phonenumber=this.newresponse.PhoneNumber;
 this.name=this.newresponse.UserName;
 this.totalgames=this.newresponse.totalgames;
  })
 })
}
logout(){
 this.showloaderr();
  this.storage.remove("usertoken").then(res=>{
    alert(res);
    this.loader.dismiss();
    this.router.navigate(['/login'],{replaceUrl:true});
  })
}
async showloaderr(){
  let loading= await this.loader.create({
    message:'please wait',
    cssClass:'custom-loader-class'
  })
  await loading.present()
}

}
