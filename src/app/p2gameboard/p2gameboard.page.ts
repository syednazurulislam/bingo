import { Component, OnInit } from '@angular/core';
import {NavController,ModalController} from '@ionic/angular';
import {Socket}from 'ng-socket-io';
import { ToastController } from '@ionic/angular';
import {PlayertwoService} from '../playertwo.service';
@Component({
  selector: 'app-p2gameboard',
  templateUrl: './p2gameboard.page.html',
  styleUrls: ['./p2gameboard.page.scss'],
})
export class P2gameboardPage implements OnInit {
  fa:any={value:'',disable:false, classname:''}; fb:any={value:'',disable:false,classname:''} ; fc:any={value:'',disable:false,classname:''} ; fd:any={value:'',disable:false,classname:''}; fe:any={value:'',disable:false,classname:''};
  ga:any={value:'',disable:false, classname:''}; gb:any={value:'',disable:false, classname:''}; gc:any={value:'',disable:false,classname:''}; gd:any={value:'',disable:false,classname:''}; ge:any={value:'',disable:false,classname:''};
  ha:any={value:'',disable:false,classname:''}; hb:any={value:'',disable:false,classname:''}; hc:any={value:'',disable:false,classname:''}; hd:any={value:'',disable:false,classname:''}; he:any={value:'',disable:false,classname:''};
  ia:any={value:'',disable:false, classname:''}; ib:any={value:'',disable:false, classname:''}; ic:any={value:'',disable:false,classname:''}; id:any={value:'',disable:false,classname:''}; ie:any={value:'',disable:false,classname:''};
  ja:any={value:'',disable:false, classname:''}; jb:any={value:'',disable:false, classname:''}; jc:any={value:'',disable:false,classname:''}; jd:any={value:'',disable:false,classname:''}; je:any={value:'',disable:false,classname:''};
  p1submit='submitbutton button3';
  p2submit='submitbutton button3';
  bingocounter=0;
  bingotable:any = {};
  roomid:any;
  buttonColor:string='#000';
  players:any=0;
  bingo=''
   bingospellcounter=0;
   p2disable=false;
   readylength:any;
  constructor(public navCtrl: NavController,private toastCtrl: ToastController,public modalCtrl:ModalController,private PlayertwoService:PlayertwoService,public sockets: Socket){
    var data=this.PlayertwoService.storage;
    this.bingotable=data.PlayerTwoBoard;
    this.roomid=data.RoomId;
    alert(this.roomid);
    this.secondmethod();
    this.sockets.on("GameData", (data) => {

      if (data.message == "connect") {
        this.readylength=data.players;
        this.showToast(' ready to play');
      }else if(data.message=="ready"){
        this.players=data.players;
        this.p1submit= 'submitbutton button1';
      }else if(this.p2submit=='submitbutton button1'&&this.p1submit=='submitbutton button1'){
        // this.smartAudio.play('p2playerclick');
        // this.vibration.vibrate(100);
       var position=this.bingotable[this.bingotable.findIndex(function(item,i){return item.value===data.message})].position;
       this[position].disable=true
       this[position].classname= 'smallboxgreenglow';
       this.players=data.players;
       this.showtopToast(' player 1 choosed'+data.message);
      // this.mappingmethod(data.message);

      }
    })
  }
  secondmethod(){
    this.fa.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='fa'})].value;
    this.fb.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='fb'})].value;
    this.fc.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='fc'})].value;
    this.fd.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='fd'})].value;
    this.fe.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='fe'})].value;

    this.ga.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='ga'})].value;
    this.gb.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='gb'})].value;
    this.gc.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='gc'})].value;
    this.gd.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='gd'})].value;
    this.ge.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='ge'})].value;

    this.ha.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='ha'})].value;
    this.hb.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='hb'})].value;
    this.hc.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='hc'})].value;
    this.hd.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='hd'})].value;
    this.he.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='he'})].value;
   
    this.ia.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='ia'})].value;
    this.ib.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='ib'})].value;
    this.ic.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='ic'})].value;
    this.id.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='id'})].value;
    this.ie.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='ie'})].value;
   
    this.ja.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='ja'})].value;
    this.jb.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='jb'})].value;
    this.jc.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='jc'})].value;
    this.jd.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='jd'})].value;
    this.je.value=this.bingotable[this.bingotable.findIndex(function(item,i){return item.position==='je'})].value;


}



myFunction( position){
  if(this.p2submit=='submitbutton button1'&&this.p1submit=='submitbutton button1'){

 
  if(this.players == 2){
    // this.vibration.vibrate(100);
 this[position].disable=true;
 this[position].classname='smallboxwhiteglow';
  var playertwochoice=this[position].value;
  this.players="waiting for player 1 responce";
  // this.smartAudio.play('p1playerclick');
  this.sockets.emit("GameData",{message:playertwochoice,roomid:this.roomid});
  // this.mappingmethod(playertwochoice);

  }else if (this.players == "waiting for player 2 responce") {
    this.showToast("waiting for player 2 response");
  }
}
}



  ngOnInit() {
 
    alert("im in ionViewDidEnter"+this.roomid);
    console.log('ionViewDidLoad Bingogameboardp2Page');
    this.sockets.emit("GameData",{message:'connect',roomid:this.roomid});
  }
  Ready(){
    this.p2submit='submitbutton button1';
    this.p2disable=true;
    alert("ready"+this.roomid);
    this.sockets.emit("GameData",{message:'ready',roomid:this.roomid});
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
}
