import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { P1gameboardPage } from './p1gameboard.page';
import { CanDeactivateGuard } from '../services/can-deactivate-guard.service';
//   import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
//  import {environment} from '../../config/url';
// // let url1 = environment.url1;

const routes: Routes = [
  {
    path: '',
    component: P1gameboardPage,
    // canDeactivate:[CanDeactivateGuard]
  }
];
//  let config={
//   url:'http://192.168.0.168:5225',
//    options:{}
//  }

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    //  SocketIoModule.forRoot(config),
    
    RouterModule.forChild(routes)
  ],
  declarations: [P1gameboardPage]
})
export class P1gameboardPageModule {}
