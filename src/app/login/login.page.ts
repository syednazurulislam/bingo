import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {NavController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { P1boardcreationPage } from '../p1boardcreation/p1boardcreation.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  PhoneNumber:number;
  Password:string='';
  constructor(private router:Router ,private navctrl:NavController,private http:HttpClient, private storage:Storage ){

  }

  ngOnInit() {
    
  }

  gotoRegister(){  
    this.router.navigate(['/registration']);
   }
   login(){
    var data={
      phonenumber:this.PhoneNumber,
      Password:this.Password
     }
     let headers = new HttpHeaders();
     headers.append('Content-Type','application/json');
     this.http.post("http://192.168.0.168:5225/api/login", data, {headers:headers}).subscribe((response:any)=>{
       alert(JSON.stringify(response));
       if(response.status=="200"){
         this.storage.set("usertoken", response.token);
         this.navctrl.navigateForward(['/home'])
         
       }
     })
   }
}
