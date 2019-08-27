import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { P2boardcreationPage } from './p2boardcreation.page';

const routes: Routes = [
  {
    path: '',
    component: P2boardcreationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [P2boardcreationPage]
})
export class P2boardcreationPageModule {}
