import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import {  Directive,ElementRef, ViewChild } from '@angular/core';
import {environment} from "../../config/url";
import { Storage } from '@ionic/storage';
import { Router,NavigationExtras } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {PlayeroneService} from '../playerone.service';
let url = environment.url;
@Component({
  selector: 'app-p1boardcreation',
  templateUrl: './p1boardcreation.page.html',
  styleUrls: ['./p1boardcreation.page.scss'],
})
export class P1boardcreationPage implements OnInit {
  
  keyboard: any;
  url:string;
 
playeroneboard=[];
i:any=1;
dataexists:boolean;
fa:any; fb:any; fc:any; fd:any; fe:any;
ga:any; gb:any; gc:any; gd:any; ge:any;
ha:any; hb:any; hc:any; hd:any; he:any;
ia:any; ib:any; ic:any; id:any; ie:any;
ja:any; jb:any; jc:any; jd:any; je:any;
b1:boolean;
// array1=['fa','fb','fc','fd','fe', 'ga','gb','gc','gd','ge','ha','hb','hc','hd','he','ia','ib','ic'
// ,'id','ie','ja','jb','jc','jd','je'];
 bingotable:any = {};

//  public navCtrl: NavController, public navParams: NavParams,public http:Http, public https:HttpClient
  constructor( public navCtrl: NavController,public authservice:AuthenticationService,public playeroneservice:PlayeroneService, public router :Router,public https:HttpClient, public storage:Storage,public Router:Router) {
    //  this.authservice.setValue(false);
    this.url=url;
alert("in p1 creation page");
   }

  ngOnInit() {
  }

  myFunction(x) {
    this.bingotable[x]=this.i;
    this.playeroneboard.push({position:x,value:this.i})
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
  var token;
  var data={
    PlayerOneBoard:this.playeroneboard,
    PlayerOneDetails:{userid:"1",username:"sam"}
  }
  alert(JSON.stringify(data));
  this.storage.get("usertoken").then(val=>{
     token=val;
    alert(token);
  })
  let headers= new HttpHeaders();

  headers.append('authorization',token);
  this.https.post(this.url+"/api/createbingoboard",data, {headers:headers}).subscribe(result=>{
    this.playeroneservice.storage=result;
this.navCtrl.navigateForward(['/p1gameboard'],{replaceUrl:true});

})
 //})
}


cleartable(){
  this.bingotable={}
 this.playeroneboard.length=0;
  this.secondmethod();
  this.i=1;
}


}
