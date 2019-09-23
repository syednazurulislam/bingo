import { Component, OnInit } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { NavController,AlertController} from '@ionic/angular';
import {PlayertwoService} from '../playertwo.service'
import {environment} from "../../config/url";
import { Network } from '@ionic-native/network/ngx';
let url = environment.url;


@Component({
  selector: 'app-waitingplayerslist',
  templateUrl: './waitingplayerslist.page.html',
  styleUrls: ['./waitingplayerslist.page.scss'],
})
export class WaitingplayerslistPage implements OnInit {
  url:string;
  items:any=[];
  items1=[];
  disconnectsubscription:any;
mgs:any;
  constructor(public navCtrl: NavController,public network:Network, public alertController: AlertController,public https:HttpClient,private PlayertwoService:PlayertwoService) {
   
    // this.disconnectsubscription = this.network.onDisconnect().subscribe(()=>{
    //   this.alertpresent('disconnect');

    // })
    if(this.network.type=='none'){
      this.alertpresent('Please Check Your Internet Connection');
    }else{
      this.url=url;
      let headers= new Headers();
      headers.append('Content-Type','application/json');
      this.https.post(this.url+"/api/listbingowaitingboards",{headers:headers})
      .subscribe(names=>{
        // this.items=names;
        this.items=names;
      })
      this.initializeItems();
    }
   
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
      
      //  alert(roomid);
      // this.navCtrl.push(BplayertwoformPage,{"roomid":roomid})
      let headers= new HttpHeaders();
      headers.append('Content-Type','application/json');
      // alert(roomid);
      var data={
        roomid:roomid
      }
      this.https.post(this.url+"/api/checkprivatekey",data,{headers:headers})
      .subscribe(result=>{
        console.log(result);
       if(result=="no private key"){
         
        this.navCtrl.navigateForward(['/p2boardcreation'],{replaceUrl:true})
        this.PlayertwoService.roomid=roomid;
       }else{
        //  alert('inelse');
        this.presentAlertPrompt(result,roomid)
       } 
      })
 
        }
  ngOnInit() {
  }


  ionRefresh(event){
    this.url=url;
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    this.https.post(this.url+"/api/listbingowaitingboards",{headers:headers})
    .subscribe(names=>{
      // this.items=names;
      this.items=names;
      event.target.complete()
    })
    this.initializeItems();

    

  }



  async presentAlertPrompt(key,roomid) {
    const alert1 = await this.alertController.create({
      header: 'Prompt!',
      inputs: [
      
        {
          name: 'privatekey',
          type: 'text',
          placeholder: 'Please enter key'
        }
      
      
       
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'go',
          handler: (privatekey) => {
            if(privatekey.privatekey==key){
              this.navCtrl.navigateForward(['/p2boardcreation'],{replaceUrl:true})
              this.PlayertwoService.roomid=roomid;
            }else{
              alert("sorry wrong key")
            }
          }
        }
      ],
      cssClass:'alertctrlcss'
    });

    await alert1.present();
  }

  async alertpresent(mgs){
    let alert = await this.alertController.create({
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
  ionViewWillLeave(){
    // this.disconnectsubscription.unsubscribe();
  }
}
