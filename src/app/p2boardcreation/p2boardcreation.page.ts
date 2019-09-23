import { Component, OnInit } from '@angular/core';
import {environment} from "../../config/url";
let url = environment.url;
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { NavController,AlertController,LoadingController} from '@ionic/angular';
import {PlayertwoService} from '../playertwo.service';
import { Network } from '@ionic-native/network/ngx';
import{Storage}from '@ionic/storage';
@Component({
  selector: 'app-p2boardcreation',
  templateUrl: './p2boardcreation.page.html',
  styleUrls: ['./p2boardcreation.page.scss'],
})
export class P2boardcreationPage implements OnInit {
  url:string;
  playertwoboard=[];
  
roomid:any;
i:any=1;
dataexists:boolean;
fa:any ; fb:any; fc:any; fd:any; fe:any;
ga:any; gb:any; gc:any; gd:any; ge:any;
ha:any; hb:any; hc:any; hd:any; he:any;
ia:any; ib:any; ic:any; id:any; ie:any;
ja:any; jb:any; jc:any; jd:any; je:any;
b1:boolean;
disconnectsubscription:any;
// array1=['fa','fb','fc','fd','fe', 'ga','gb','gc','gd','ge','ha','hb','hc','hd','he','ia','ib','ic'
// ,'id','ie','ja','jb','jc','jd','je'];
 bingotable:any = {};
 mgs:any={};
  constructor(public navCtrl: NavController,
              public alertctrl:AlertController,
              public loader:LoadingController,
              public storage:Storage,
              public https:HttpClient,
              private PlayertwoService:PlayertwoService,
              public network:Network) {
                

    this.url=url;
    this.roomid=this.PlayertwoService.roomid;
    this.PlayertwoService.p2socketconnection=true;
  }
  myFunction(x) {
    this.bingotable[x]=this.i;
    this.playertwoboard.push({position:x,value:this.i})
      this.secondmethod();
      if(this.i<25){
        this.i++;
      }
    }
    ionViewWillLeave(){
      // this.disconnectsubscription.unsubscribe();
    }

    secondmethod(){
      this.fa=this.bingotable.fa;
      this.fb=this.bingotable.fb;
      this.fc=this.bingotable.fc;
      this.fd=this.bingotable.fd;
      this.fe=this.bingotable.fe;

      this.ga=this.bingotable.ga;
      this.gb=this.bingotable.gb;
      this.gc=this.bingotable.gc;
      this.gd=this.bingotable.gd;
      this.ge=this.bingotable.ge;

      this.ha=this.bingotable.ha;
      this.hb=this.bingotable.hb;
      this.hc=this.bingotable.hc;
      this.hd=this.bingotable.hd;
      this.he=this.bingotable.he;


      this.ia=this.bingotable.ia;
      this.ib=this.bingotable.ib;
      this.ic=this.bingotable.ic;
      this.id=this.bingotable.id;
      this.ie=this.bingotable.ie;

      this.ja=this.bingotable.ja;
      this.jb=this.bingotable.jb;
      this.jc=this.bingotable.jc;
      this.jd=this.bingotable.jd;
      this.je=this.bingotable.je;


 }



 createteble(){
  if(this.network.type=='none'){
    this.alertpresent('Please Check Your Internet Connection');
  }else{
 
  if(JSON.stringify(this.bingotable).length==192){
    this.presentLoading().then(()=>{
      var data={
        RoomId:this.roomid,
        PlayerTwoBoard:this.playertwoboard
      }
      this.storage.get("usertoken").then(val=>{
         
        const httpoptions={
          headers: new HttpHeaders({ 'Authorization':val})
        }
    
      this.https.post(this.url+"/api/updatebingoboard",data,httpoptions).subscribe(result=>{
    this.mgs=result;
    if(this.mgs.mgs =="Successfully"){
    var p2dashboard={PlayerTwoBoard:this.mgs.PlayerTwoBoard,RoomId:this.roomid};
    this.loader.dismiss();
    this.navCtrl.navigateForward(['/p2gameboard'],{replaceUrl:true})
    this.PlayertwoService.storage=p2dashboard;
    }else if(this.mgs.mgs=="Sorry some one already entered into game"){
      this.loader.dismiss();
    this.navCtrl.navigateBack(['/waitingplayerslist'],{replaceUrl:true});
    }
      })
    })
    });
  
  
  }
  else{
    
    this.showAlert('please fill all the fields');
  }
}
}

async presentLoading(){
  const loading=await this.loader.create({
    spinner:null,
    translucent:true,
    message:"please wait ",cssClass:'custom-loader-class'
  })
await loading.present();
}

async showAlert(msg){
  let alert= await this.alertctrl.create({
    header:'Message',
    message:msg,
    buttons:['OK'],
    cssClass:'alertctrlcss'

  })
  await alert.present();

}

 cleartable(){
  this.playertwoboard.length=0;
  this.bingotable={}
  this.secondmethod();
  this.i=1;
}
  ngOnInit() {
  }
  async alertpresent(mgs){
    let alert = await this.alertctrl.create({
      header:'ERROR MESSAGE',
      message:mgs,
      buttons:[{
        text:'OK',
        handler:()=>{
        
        }
      }],
      cssClass:'alertctrlcss'
    })
     await alert.present();
  }

}
