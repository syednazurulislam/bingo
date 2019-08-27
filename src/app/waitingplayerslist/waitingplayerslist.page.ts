import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { NavController} from '@ionic/angular';
import {PlayertwoService} from '../playertwo.service'
import {environment} from "../../config/url";
import { from } from 'rxjs';
let url = environment.url;
@Component({
  selector: 'app-waitingplayerslist',
  templateUrl: './waitingplayerslist.page.html',
  styleUrls: ['./waitingplayerslist.page.scss'],
})
export class WaitingplayerslistPage implements OnInit {
  url:string;
  items=[];
  items1=[];

  constructor(public navCtrl: NavController, public https:HttpClient,private PlayertwoService:PlayertwoService) {
    this.url=url;
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    this.https.post(this.url+"/api/listbingowaitingboards",{headers:headers})
    .subscribe(names=>{
      // this.items=names;
      var counter=0;
      while(names[counter]){
      this.items.push(names[counter]._id);
      counter++;
      }
    })
    this.initializeItems();
   }
   initializeItems(){
    this.items;
     }

     getItems(ev) {
      // Reset items back to all of the items
       this.initializeItems();
  
      // set val to the value of the ev target
      var val = ev.target.value;
      // alert(val)
  
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          // alert(item._id.toLowerCase().indexOf(val.toLowerCase()) > -1);
          // return item;
           return ( item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }

    joinbingotable(roomid){
      alert(roomid);
      // this.navCtrl.push(BplayertwoformPage,{"roomid":roomid})
      this.navCtrl.navigateForward(['/p2boardcreation'],{replaceUrl:true})
      this.PlayertwoService.roomid=roomid;
        }
  ngOnInit() {
  }

}
