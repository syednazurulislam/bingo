import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { P2gameboardPage } from './p2gameboard.page';

const routes: Routes = [
  {
    path: '',
    component: P2gameboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [P2gameboardPage]
})
export class P2gameboardPageModule {}
