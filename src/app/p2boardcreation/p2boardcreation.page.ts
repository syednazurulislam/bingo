import { Component, OnInit } from '@angular/core';
import {environment} from "../../config/url";
let url = environment.url;
import{HttpClient} from '@angular/common/http';
import { NavController} from '@ionic/angular';
import {PlayertwoService} from '../playertwo.service'

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
// array1=['fa','fb','fc','fd','fe', 'ga','gb','gc','gd','ge','ha','hb','hc','hd','he','ia','ib','ic'
// ,'id','ie','ja','jb','jc','jd','je'];
 bingotable:any = {};
 mgs:any={};
  constructor(public navCtrl: NavController, public https:HttpClient,private PlayertwoService:PlayertwoService) { 
    this.url=url;
    this.roomid=this.PlayertwoService.roomid;
  }
  myFunction(x) {
    this.bingotable[x]=this.i;
    this.playertwoboard.push({position:x,value:this.i})
      this.secondmethod();
      if(this.i<25){
        this.i++;
      }
   
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
  alert("im in  createteble");
  var data={
    RoomId:this.roomid,
    PlayerTwoBoard:this.playertwoboard,
    PlayerTwoDetails:{userid:window.localStorage.getItem("id"),username:window.localStorage.getItem("name")}
  }
  let headers= new Headers();
  headers.append('Content-Type','application/json');
  this.https.post(this.url+"/api/updatebingoboard",data).subscribe(result=>{
alert(JSON.stringify(result));
this.mgs=result;
if(this.mgs.mgs =="Successfully"){
alert("in first method");
var p2dashboard={PlayerTwoBoard:this.mgs.PlayerTwoBoard,RoomId:this.roomid};
// this.navCtrl.push(Bingogameboardp2Page,{"boarddata":p2dashboard}).then(()=>{
//   let index=this.navCtrl.length()-3;
//    this.navCtrl.remove(index,2);
//   })
this.navCtrl.navigateForward(['/p2gameboard'],{replaceUrl:true})
this.PlayertwoService.storage=p2dashboard;
}else if(this.mgs.mgs=="Sorry some one already entered into game"){

// this.navCtrl.push(BingowaitingplayerslistPage)
// let index=this.navCtrl.length()-2;
// this.navCtrl.remove(index,2);
this.navCtrl.navigateBack(['/waitingplayerslist'],{replaceUrl:true});
}

  })
}


 cleartable(){
  this.playertwoboard.length=0;
  this.bingotable={}
  this.secondmethod();
  this.i=1;
}
  ngOnInit() {
  }

}
