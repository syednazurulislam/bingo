import { Component, OnInit } from '@angular/core';
import { NavController,AlertController,ModalController, Platform,LoadingController} from '@ionic/angular';
import { Socket } from 'ng-socket-io';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {PlayeroneService} from '../playerone.service';
import { Vibration } from '@ionic-native/vibration/ngx';
 import {SmartaudioService} from '../smartaudio.service';
import { ModalboxPage } from '../modalbox/modalbox.page';
import { Observable, Subject } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import {NointernetService} from '../nointernet.service';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import {environment} from "../../config/url";
let url = environment.url;
@Component({
  selector: 'app-p1gameboard',
  templateUrl: './p1gameboard.page.html',
  styleUrls: ['./p1gameboard.page.scss'],
})


// export class P1gameboardPage implements OnInit,CanComponentDeactivate {
  export class P1gameboardPage implements OnInit{
  fa: any = { value: '', disable: false, classname: '' }; fb: any = { value: '', disable: false, classname: '' }; fc: any = { value: '', disable: false, classname: '' }; fd: any = { value: '', disable: false, classname: '' }; fe: any = { value: '', disable: false, classname: '' };
  ga: any = { value: '', disable: false, classname: '' }; gb: any = { value: '', disable: false, classname: '' }; gc: any = { value: '', disable: false, classname: '' }; gd: any = { value: '', disable: false, classname: '' }; ge: any = { value: '', disable: false, classname: '' };
  ha: any = { value: '', disable: false, classname: '' }; hb: any = { value: '', disable: false, classname: '' }; hc: any = { value: '', disable: false, classname: '' }; hd: any = { value: '', disable: false, classname: '' }; he: any = { value: '', disable: false, classname: '' };
  ia: any = { value: '', disable: false, classname: '' }; ib: any = { value: '', disable: false, classname: '' }; ic: any = { value: '', disable: false, classname: '' }; id: any = { value: '', disable: false, classname: '' }; ie: any = { value: '', disable: false, classname: '' };
  ja: any = { value: '', disable: false, classname: '' }; jb: any = { value: '', disable: false, classname: '' }; jc: any = { value: '', disable: false, classname: '' }; jd: any = { value: '', disable: false, classname: '' }; je: any = { value: '', disable: false, classname: '' };
  p1submit = 'submitbutton button3';
  p2submit = 'submitbutton button3';
url:string;
  readylength=0;
  bingotable: any = {};
  roomid: any;
  players: any = 0;
  leavegame:boolean=false;
  bingo=''
  bingospellcounter=0;
  p1disable=false;
  tictic:any;
  roomname:any;
  turnstatus:any;
  turnstatuscss:any;
  bottle:any="paused";
  disconnectsubscription:any;
public unsubscribeBackEvent:any;
  constructor(  private toastCtrl: ToastController,
                private platform:Platform,
                public playeroneservice:PlayeroneService,
                public nointernetservice:NointernetService,
                public alertctrl:AlertController, 
                private activatedRoute:ActivatedRoute,
                public https:HttpClient, 
                public sockets: Socket,
                private modelctrl:ModalController,
                 private vibration: Vibration,
                 private router:Router,
                 private smartaudioservice:SmartaudioService,
                 private network:Network,
                 private loader:LoadingController) { 
                   
                 
                  this.url=url;
  var data= this.playeroneservice.storage;
  this.roomid = data._id;
  this.roomname=data.BoardId;
   this.bingotable = data.PlayerOneBoard;
   this.secondmethod();
  this.playeroneservice.p1gameboard=true;


  
  //  this.sockets.on("GameData",(data)=>{
    this.playeroneservice.socketService.subscribe(data=>{
     
  if (data.message == "connect") {
      this.readylength=data.players;
      this.showToast('ready to play');

      this.sockets.emit("GameData",{message:'connect',roomid:this.roomid});
    }else if (data.message == "ready") {
      this.players = data.players;
     this.p2submit= 'submitbutton button1';
    }else if(data.message=="winner"){
      if(this.bingo=="BINGO"){
       if(this.playeroneservice.p1socketconnection){
this.leavegame=true;
 this.sockets.emit("GameData",{message:'tie',roomid:this.roomid});
// this.Leave();
        this.playeroneservice.p1socketconnection=false;
       }
       
      }else{
        this.sockets.emit("GameData",{message:'lost',roomid:this.roomid});
        this.smartaudioservice.play('bingolost');
        this.leavegame=true;
        this.showmodal('lose')
        this.Leave();
      }
    }else if(data.message=="tie"){
    
      this.sockets.emit("GameData",{message:'leave',roomid:this.roomid});
      // this.playeroneservice.socketService.unsubscribe();

      this.playeroneservice.p1socketconnection=false;
      this.smartaudioservice.play('bingolost');
this.leavegame=true;
      this.showmodal('tie');
      this.Leave();

    }else if(data.message=="lost"){
      
      this.leavegame=true;
      this.sockets.emit("GameData",{message:'leave',roomid:this.roomid});
      this.smartaudioservice.play('bingowinner');
      this.showmodal('winner');
      this.Leave();
    } else if (this.p2submit == 'submitbutton button1' && this.p1submit == 'submitbutton button1') {
     if (this.bingo != "BINGO") {
        this.smartaudioservice.play('p2playerclick');
       this.vibration.vibrate(100);
      var position = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.value === data.message })].position;
      this[position].disable = true,
      this[position].classname = 'smallboxgreenglow';
      this.players = data.players;
      this.showtopToast(' player 2 choosed' + data.message);
      this.turnstatus="Your Turn";
      this.turnstatuscss='yt';
      
      this.mappingmethod(data.message);
    }
  }
   })
  }
  
  
intializeBackButtonCustomHandler():void{
  this.unsubscribeBackEvent=this.platform.backButton.subscribeWithPriority(999999,()=>{
    this.backButtonNavigation()
  })
}


ionViewWillLeave(){
  this.unsubscribeBackEvent.unsubscribe();
  this.unsubscribeBackEvent().unsubscribe();
  this.unsubscribeBackEvent&& this.unsubscribeBackEvent();
}

  secondmethod() {
    this.fa.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'fa' })].value;
    this.fb.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'fb' })].value;
    this.fc.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'fc' })].value;
    this.fd.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'fd' })].value;
    this.fe.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'fe' })].value;

    this.ga.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'ga' })].value;
    this.gb.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'gb' })].value;
    this.gc.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'gc' })].value;
    this.gd.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'gd' })].value;
    this.ge.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'ge' })].value;

    this.ha.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'ha' })].value;
    this.hb.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'hb' })].value;
    this.hc.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'hc' })].value;
    this.hd.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'hd' })].value;
    this.he.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'he' })].value;

    this.ia.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'ia' })].value;
    this.ib.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'ib' })].value;
    this.ic.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'ic' })].value;
    this.id.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'id' })].value;
    this.ie.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'ie' })].value;

    this.ja.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'ja' })].value;
    this.jb.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'jb' })].value;
    this.jc.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'jc' })].value;
    this.jd.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'jd' })].value;
    this.je.value = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.position === 'je' })].value;

  }


  ionViewDidEnter() {
    
  }
  Leave(){
    this.playeroneservice.socketService.unsubscribe();
  }

  myFunction(input) {
    if(this.network.type=='none'){
      this.alertpresent('Please Check Your Internet Connection');
    }else{
     if(this.p2submit=='submitbutton button1'&&this.p1submit=='submitbutton button1'){
    if (this.players == 2) {
    
       this.vibration.vibrate(100);
      this[input].classname = 'smallboxwhiteglow';
       this.smartaudioservice.play('p1playerclick');
      var playeronechoice = this[input].value;
      this[input].disable = true
      this.players = "waiting for player 2 responce";
      this.sockets.emit("GameData", { message: playeronechoice, roomid: this.roomid });
      this.mappingmethod(playeronechoice);
      this.turnstatus="Opponent Turn";
      this.turnstatuscss='ot';
    } else if (this.players == "waiting for player 2 responce") {
      this.showToast("waiting for player 2 response");
    }
    }
  }
  }


  mappingmethod(number){
    var looper=0;
    var mapingarray=[
    [this.fa.disable,this.fb.disable,this.fc.disable,this.fd.disable,this.fe.disable],
    [this.ga.disable,this.gb.disable,this.gc.disable,this.gd.disable,this.ge.disable],
    [this.ha.disable,this.hb.disable,this.hc.disable,this.hd.disable,this.he.disable],
    [this.ia.disable,this.ib.disable,this.ic.disable,this.id.disable,this.ie.disable],
    [this.ja.disable,this.jb.disable,this.jc.disable,this.jd.disable,this.je.disable],
    [this.fa.disable,this.ga.disable,this.ha.disable,this.ia.disable,this.ja.disable],
    [this.fb.disable,this.gb.disable,this.hb.disable,this.ib.disable,this.jb.disable],
    [this.fc.disable,this.gc.disable,this.hc.disable,this.ic.disable,this.jc.disable],
    [this.fd.disable,this.gd.disable,this.hd.disable,this.id.disable,this.jd.disable],
    [this.fe.disable,this.ge.disable,this.he.disable,this.ie.disable,this.je.disable],
    [this.fa.disable,this.gb.disable,this.hc.disable,this.id.disable,this.je.disable],
    [this.fe.disable,this.gd.disable,this.hc.disable,this.ib.disable,this.ja.disable]
    ]
    var v1="BINGO";
    var looperr=0;
    this.bingospellcounter=0;
    while(mapingarray[looper]){
      var counter=0;
    mapingarray[looper].forEach((value)=>{
    if(value==true){
      counter++;
      if(counter==5){
        this.bingospellcounter++;   
        looperr++;
      }
    }
      })
    looper++;
    }
    this.bingo=v1.substr(0,this.bingospellcounter);
    if(this.bingo=="BINGO"){
      this.sockets.emit("GameData",{message:'winner',roomid:this.roomid});
      // this.Leave();
    }
      }



  Ready() {
    if(this.network.type=='none'){
      this.alertpresent('Please Check Your Internet Connection');
    }else{
    if(this.readylength>1){
    this.p1submit = 'submitbutton button1';
    this.p1disable=true;
  }
 else{
     this.showToast('waiting for player 2');
 }
    this.sockets.emit("GameData", { message: 'ready', roomid: this.roomid});
  }
  }
  ngOnInit() {
    this.intializeBackButtonCustomHandler();
    console.log('ionViewDidLoad Bingogameboardp2Page');
    this.sockets.emit("GameData",{message:'connect',roomid:this.roomid});
  }

 async showToast(msg){
  let toast = await this.toastCtrl.create({
    message:msg,
    duration: 2000,
    position: 'middle'
  });
  toast.present();

  }
  async showtopToast(msg){
    let toast = await this.toastCtrl.create({
      message:msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  
    }

    async showmodal(data){
      
      const modal = await this.modelctrl.create({component:ModalboxPage,componentProps:{'message':data},cssClass:'modal-transparency'});
           modal.onDidDismiss().then(dataa=>{
          
             this.router.navigate(['/home'],{replaceUrl:true});
           })
     

      return await modal.present();

    }
    async backButtonNavigation(){
      const alert= await this.alertctrl.create({
        header:'Attention',
        message:'are you sure to leave',
        buttons:[
          {text:'Ok',handler:()=>{
            this.presentLoading().then(()=>{
              this.sockets.emit("GameData",{message:'leave',roomid:this.roomid});
              this.deletetable()
              this.router.navigate(['/home']);
            })
          }
        },{
            text:'CANCEL',role:'Cancel',handler:(blah)=>{}
          }
        ],
        cssClass:'alertctrlcss'
      });
      await alert.present();
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

deletetable(){
 
  this.presentLoading
  var data ={
    roomid:this.roomid
  }
  const httpoptions={
    headers: new HttpHeaders('application/json'  )
  }

  this.https.post(this.url+"/api/destroy",data, httpoptions).subscribe(result=>{
    if(result=='deleted'){
this.loader.dismiss();
    }else if(result =='somethingwentwrong'){
this.loader.dismiss();
    }

})
}
async presentLoading(){
  const loading=await this.loader.create({message:"please wait ",cssClass:'custom-loader-class alert-message '});
await loading.present();
}

}
