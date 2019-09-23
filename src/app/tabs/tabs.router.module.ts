import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { LoginGuardService } from '../services/Loginguard';

const routes: Routes = [
  {
    path: 'add',
    component: TabsPage,
    children: [
      {
        path: 'home', 
        children:[
          {
            path:'',
            //  loadChildren:'../home/home.module#HomePageModule',
            loadChildren:() => import('../home/home.module').then(n=>n.HomePageModule),
            canActivate :[LoginGuardService]

          },
        ]
          },
          {
            path: 'steps',
            // loadChildren:'../tab1/tab1.module#Tab1PageModule'
            loadChildren:() => import('../tab2/tab2.module').then(n=>n.Tab2PageModule)

          },
          
          {
            path: 'profile',
            loadChildren:() => import('../tab1/tab1.module').then(n=>n.Tab1PageModule)
            
          }
        ]
        
         
      },
      

     
      {path:'',redirectTo:'add/home',pathMatch:'full'}
     
    ]
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
