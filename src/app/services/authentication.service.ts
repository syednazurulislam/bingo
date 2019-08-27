import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
// import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState =  new BehaviorSubject(false)

  constructor(private router:Router) { }



  setValue(str){
     this.authState.next(str) 
  }
  getValue(){
    return this.authState.value;
  }
}
