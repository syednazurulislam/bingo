import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service' 
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {
 loginvalue=true;
  constructor(public authservice:AuthenticationService) { }

//   canActivate():Observable<boolean>|Promise<boolean>|boolean{
//     //  return this.authservice.getvalue();

// }
}