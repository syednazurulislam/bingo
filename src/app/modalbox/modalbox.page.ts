import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import {PlayeroneService} from '../playerone.service';
import {PlayertwoService} from '../playertwo.service'

@Component({
  selector: 'app-modalbox',
  templateUrl: './modalbox.page.html',
  styleUrls: ['./modalbox.page.scss'],
})
export class ModalboxPage implements OnInit {
  // @Input() message:string;
  win:boolean=false;
  lost:boolean=false;
  tie:boolean=false;
  accepted:boolean=false;
  constructor(navParams:NavParams,private modalCtrl:ModalController,public playeroneservice:PlayeroneService,private PlayertwoService:PlayertwoService) {
    this.playeroneservice.p1socketconnection=false;
    this.PlayertwoService.p2socketconnection=false;
    // alert('navparams'+navParams.get('message'));
    let message=navParams.get("message");
    if(message=="winner"){
      this.win=true;
    }
    else if(message=="lose"){
      this.lost=true;
    }else if(message=="tie"){
      this.tie=true;
    }

   }

  ngOnInit() {
  }

  newgame()
  {
    this.modalCtrl.dismiss({
      'dismissed':'true'
    });
  }

}
