import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
 import {Storage} from '@ionic/storage';
import {BehaviorSubject,ReplaySubject} from 'rxjs';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // authState =  new BehaviorSubject(null)
  // authState = new ReplaySubject;
  authState:string='';

  constructor(private router:Router, private storage:Storage, private platform :Platform) {

    this.platform.ready().then(()=>{
      this.ifloggedin();
    })
   }


   ifloggedin(){
     this.storage.get('usertoken').then((response)=>{
       if(response){
         this.authState='true';
       }
     })
   }

   login(){
  
    this.storage.get('usertoken').then((response)=>{
    if(response){
    this.authState='true';
    this.router.navigate(['home'],{replaceUrl:true})
    // this.router.navigate(['/tabs/home'],{replaceUrl:true})
        //  alert(this.authState);
      }
      // alert(this.authState);
    })
   }

   logout(){
     this.storage.remove('usertoken').then(()=>{

       this.router.navigate(['']);
       this.authState='false';
     })

   }

   isAuthenticate(){
   return new Promise((resolve,reject)=>{
    this.storage.get('usertoken').then((response)=>{
      // alert(' inside isAuthenticate storage ' +response)
      if(response){
        this.authState='true'
        // alert(this.authState);
        resolve(this.authState);
      }else{
        this.authState='false'

      }
    
    })
     })

  
   }
  
  // setValue(str){
  //    this.authState.next(str) 
  // }
  // getValue(){
  //   return this.authState.value;
  // }
}
