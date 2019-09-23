 import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service' 
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(public authservice:AuthenticationService, private router:Router) { }

  canActivate(router:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean{
  return this.authservice.isAuthenticate().then((data:any)=>{
  if(data=='true'){
    return true;
  }
  else{
    this.router.navigate(['/'])
  }
})
} 
}
