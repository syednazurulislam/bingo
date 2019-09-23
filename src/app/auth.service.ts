import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedin=false;

  constructor() { }

  login(){
    this.loggedin=true;
  }
  logout(){
    this.loggedin=false;
  }
  authstate(){
    return this.loggedin;
  }
}
