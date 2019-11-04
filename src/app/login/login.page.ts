import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {NavController,LoadingController,AlertController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { P1boardcreationPage } from '../p1boardcreation/p1boardcreation.page';
import {AuthenticationService} from '../services/authentication.service'
import {environment} from '../../config/url'
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  PhoneNumber:number;
  Password:string='';
  url:string;
  disconnectsubscription:any;
  loadingctrl =null;

  constructor(private router:Router ,private loader:LoadingController,private alertctrl:AlertController,private navctrl:NavController,private http:HttpClient,
     private storage:Storage,public authservice:AuthenticationService,public network:Network ){
      this.url=environment.url;
      this.loader.dismiss();
      this.disconnectsubscription = this.network.onDisconnect().subscribe(()=>{
        alert('disconnect');
      })
  }
  
  ngOnInit() {
    
  }

  gotoRegister(){  
    this.router.navigate(['/registration']);
   }
   login(){
    this.presentLoading();
    var data={
      phonenumber:this.PhoneNumber,
      Password:this.Password
     }
     let headers = new HttpHeaders();
     headers.append('Content-Type','application/json');
     this.http.post(this.url+"/api/login", data, {headers:headers}).subscribe((response:any)=>{
       if(response.status=="200"){
         this.storage.set("usertoken", response.token).then((result)=>{
          this.authservice.login();
          this.loadingctrl.dismiss()

         })
        //  this.navctrl.navigateForward(['/home'])
         
       }else{
      this.loadingctrl.dismiss();
      this.showalert(response);
    }


       
     })
   }
   async presentLoading(){
    this.loadingctrl=await this.loader.create({message:"please wait",cssClass:'custom-loader-class'})
  await this.loadingctrl.present();
  }
  async showalert(msg){
    let alert=  await this.alertctrl.create({
      header:'Alert',
      message:msg,
      buttons:['OK'],
      cssClass:'alertctrlcss'

    });
    await alert.present();
  }

  ionViewWillLeave(){
    this.disconnectsubscription.unsubscribe();
  }
}
