import { Component, OnInit } from '@angular/core';
import { NavController,AlertController,LoadingController, Platform} from '@ionic/angular';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import {environment} from "../../config/url";
import { Storage } from '@ionic/storage';
import { Router,NavigationExtras } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import {PlayeroneService} from '../playerone.service';
import {NointernetService} from '../nointernet.service'
let url = environment.url;
@Component({
  selector: 'app-p1boardcreation',
  templateUrl: './p1boardcreation.page.html',
  styleUrls: ['./p1boardcreation.page.scss'],
})
export class P1boardcreationPage implements OnInit {
  loading=null;
  keyboard: any;
  url:string;
  serverdata={};
 token:any;
playeroneboard=[];
i:any=1;
dataexists:boolean;
public unsubscribeBackEvent:any;
privatekeynumber="";
otp1:any;
otp2:any;
otp3:any;
otp4:any;
fa:any=''; fb:any=''; fc:any=''; fd:any=''; fe:any='';
ga:any=''; gb:any=''; gc:any=''; gd:any=''; ge:any='';
ha:any=''; hb:any=''; hc:any=''; hd:any=''; he:any='';
ia:any=''; ib:any=''; ic:any=''; id:any=''; ie:any='';
ja:any=''; jb:any=''; jc:any=''; jd:any=''; je:any='';
b1:boolean;
// array1=['fa','fb','fc','fd','fe', 'ga','gb','gc','gd','ge','ha','hb','hc','hd','he','ia','ib','ic'
// ,'id','ie','ja','jb','jc','jd','je'];
 bingotable:any = {fa:'',fb:'',fc:'',fd:'',fe:'',
                   ga:'',gb:'',gc:'',gd:'',ge:'',
                   ha:'',hb:'',hc:'',hd:'',he:'',
                   ia:'',ib:'',ic:'',id:'',ie:'',
                   ja:'',jb:'',jc:'',jd:'',je:''};
 privatekey=false;
 disconnectsubscription:any;
//  public navCtrl: NavController, public navParams: NavParams,public http:Http, public https:HttpClient
  constructor( public navCtrl: NavController,
               public alertctrl:AlertController,
               public loader:LoadingController,
               public playeroneservice:PlayeroneService,
               public platform:Platform,
               public router :Router,
              public https:HttpClient, 
              public storage:Storage,
              public Router:Router,
              public network:Network,
              private nointernet:NointernetService) {
               
    this.url=url;
    this.playeroneservice.p1socketconnection=true;

   }

  ngOnInit() {
    this.intializeBackButtonCustomHandler();
  }
  intializeBackButtonCustomHandler():void{
    this.unsubscribeBackEvent=this.platform.backButton.subscribeWithPriority(999999,()=>{
      this.loading.dismiss();
      this.router.navigate(['/home'],{replaceUrl:true});
      
    })
  }
  ionViewWillLeave(){
    this.unsubscribeBackEvent.unsubscribe();
    this.unsubscribeBackEvent().unsubscribe();
    this.unsubscribeBackEvent&& this.unsubscribeBackEvent();
  }

  myFunction(x) {
    this.bingotable[x]=this.i;
    // alert(JSON.stringify(this.bingotable));
    this.playeroneboard.push({position:x,value:this.i})
       this.secondmethod();
       if(this.i<25){
         this.i++;
       }

      
     }

    //  ionViewWillLeave(){
    //   this.disconnectsubscription.unsubscribe();
    // }


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
  if(JSON.stringify(this.bingotable).includes("25")){
    this.presentLoading().then(()=>{
      if(this.privatekeynumber!=""){
        this.serverdata={
          PlayerOneBoard:this.playeroneboard,
          Privatekey:this.privatekeynumber.substring(0,4)
        }
        
       }else{
        this.serverdata={
          PlayerOneBoard:this.playeroneboard,
        }
       }
       
        this.storage.get("usertoken").then(val=>{
           this.token=val;
           
           const httpoptions={
             headers: new HttpHeaders({ 'Authorization':this.token})
           }
           this.https.post(this.url+"/api/createbingoboard",this.serverdata, httpoptions).subscribe(result=>{
             this.playeroneservice.storage=result;
          this.loading.dismiss();
         this.navCtrl.navigateForward(['/p1gameboard'],{replaceUrl:true});
        
         
         })
        })
    });
   
  }
  else{
    
this.showAlert('please fill all the fields');
  }
  }
}
private(){
  if(this.privatekey){
  this.privatekey=false
}else{
  this.privatekey=true
}
}
cleartable(){
  this.bingotable={}
 this.playeroneboard.length=0;
  this.secondmethod();
  this.i=1;
}



moveFocus(nextElement,data) {
 console.log(data.key);
  this.privatekeynumber+=data.key;
  nextElement.setFocus();
}
Focus(data){
  this.privatekeynumber+=data.key;
  console.log(this.privatekeynumber);

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
async presentLoading(){
  this.loading=await this.loader.create({message:"please wait ",cssClass:'custom-loader-class'});
await this.loading.present();
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
