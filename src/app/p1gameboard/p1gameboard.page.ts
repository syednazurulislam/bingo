import { Component, OnInit } from '@angular/core';
import { NavController,AlertController,ModalController} from '@ionic/angular';
import { Socket } from 'ng-socket-io';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {PlayeroneService} from '../playerone.service';
// import { Vibration } from '@ionic-native/vibration';
// import {SmartAudiosProvider} from '../../providers/smart-audios/smart-audios';

@Component({
  selector: 'app-p1gameboard',
  templateUrl: './p1gameboard.page.html',
  styleUrls: ['./p1gameboard.page.scss'],
})


export class P1gameboardPage implements OnInit {

  fa: any = { value: '', disable: false, classname: '' }; fb: any = { value: '', disable: false, classname: '' }; fc: any = { value: '', disable: false, classname: '' }; fd: any = { value: '', disable: false, classname: '' }; fe: any = { value: '', disable: false, classname: '' };
  ga: any = { value: '', disable: false, classname: '' }; gb: any = { value: '', disable: false, classname: '' }; gc: any = { value: '', disable: false, classname: '' }; gd: any = { value: '', disable: false, classname: '' }; ge: any = { value: '', disable: false, classname: '' };
  ha: any = { value: '', disable: false, classname: '' }; hb: any = { value: '', disable: false, classname: '' }; hc: any = { value: '', disable: false, classname: '' }; hd: any = { value: '', disable: false, classname: '' }; he: any = { value: '', disable: false, classname: '' };
  ia: any = { value: '', disable: false, classname: '' }; ib: any = { value: '', disable: false, classname: '' }; ic: any = { value: '', disable: false, classname: '' }; id: any = { value: '', disable: false, classname: '' }; ie: any = { value: '', disable: false, classname: '' };
  ja: any = { value: '', disable: false, classname: '' }; jb: any = { value: '', disable: false, classname: '' }; jc: any = { value: '', disable: false, classname: '' }; jd: any = { value: '', disable: false, classname: '' }; je: any = { value: '', disable: false, classname: '' };

  p1submit = 'submitbutton button3';
  p2submit = 'submitbutton button3';

readylength=0;
  bingotable: any = {};
  roomid: any;
  players: any = 0;

  bingo=''
  bingospellcounter=0;
  p1disable=false;


  constructor(  private toastCtrl: ToastController,public playeroneservice:PlayeroneService,public alertctrl:AlertController,private activatedRoute:ActivatedRoute,public sockets: Socket) { 
  var data= this.playeroneservice.storage;
  this.roomid = data._id;
   this.bingotable = data.PlayerOneBoard;
   this.secondmethod();
   this.sockets.on("GameData",(data)=>{

    if (data.message == "connect") {
      this.readylength=data.players;
      this.showToast('ready to play');
      this.sockets.emit("GameData",{message:'connect',roomid:this.roomid});
    }else if (data.message == "ready") {
      this.players = data.players;
     this.p2submit= 'submitbutton button1';
    } else if(this.p2submit=='submitbutton button1'&&this.p1submit=='submitbutton button1'){
      // this.smartAudio.play('p2playerclick');
      // this.vibration.vibrate(100);
      var position = this.bingotable[this.bingotable.findIndex(function (item, i) { return item.value === data.message })].position;
      this[position].disable = true
      this[position].classname = 'smallboxgreenglow';
      this.players = data.players;
      this.showtopToast(' player 2 choosed'+data.message);

   
    // this.mappingmethod(data.message);

    }

   })
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

  myFunction(input) {
     if(this.p2submit=='submitbutton button1'&&this.p1submit=='submitbutton button1'){
    if (this.players == 2) {

      // this.vibration.vibrate(100);
      this[input].classname = 'smallboxwhiteglow';
      // this.smartAudio.play('p1playerclick');
      var playeronechoice = this[input].value;
      this[input].disable = true
      this.players = "waiting for player 2 responce";
      this.sockets.emit("GameData", { message: playeronechoice, roomid: this.roomid });
      // this.mappingmethod(playeronechoice);

    } else if (this.players == "waiting for player 2 responce") {
      this.showToast("waiting for player 2 response");
    }
    }
  }
  // mappingmethod(number){
  //   var looper=0;
  //   var mapingarray=[
  //   [this.fa.disable,this.fb.disable,this.fc.disable,this.fd.disable,this.fe.disable],
  //   [this.ga.disable,this.gb.disable,this.gc.disable,this.gd.disable,this.ge.disable],
  //   [this.ha.disable,this.hb.disable,this.hc.disable,this.hd.disable,this.he.disable],
  //   [this.ia.disable,this.ib.disable,this.ic.disable,this.id.disable,this.ie.disable],
  //   [this.ja.disable,this.jb.disable,this.jc.disable,this.jd.disable,this.je.disable],
  //   [this.fa.disable,this.ga.disable,this.ha.disable,this.ia.disable,this.ja.disable],
  //   [this.fb.disable,this.gb.disable,this.hb.disable,this.ib.disable,this.jb.disable],
  //   [this.fc.disable,this.gc.disable,this.hc.disable,this.ic.disable,this.jc.disable],
  //   [this.fd.disable,this.gd.disable,this.hd.disable,this.id.disable,this.jd.disable],
  //   [this.fe.disable,this.ge.disable,this.he.disable,this.ie.disable,this.je.disable],
  //   [this.fa.disable,this.gb.disable,this.hc.disable,this.id.disable,this.je.disable],
  //   [this.fe.disable,this.gd.disable,this.hc.disable,this.ib.disable,this.ja.disable]
  //   ]
  //   var v1="BINGO";
  //   var looperr=0;
  //   this.bingospellcounter=0;
  //   while(mapingarray[looper]){
  //     var counter=0;
  //   mapingarray[looper].forEach((value)=>{
  //   if(value==true){
  //     counter++;
  //     if(counter==5){
  //       this.bingospellcounter++;   
  //       looperr++;
  //     }
  //   }
  //     })
  //   looper++;
  //   }
  //   this.bingo=v1.substr(0,this.bingospellcounter);
  //   if(this.bingo=="BINGO"){
  //     this.sockets.emit("GameData",{message:'winner',roomid:this.roomid});
  //   }
  //     }



  Ready() {
    if(this.readylength>1){
    this.p1submit = 'submitbutton button1';
    this.p1disable=true;
    alert("ready"+this.roomid);
  }
 else{
     this.showToast('waiting for player 2')
    
 }
    this.sockets.emit("GameData", { message: 'ready', roomid: this.roomid});
  }

  ngOnInit() {
    alert("im in ionViewDidEnter"+this.roomid);
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

}
