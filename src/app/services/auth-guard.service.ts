import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service' 
import { CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public authservice:AuthenticationService) { }

  canActivate():boolean{
    return this.authservice.getValue();
  }
}
