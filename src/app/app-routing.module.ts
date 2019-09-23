import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {LoginGuardService} from './services/Loginguard';
import{AuthGuardService}  from './services/auth-guard.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
// import { Vibration } from '@ionic-native/vibration';

const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) ,
  },
  // { path: 'home1', loadChildren: './home/home.module#HomePageModule',canActivate :[LoginGuardService] },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule'},
  {path: '', loadChildren:() => import('./login/login.module').then(n=>n.LoginPageModule)},
  { path: 'p1boardcreation', loadChildren: './p1boardcreation/p1boardcreation.module#P1boardcreationPageModule' },
  { path: 'p2boardcreation', loadChildren: './p2boardcreation/p2boardcreation.module#P2boardcreationPageModule' },
  { path: 'p1gameboard', loadChildren: './p1gameboard/p1gameboard.module#P1gameboardPageModule' },
  // { path: 'p1gameboard', loadChildren: './p1gameboard/p1gameboard.module#P1gameboardPageModule',canDeactivate:[CanDeactivateGuard] },
  { path: 'p2gameboard', loadChildren: './p2gameboard/p2gameboard.module#P2gameboardPageModule' },
  { path: 'waitingplayerslist', loadChildren: './waitingplayerslist/waitingplayerslist.module#WaitingplayerslistPageModule' },
  { path: 'modalbox', loadChildren: './modalbox/modalbox.module#ModalboxPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    FormsModule,
    ReactiveFormsModule  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
