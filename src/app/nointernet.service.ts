import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {Network} from '@ionic-native/network/ngx';
@Injectable({
  providedIn: 'root'
})
export class NointernetService {

  constructor(private alertCtrl:AlertController,private router:Router, private network:Network) { }
  async alertpresent(data){
    if(data=='gameboard'){
        let alert = await this.alertCtrl.create({
          header:'ERROR MESSAGE',
          message:'Please Check Your Internet Connection',
          buttons:[{
            text:'OK',
            role:'ok',
            handler:()=>{
              this.router.navigate(['/home'],{replaceUrl:true})
            }
          }]
        })
         await alert.present();
    
    }else{
      this.showalert();
    }  
  }


  async showalert() {
    let alert = await this.alertCtrl.create({
      header:'ERROR MESSAGE',
      message:'Please Check Your Internet Connection',
      buttons:[{
        text:'OK',
        role:'ok',
        handler:()=>{
         
        }
      }]
    })
     await alert.present();
 
  }
  
}
