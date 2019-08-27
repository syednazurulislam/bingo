import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NavController} from '@ionic/angular';
import {AuthenticationService} from '../services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router:Router,private navctrl:NavController, public authservice:AuthenticationService) { }

  ngOnInit() {
    // this.authservice.setValue(true);
  }


  p1boardcreation(){
    this.navctrl.navigateForward(['/p1boardcreation']);
  }
  waitingplayerslist(){
    this.navctrl.navigateForward(['/waitingplayerslist']);

  }
}
