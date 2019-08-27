import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';
import {PlayeroneService} from '../playerone.service';
import { P1boardcreationPage } from './p1boardcreation.page';

const routes: Routes = [
  {
    path: '',
    component: P1boardcreationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [P1boardcreationPage]
})
export class P1boardcreationPageModule {}
