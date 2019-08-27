import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WaitingplayerslistPage } from './waitingplayerslist.page';

const routes: Routes = [
  {
    path: '',
    component: WaitingplayerslistPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WaitingplayerslistPage]
})
export class WaitingplayerslistPageModule {}
